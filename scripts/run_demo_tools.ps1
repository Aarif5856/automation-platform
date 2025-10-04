# Automation Business Demo Tools Runner
# Run all tools for screen recording demo

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "🚀 AUTOMATION BUSINESS DEMO TOOLS" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "📊 Step 1: Generating demo data..." -ForegroundColor Green
python automation-templates/demo-automation-tools.py
Write-Host ""

Write-Host "🔍 Step 2: Running LinkedIn Lead Generator..." -ForegroundColor Green
python automation-templates/linkedin-lead-generator.py
Write-Host ""

Write-Host "🕷️ Step 3: Running Web Scraper..." -ForegroundColor Green
python automation-templates/web-scraper.py
Write-Host ""

Write-Host "📧 Step 4: Running Email Campaign Manager..." -ForegroundColor Green
python automation-templates/email-campaign-manager.py
Write-Host ""

Write-Host "📱 Step 5: Running Social Proof Generator..." -ForegroundColor Green
python automation-templates/social-proof-generator.py
Write-Host ""

Write-Host "📊 Step 6: Running Analytics Dashboard..." -ForegroundColor Green
python automation-templates/analytics-dashboard.py
Write-Host ""

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "✅ ALL DEMO TOOLS COMPLETED!" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "📁 Check the generated files:" -ForegroundColor White
Write-Host "- demo_linkedin_leads_*.csv" -ForegroundColor Gray
Write-Host "- demo_scraped_products_*.csv" -ForegroundColor Gray
Write-Host "- demo_email_campaigns.db" -ForegroundColor Gray
Write-Host "- case_study_*.md" -ForegroundColor Gray
Write-Host "- social_posts_*.json" -ForegroundColor Gray
Write-Host ""

Write-Host "🎬 Ready for screen recording!" -ForegroundColor Yellow
Write-Host ""

Read-Host "Press Enter to continue..."
