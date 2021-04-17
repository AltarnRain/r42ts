@echo off
echo Cleaning folder
del /s /q ..\altarnrain.github.io\round42

echo Cleaning old sound files
cd dist
rd /s /q sounds
cd.. 

echo Packing
call npm run-script build

echo Copying gamefiles.
xcopy dist ..\altarnrain.github.io\round42 /y /s

echo Committing and pushing
cd /d ..\altarnrain.github.io
git.exe add .
git.exe commit -m "Round 42 update"
git.exe push
pause
exit