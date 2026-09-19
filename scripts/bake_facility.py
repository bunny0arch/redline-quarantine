"""Render 17 existing GLB furniture groups to transparent 2D PNGs.
Requires Python 3, numpy and Pillow. No AI or external asset download.
Coordinates and material UVs are taken directly from the supplied GLB.
Run from any directory: python scripts/bake_facility.py
"""
import json,struct,numpy as np
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
from functools import lru_cache
data=(ROOT/'assets/source/hospital.glb').read_bytes();length=struct.unpack_from('<I',data,12)[0];J=json.loads(data[20:20+length]);B=data[28+length:]
@lru_cache(None)
def acc(i):
 a=J['accessors'][i];v=J['bufferViews'][a['bufferView']];dtype={5126:'<f4',5125:'<u4',5123:'<u2',5121:'u1',5122:'<i2'}[a['componentType']];n={'SCALAR':1,'VEC2':2,'VEC3':3,'VEC4':4}[a['type']];offset=v.get('byteOffset',0)+a.get('byteOffset',0);item=np.dtype(dtype).itemsize
 return np.ndarray((a['count'],n),dtype=dtype,buffer=B,offset=offset,strides=(v.get('byteStride',n*item),item)).copy()
def local(n):
 if 'matrix'in n:return np.array(n['matrix']).reshape(4,4).T
 x,y,z,w=n.get('rotation',[0,0,0,1]);m=np.eye(4);m[:3,:3]=[[1-2*(y*y+z*z),2*(x*y-z*w),2*(x*z+y*w)],[2*(x*y+z*w),1-2*(x*x+z*z),2*(y*z-x*w)],[2*(x*z-y*w),2*(y*z+x*w),1-2*(x*x+y*y)]];m[:3,:3]*=np.array(n.get('scale',[1,1,1]));m[:3,3]=n.get('translation',[0,0,0]);return m
WORLD={}
def visit(i,parent):
 m=parent@local(J['nodes'][i]);WORLD[i]=m
 for child in J['nodes'][i].get('children',[]):visit(child,m)
visit(0,np.eye(4))
def parts(i):
 n=J['nodes'][i]
 if 'mesh'in n:
  for p in J['meshes'][n['mesh']]['primitives']:
   if p.get('mode',4)!=4:continue
   a=acc(p['attributes']['POSITION']);v=a@WORLD[i][:3,:3].T+WORLD[i][:3,3];ind=acc(p['indices']).reshape(-1,3) if 'indices'in p else np.arange(len(v)).reshape(-1,3)
   yield v,ind,p
 for c in n.get('children',[]):yield from parts(c)


from PIL import Image,ImageDraw
import io,os

TEX={}
for i,t in enumerate(J.get('textures',[])):
 im=J['images'][t['source']];bv=J['bufferViews'][im['bufferView']];offset=bv.get('byteOffset',0);image=Image.open(io.BytesIO(B[offset:offset+bv['byteLength']])).convert('RGB');image.thumbnail((256,256));TEX[i]=np.asarray(image)/255

def render(node,size=256,tilt=.35):
 tris=[];colors=[]
 for v,ix,p in parts(node):
  tri=v[ix];normal=np.cross(tri[:,1]-tri[:,0],tri[:,2]-tri[:,0]);length=np.linalg.norm(normal,axis=1);normal/=np.maximum(length[:,None],1e-12)
  mat=J['materials'][p['material']] if 'material'in p else {};pb=mat.get('pbrMetallicRoughness',{});base=np.array(pb.get('baseColorFactor',[.72,.73,.7,1])[:3]);col=np.tile(base,(len(tri),1))
  if 'baseColorTexture'in pb:
   tex=TEX[pb['baseColorTexture']['index']]
   if 'TEXCOORD_0'in p['attributes']:
    uv=acc(p['attributes']['TEXCOORD_0'])[ix].mean(1)%1;col*=tex[(uv[:,1]*(len(tex)-1)).astype(int),(uv[:,0]*(tex.shape[1]-1)).astype(int)]
  light=.52+.48*np.abs(normal@np.array([-.35,.87,-.34]));col*=light[:,None];col=col*.9+np.array([.015,.022,.013]);tris.append(tri);colors.append(np.uint8(np.clip(col*255,0,255)))
 if not tris:return
 tri=np.concatenate(tris);colors=np.concatenate(colors);xy=np.stack([tri[:,:,0],tri[:,:,2]-tri[:,:,1]*tilt],axis=2);low=xy.min((0,1));high=xy.max((0,1));scale=(size-20)/max(high-low);xy=(xy-low)*scale+10;dims=np.ceil((high-low)*scale+20).astype(int)
 edge1=xy[:,1]-xy[:,0];edge2=xy[:,2]-xy[:,0];area=np.abs(edge1[:,0]*edge2[:,1]-edge1[:,1]*edge2[:,0]);keep=area>.12;xy=xy[keep];colors=colors[keep];depth=(tri[:,:,1]+tri[:,:,2]*tilt).mean(1)[keep]
 out=Image.new('RGBA',tuple(dims),(0,0,0,0));d=ImageDraw.Draw(out)
 for i in np.argsort(depth):d.polygon([tuple(p) for p in xy[i]],fill=tuple(colors[i])+(255,))
 return out


out=ROOT/'assets/facility'
chosen={'worktable':362,'shelving':4698,'vent':7302,'pallet':7398,'ladder':8714,'extinguisher':9412,'cabinet':9812,'locker':10254,'console':11255,'chair':11339,'keyboard':11675,'door':14062,'tank':18602,'powerbox':19161,'partition':20079,'duct':22358,'grate':22538}
manifest=json.loads((out/'manifest.json').read_text())
for name,node in chosen.items():
 im=render(node,384,.45);im.save(out/(name+'.png'));manifest[name]={'file':name+'.png','sourceNode':node,'width':im.width,'height':im.height,'source':'hospital.zip/source/hospital.glb'}

(out/'manifest.json').write_text(json.dumps(manifest,indent=2))
print('Furniture sprites rebuilt from original geometry')
