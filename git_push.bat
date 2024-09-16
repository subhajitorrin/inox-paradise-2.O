@echo off
cd /d "%~dp0"

git add .

git commit -m "working on client..."

git push -u origin main

exit
