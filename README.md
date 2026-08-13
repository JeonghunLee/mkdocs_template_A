# mkdocs_template_A
Mkdocs Template Resporitory 

## Setup Envs

```
python -m venv .venv
```

```
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
.\.venv\Scripts\Activate.ps1
```

```
(.venv) PS D:\Works\git\Info_jetson> pip install -r requirements.txt
```


## Build mkdocs 


``` 
mkdocs serve
```

mermaid is not working 
```
mkdocs build 
```
...


## Electron 


* Setting   
electron_package.ps1
```
cp main.js site/
cp package.json site/
cd site 

npm install 
npm run dist  or npm start 
```

* node.js 
```
main.js
package.json
```


## pandoc

Step 1: Install pandoc in Window
```
winget install --id JohnMacFarlane.Pandoc -e
```
```
pandoc --version
```

Step 2: Setup refrece.docx or pptx in Window

```
pandoc -o reference.docx --print-default-data-file reference.docx
```
```
pandoc -o reference.pptx --print-default-data-file reference.pptx
```

docx/pptx 의 경우, zip으로 되어있으며, 이를 풀면 XML 기반으로 확인  
```
tar -tf .\reference.docx | Select-Object -First 10
```
```
[Content_Types].xml
_rels/.rels
docProps/app.xml
docProps/core.xml
docProps/custom.xml
word/document.xml
word/fontTable.xml
word/footnotes.xml
word/comments.xml
word/numbering.xml
```





Step 3: Convert markdown to pptx 

```
pandoc .\docs\index.md `
  --slide-level=2 `
  --resource-path=".;.\docs" `
  -o .\output\index.pptx
```

Step 3: Convert markdown to docx 
```
pandoc `
  .\docs\index.md `
  --toc `
  --number-sections `
  --reference-doc=.\docx\reference.docx `
  --resource-path=".;.\docs" `
  -o .\output\index.docx
```

## mermaid 


Convert markdown to svg

```
npx -p @mermaid-js/mermaid-cli mmdc `
  -i .\docx\mmd\test.md `
  -o .\docx\imgs\test.svg `
  -b transparent
```