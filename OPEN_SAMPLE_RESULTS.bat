@echo off
echo ========================================
echo    OPEN SAMPLE RESULTS
echo ========================================
echo.

cd /d C:\Users\USER\Desktop\automation

echo Opening File Explorer in the automation folder...
explorer .

echo.
echo ========================================
echo Look for these files:
echo ========================================
echo.
echo LinkedIn Leads:
echo   - demo_linkedin_leads_*.csv
echo.
echo Scraped Products:
echo   - demo_scraped_products_*.csv
echo.
echo Email Database:
echo   - demo_email_campaigns.db
echo.
echo Summary Report:
echo   - demo_automation_summary.json
echo.
echo ========================================
echo.
echo Opening the most recent CSV files...
echo.

timeout /t 2 /nobreak >nul

REM Find and open the most recent files
for /f "delims=" %%f in ('dir /b /od demo_linkedin_leads_*.csv 2^>nul') do set "latest_leads=%%f"
for /f "delims=" %%f in ('dir /b /od demo_scraped_products_*.csv 2^>nul') do set "latest_products=%%f"

if defined latest_leads (
    echo Opening: %latest_leads%
    start "" "%latest_leads%"
)

if defined latest_products (
    echo Opening: %latest_products%
    start "" "%latest_products%"
)

if defined latest_leads (
    echo.
    echo ✅ Sample results opened in Excel/Default CSV viewer
) else (
    echo.
    echo ⚠️ No demo files found. Run this first:
    echo    python demo-automation-tools.py
)

echo.
echo ========================================
echo Files are in:
echo C:\Users\USER\Desktop\automation
echo ========================================
echo.
pause

