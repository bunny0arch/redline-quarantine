"""Save current source and complete local commit history into a portable ZIP."""
from pathlib import Path
import subprocess, zipfile
root=Path(__file__).resolve().parents[1]
subprocess.run(['python3',str(root/'scripts/standalone.py')],check=True)
subprocess.run(['python3',str(root/'scripts/sync_android.py')],check=True)
bundle=root.parent/'redline-history.bundle'
if (root/'.git').exists():
    subprocess.run(['git','-C',str(root),'bundle','create',str(bundle),'--all'],check=True)
output=root.parent/'Redline-Quarantine-Source.zip'
skip={'.git','node_modules','.gradle','build','__pycache__'}
with zipfile.ZipFile(output,'w',zipfile.ZIP_DEFLATED) as archive:
    for file in sorted(root.rglob('*')):
        relative=file.relative_to(root)
        if file.is_file() and not (set(relative.parts)&skip) and file.name!='local.properties' and file.suffix not in ['.jks','.keystore']:
            archive.write(file,Path('Redline-Quarantine')/relative)
    if bundle.exists(): archive.write(bundle,'Redline-Quarantine/redline-history.bundle')
print(output)
print(f'{output.stat().st_size:,} bytes')
