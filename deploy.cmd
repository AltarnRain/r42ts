@echo off
echo Cleaning folder
del /s /q ..\altarnrain.github.io\round42

echo Cleaning old sound files
cd dist
rd /s /q sounds
cd.. 

echo Packing
call webpack -p

echo Copying gamefiles.
xcopy dist ..\altarnrain.github.io\round42 /y /s

echo Committing and pushing
cd /d ..\altarnrain.github.io
git add .
git commit -m "Round 42 update"
git push
pause
exit