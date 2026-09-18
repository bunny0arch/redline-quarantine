"""Produce a double-clickable desktop build, with no server or dependencies."""
from pathlib import Path
import re
ROOT=Path(__file__).resolve().parents[1]
modules=['config','world','state','game','render','input','audio','main']
js='\n'.join((ROOT/'src'/f'{name}.js').read_text() for name in modules)
js=re.sub(r"import .*? from ['\"][^'\"]+['\"];",'',js)
js=re.sub(r'\bexport (?=(?:const|function|class)\b)','',js)
html=(ROOT/'index.html').read_text().replace('<link rel="stylesheet" href="style.css">','<style>'+(ROOT/'style.css').read_text()+'</style>')
html=html.replace('<script type="module" src="src/main.js"></script>','<script>\n(()=>{\n'+js+'\n})();\n</script>')
(ROOT/'Redline-Play.html').write_text(html)
print('Created Redline-Play.html')
