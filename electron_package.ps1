# site 폴더로 이동
Set-Location .\site

# Electron 실행 파일 복사
Copy-Item ..\main.js .\ -Force

# package.json 복사
Copy-Item ..\package.json .\ -Force


#
# 상위 package.json 설치 
#
npm install

#
# exe 생성 (Windows Portable Executable)
#
npm run dist

Set-Location .. # 프로젝트 루트로 복귀
