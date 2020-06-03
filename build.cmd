@echo off
cd dist
echo Removing sound files
rd /s /q sounds
cd..

echo Compling...
call tsc

echo Packing...
call webpack -p
echo Done!