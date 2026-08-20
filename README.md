# Mkdocs_template_A

<br/>

Mkdocs Template based on Material 

<br/>

## Setup Python Envs 

Window PS (venv)


```
python -m venv .venv
```

```
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
.\.venv\Scripts\Activate.ps1
```

```
(.venv) PS D:\Works\mkdocs_template_A> pip install -r requirements.txt
```

<br/>

## Mkdocs Serve/Build  

<br/>

* Check VS Code Task 
  .vscode/task.json 


``` 
mkdocs serve
```

```
mkdocs build 
```

* Mermaid
    * **Mermaid does not work properly on 127.0.0.1** when there is no internet connection.
    * Mermaid is loaded from a **CDN**, so an internet connection is required.

<br/>

* Github Pages 
    * Support it 

<br/>

## Mkdocs or MD Release 

<br/>

* Mkdocs Release 
    * Mkdocs based on Electron 
    * *.exe 

<br/>

### Electron Release 

<br/>

* Support Window 
    * **electron_package.ps1**
    * main.js 
    * package.json 

<br/>

* Setting   
**electron_package.ps1**
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

<br/>

### pandoc

<br/>

* Step 1: Install pandoc in Window
```
winget install --id JohnMacFarlane.Pandoc -e
```
```
pandoc --version
```

<br/>

* Step 2: Setup refrece.docx or pptx in Window
```
pandoc -o reference.docx --print-default-data-file reference.docx
```
```
pandoc -o reference.pptx --print-default-data-file reference.pptx
```

<br/>

* Step 3: Check refrece.docx or pptx in Window (DOCX,PPTX)    
docx/pptx 의 경우, zip으로 되어있으며, 이를 풀면 XML 기반으로 확인  
**Window 로 각 파일을 열어 폰트와 각 서식을 변경**    
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


<br/>

* Step 4: Convert markdown to pptx/docx  
```
pandoc .\docs\index.md `
  --slide-level=2 `
  --resource-path=".;.\docs" `
  -o .\output\index.pptx
```
```
pandoc `
  .\docs\index.md `
  --toc `
  --number-sections `
  --reference-doc=.\docx\reference.docx `
  --resource-path=".;.\docs" `
  -o .\output\index.docx
```

<br/>

### mermaid to svg 

<br/>

* Pandoc    
**Pandoc is not support mermaid** 

All Pandoc need Converting 

* Convert markdown to svg
```
npx -p @mermaid-js/mermaid-cli mmdc `
  -i .\docx\mmd\test.md `
  -o .\docx\imgs\test.svg `
  -b transparent
```

<br/>
