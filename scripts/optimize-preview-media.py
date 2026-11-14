from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed
import json,subprocess,shutil
# Rebuild web copies for this project; originals are never replaced.
root=Path(__file__).resolve().parents[1]
ffmpeg=shutil.which('ffmpeg')
ffprobe=shutil.which('ffprobe')
if not ffmpeg or not ffprobe: raise SystemExit('Install ffmpeg and ffprobe before rebuilding web video copies.')
header,source=(root/'content.js').read_text().split('window.PAPER_CONTENT = ',1)
source=source.strip().removesuffix(';')
content=json.loads(source)
clips={}
def collect(value):
 if isinstance(value,dict):
  if str(value.get('src','')).endswith('.mp4'): clips[value.get('originalSrc',value['src'])]=value
  for child in value.values(): collect(child)
 elif isinstance(value,list):
  for child in value: collect(child)
collect(content)
def optimize(item):
 src,clip=item
 rate=6 if '/backward/peg_insertion/' in src else 3 if '/rollouts/' in src else 1
 probe=json.loads(subprocess.check_output([ffprobe,'-v','error','-select_streams','v:0','-show_entries','stream=r_frame_rate','-of','json',str(root/src)]))
 numerator,denominator=probe['streams'][0]['r_frame_rate'].split('/')
 fps=min(24,float(numerator)/float(denominator))
 output='assets/web/'+src.removeprefix('assets/')
 poster='assets/web/posters/'+str(Path(src.removeprefix('assets/')).with_suffix('.jpg'))
 for name in [output,poster]: (root/name).parent.mkdir(parents=True,exist_ok=True)
 subprocess.run([ffmpeg,'-hide_banner','-loglevel','error','-y','-i',str(root/src),'-vf',f'setpts=PTS/{rate},scale=min(1280\\,iw):-2,fps={fps}', '-an','-c:v','libx264','-preset','fast','-crf','23','-pix_fmt','yuv420p','-threads','2','-g',str(max(1,round(fps*2))),'-movflags','+faststart',str(root/output)],check=True)
 subprocess.run([ffmpeg,'-hide_banner','-loglevel','error','-y','-ss','0.2','-i',str(root/src),'-frames:v','1','-vf','scale=480:-2','-q:v','5','-threads','1',str(root/poster)],check=True)
 dimensions=json.loads(subprocess.check_output([ffprobe,'-v','error','-select_streams','v:0','-show_entries','stream=width,height','-of','json',str(root/output)]))['streams'][0]
 return src,dict(src=output,poster=poster,originalSrc=src,playbackRate=1,**dimensions)
result={}
with ThreadPoolExecutor(max_workers=2) as executor:
 for future in as_completed([executor.submit(optimize,item) for item in clips.items()]):
  src,clip=future.result(); result[src]=clip
  if len(result)%10==0: print('Optimized',len(result),'/',len(clips),flush=True)
(root/'assets/web/media-map.json').write_text(json.dumps(result,indent=2))
def update(value):
 if isinstance(value,dict):
  key=value.get('originalSrc',value.get('src'))
  if key in result: value.update(result[key])
  for child in list(value.values()): update(child)
 elif isinstance(value,list):
  for child in value: update(child)
update(content)
(root/'content.js').write_text(header+'window.PAPER_CONTENT = '+json.dumps(content,indent=2,ensure_ascii=False)+';\n')
original=sum((root/src).stat().st_size for src in result)
optimized=sum((root/clip['src']).stat().st_size for clip in result.values())
print(json.dumps(dict(clips=len(result),originalMB=round(original/1e6,2),optimizedMB=round(optimized/1e6,2))),flush=True)
