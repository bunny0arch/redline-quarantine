"""Copy only runtime files into the Android assets folder."""
from pathlib import Path
import shutil
root=Path(__file__).resolve().parents[1]
out=root/'android/app/src/main/assets'
out.mkdir(parents=True,exist_ok=True)
for name in ['index.html','style.css']:
    shutil.copy2(root/name,out/name)
for name in ['src','assets']:
    shutil.copytree(root/name,out/name,dirs_exist_ok=True,ignore=shutil.ignore_patterns('source','*.md'))
print('Android assets synchronized:',out)
