@echo off
echo ========================================
echo    EMAIL CAMPAIGN MANAGER
echo ========================================
echo.

cd /d C:\Users\USER\Desktop\automation\automation-templates

echo Starting Email Campaign Manager...
echo.
echo Instructions:
echo 1. Choose option 1 (Send new campaign)
echo 2. Enter campaign name
echo 3. Choose email template
echo 4. Enter subject line
echo 5. Press Enter to send
echo.

python email-campaign-manager.py

echo.
echo Email campaign completed!
echo Check your email for sent messages.
echo.
pause


























