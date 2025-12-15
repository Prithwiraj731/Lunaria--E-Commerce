@echo off
echo Starting Lunaria E-Commerce Platform...
echo.

REM Start backend server
start "Backend Server" cmd /k "cd /d %~dp0server && npm start"

REM Wait 2 seconds then start frontend
timeout /t 2 >nul
start "Frontend Client" cmd /k "cd /d %~dp0client && npm run dev"

echo Application started!
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
pause
