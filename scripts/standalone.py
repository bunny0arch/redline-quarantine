"""Produce a double-clickable desktop build, with no server or dependencies."""
from pathlib import Path
import re, json, base64
ROOT=Path(__file__).resolve().parents[1]
modules=['config','world','state','game','assets','render','input','audio','main']
js='\n'.join((ROOT/'src'/f'{name}.js').read_text() for name in modules)
js=re.sub(r"import .*? from ['\"][^'\"]+['\"];",'',js)
js=re.sub(r'\bexport (?=(?:const|function|class)\b)','',js)
html=(ROOT/'index.html').read_text().replace('<link rel="stylesheet" href="style.css">','<style>'+(ROOT/'style.css').read_text()+'</style>')
manifest=json.loads((ROOT/'assets/facility/manifest.json').read_text())
embedded={k:'data:image/'+('png' if v['file'].endswith('.png') else 'jpeg')+';base64,'+base64.b64encode((ROOT/'assets/facility'/v['file']).read_bytes()).decode() for k,v in manifest.items()}
js='window.REDLINE_ASSETS='+json.dumps(embedded)+';\n'+js
html=html.replace('<script type="module" src="src/main.js"></script>','<script>\n(()=>{\n'+js+'\n})();\n</script>')
(ROOT/'Redline-Play.html').write_text(html)
print('Created Redline-Play.html')
