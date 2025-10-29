@echo off
echo ========================================
echo    FIX: Virtual Environment Issue
echo ========================================
echo.

echo Deactivating virtual environment...
call deactivate 2>nul

echo.
echo ========================================
echo    Testing Demo Tools
echo ========================================
echo.

cd /d C:\Users\USER\Desktop\automation
python demo-automation-tools.py

echo.
echo ========================================
echo    Test Complete!
echo ========================================
echo.
echo If you saw the demo output above, everything is working!
echo.
echo Next time, just type "deactivate" before running scripts.
echo.
pause

