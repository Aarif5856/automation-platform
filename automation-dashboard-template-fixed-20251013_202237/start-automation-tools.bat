@echo off
echo ========================================
echo    AUTOMATION BUSINESS SYSTEM
echo    Quick Start Tool
echo ========================================
echo.

echo Starting automation tools...
echo.

echo [1/4] Starting Web Server...
start "Web Server" cmd /k "cd /d C:\Users\USER\Desktop\automation && node server.js"
timeout /t 3 /nobreak >nul

echo [2/4] Starting LinkedIn Lead Generator...
start "LinkedIn Automation" cmd /k "cd /d C:\Users\USER\Desktop\automation\automation-templates && python linkedin-lead-generator.py"
timeout /t 2 /nobreak >nul

echo [3/4] Starting Email Campaign Manager...
start "Email Campaign" cmd /k "cd /d C:\Users\USER\Desktop\automation\automation-templates && python email-campaign-manager.py"
timeout /t 2 /nobreak >nul

echo [4/4] Starting Web Scraper...
start "Web Scraper" cmd /k "cd /d C:\Users\USER\Desktop\automation\automation-templates && python web-scraper.py"
timeout /t 2 /nobreak >nul

echo.
echo ========================================
echo    ALL TOOLS STARTED SUCCESSFULLY!
echo ========================================
echo.
echo Web Dashboard: http://localhost:3000
echo Login: admin@automatepro.com
echo Password: admin123
echo.
echo Press any key to open the dashboard...
pause >nul

start http://localhost:3000

echo.
echo Dashboard opened in your browser!
echo.
echo To stop all tools, close the command windows.
echo.
pause














































