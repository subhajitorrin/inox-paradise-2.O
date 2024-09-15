@echo off
cd /d "%~dp0"

git add .

git commit -m "working on server..."

git push -u origin main

exit
