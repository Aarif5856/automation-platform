@echo off
echo ========================================
echo 🚀 AUTOMATION BUSINESS DEMO TOOLS
echo ========================================
echo.

echo 📊 Step 1: Generating demo data...
python automation-templates/demo-automation-tools.py
echo.

echo 🔍 Step 2: Running LinkedIn Lead Generator...
python automation-templates/linkedin-lead-generator.py
echo.

echo 🕷️ Step 3: Running Web Scraper...
python automation-templates/web-scraper.py
echo.

echo 📧 Step 4: Running Email Campaign Manager...
python automation-templates/email-campaign-manager.py
echo.

echo 📱 Step 5: Running Social Proof Generator...
python automation-templates/social-proof-generator.py
echo.

echo 📊 Step 6: Running Analytics Dashboard...
python automation-templates/analytics-dashboard.py
echo.

echo ========================================
echo ✅ ALL DEMO TOOLS COMPLETED!
echo ========================================
echo.
echo 📁 Generated files are in demo_data/ folder:
echo - demo_linkedin_leads_*.csv
echo - demo_scraped_products_*.csv
echo - demo_email_campaigns.db
echo - demo_automation_summary.json
echo.
echo 📁 Generated content is in generated_content/ folder:
echo - case_study_*.md
echo - demo_script_*.md
echo - social_posts_*.json
echo - content_calendar_*.json
echo.
echo 🎬 Ready for screen recording!
echo.
pause
