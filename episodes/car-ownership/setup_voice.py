"""Download public Kokoro ONNX model and voice bank with normal TLS verification."""
import pathlib,urllib.request
root=pathlib.Path('work/models');root.mkdir(parents=True,exist_ok=True)
base='https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.1/'
for name in ['kokoro-v1.0.fp16.onnx','voices-v1.0.bin']:
 path=root/name
 if not path.exists():
  temporary=path.with_suffix(path.suffix+'.part');urllib.request.urlretrieve(base+name,temporary);temporary.replace(path)
 print(name,path.stat().st_size,'bytes')
