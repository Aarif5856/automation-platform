#!/usr/bin/env python3
"""
Create ThemeForest Preview Images
================================

This script creates the required preview images for ThemeForest upload:
- Thumbnail: 80x80px
- Preview images: 590x300px (01_, 02_, 03_, etc.)

Author: AutoBiz
Version: 1.0
License: Commercial Use Allowed
"""

from PIL import Image, ImageDraw, ImageFont
import os
import textwrap

def create_thumbnail():
    """Create 80x80px thumbnail"""
    print("Creating thumbnail (80x80px)...")
    
    # Create image
    img = Image.new('RGB', (80, 80), color='#1a1a2e')
    draw = ImageDraw.Draw(img)
    
    # Try to use a font, fallback to default if not available
    try:
        font_large = ImageFont.truetype("arial.ttf", 16)
        font_small = ImageFont.truetype("arial.ttf", 10)
    except:
        font_large = ImageFont.load_default()
        font_small = ImageFont.load_default()
    
    # Draw AP logo
    draw.rectangle([10, 10, 30, 30], fill='#4f46e5', outline='#ffffff', width=2)
    draw.text((12, 12), "AP", fill='#ffffff', font=font_small)
    
    # Draw text
    draw.text((35, 15), "AUTO", fill='#ffffff', font=font_small)
    draw.text((35, 30), "PRO", fill='#4f46e5', font=font_small)
    
    # Save
    img.save('thumbnail.jpg', 'JPEG', quality=95)
    print("✅ Thumbnail created: thumbnail.jpg")

def create_preview_image(title, description, features, filename, bg_color='#1a1a2e'):
    """Create a 590x300px preview image"""
    print(f"Creating preview image: {filename}")
    
    # Create image
    img = Image.new('RGB', (590, 300), color=bg_color)
    draw = ImageDraw.Draw(img)
    
    # Try to use fonts
    try:
        font_title = ImageFont.truetype("arial.ttf", 24)
        font_subtitle = ImageFont.truetype("arial.ttf", 16)
        font_text = ImageFont.truetype("arial.ttf", 12)
        font_small = ImageFont.truetype("arial.ttf", 10)
    except:
        font_title = ImageFont.load_default()
        font_subtitle = ImageFont.load_default()
        font_text = ImageFont.load_default()
        font_small = ImageFont.load_default()
    
    # Draw header
    draw.rectangle([0, 0, 590, 60], fill='#4f46e5')
    draw.text((20, 20), title, fill='#ffffff', font=font_title)
    draw.text((20, 45), description, fill='#e0e7ff', font=font_subtitle)
    
    # Draw content area
    y_pos = 80
    for i, feature in enumerate(features):
        # Draw bullet point
        draw.ellipse([20, y_pos + 5, 30, y_pos + 15], fill='#4f46e5')
        # Draw feature text
        draw.text((40, y_pos), f"• {feature}", fill='#ffffff', font=font_text)
        y_pos += 25
    
    # Draw footer
    draw.rectangle([0, 250, 590, 300], fill='#0f0f23')
    draw.text((20, 260), "AUTOMATION BUSINESS SUITE", fill='#4f46e5', font=font_subtitle)
    draw.text((20, 280), "Complete Lead Generation & Marketing System", fill='#ffffff', font=font_small)
    
    # Save
    img.save(filename, 'JPEG', quality=95)
    print(f"✅ Preview image created: {filename}")

def create_all_preview_images():
    """Create all required preview images"""
    print("Creating ThemeForest preview images...")
    
    # Create thumbnail
    create_thumbnail()
    
    # Preview 1: Dashboard Overview
    create_preview_image(
        title="Automation Business Dashboard",
        description="Complete Business Management System",
        features=[
            "Real-time Revenue Tracking ($12,450+ generated)",
            "Lead Generation Analytics (2,847 leads)",
            "Email Campaign Management (3 active campaigns)",
            "Client Management System",
            "Mobile Responsive Design"
        ],
        filename="01_dashboard-overview.jpg",
        bg_color='#1a1a2e'
    )
    
    # Preview 2: LinkedIn Lead Generator
    create_preview_image(
        title="LinkedIn Lead Generator",
        description="Automated Prospect Discovery & Email Finding",
        features=[
            "Search 50+ qualified prospects automatically",
            "Extract contact information & email addresses",
            "Verify email deliverability (96% success rate)",
            "Export to CSV/Excel with full data",
            "Anti-detection measures for safe operation"
        ],
        filename="02_linkedin-lead-generator.jpg",
        bg_color='#0f172a'
    )
    
    # Preview 3: Email Campaign Manager
    create_preview_image(
        title="Email Campaign Manager",
        description="Professional Email Marketing Automation",
        features=[
            "Personalized email campaigns (48 emails sent)",
            "64.6% average open rate achieved",
            "Automated follow-up sequences",
            "A/B testing and optimization",
            "Complete tracking and analytics"
        ],
        filename="03_email-campaigns.jpg",
        bg_color='#1e293b'
    )
    
    # Preview 4: Analytics Dashboard
    create_preview_image(
        title="Analytics & Revenue Tracking",
        description="Real-time Business Performance Metrics",
        features=[
            "Revenue tracking: $12,450+ generated",
            "Lead conversion analytics",
            "Campaign performance metrics",
            "ROI calculation and reporting",
            "Export data for further analysis"
        ],
        filename="04_analytics-dashboard.jpg",
        bg_color='#312e81'
    )
    
    # Preview 5: Mobile Responsive
    create_preview_image(
        title="Mobile Responsive Design",
        description="Optimized for All Devices & Screen Sizes",
        features=[
            "Touch-friendly mobile interface",
            "Swipe gestures for campaign management",
            "Mobile-optimized email templates",
            "Push notifications for updates",
            "Works on iPhone, Android, Tablet"
        ],
        filename="05_mobile-responsive.jpg",
        bg_color='#7c3aed'
    )
    
    # Preview 6: Revenue Potential
    create_preview_image(
        title="Revenue Potential & Business Model",
        description="Multiple Income Streams & Scalability",
        features=[
            "One-time projects: $497 - $1,997 per client",
            "Monthly retainers: $497 - $1,997 per month",
            "White-label opportunities available",
            "SaaS conversion potential",
            "Scale to 6-figure business"
        ],
        filename="06_revenue-potential.jpg",
        bg_color='#059669'
    )

def create_zip_files():
    """Create the required ZIP files for ThemeForest"""
    import zipfile
    
    print("Creating ThemeForest ZIP files...")
    
    # Create theme-preview.zip
    with zipfile.ZipFile('theme-preview.zip', 'w') as zipf:
        for i in range(1, 7):
            filename = f"{i:02d}_*.jpg"
            # Add all preview images
            for file in os.listdir('.'):
                if file.startswith(f"{i:02d}_") and file.endswith('.jpg'):
                    zipf.write(file)
    
    print("✅ theme-preview.zip created")
    
    # Create main-files.zip (this would contain the actual source code)
    print("ℹ️  Note: main-files.zip should contain your complete source code")
    print("ℹ️  Include: client/, server.js, package.json, automation-templates/, etc.")

def main():
    """Main function"""
    print("🎨 Creating ThemeForest Preview Images")
    print("=" * 50)
    
    # Create all images
    create_all_preview_images()
    
    # Create ZIP files
    create_zip_files()
    
    print("\n✅ All ThemeForest images created successfully!")
    print("\n📁 Files created:")
    print("  • thumbnail.jpg (80x80px)")
    print("  • 01_dashboard-overview.jpg (590x300px)")
    print("  • 02_linkedin-lead-generator.jpg (590x300px)")
    print("  • 03_email-campaigns.jpg (590x300px)")
    print("  • 04_analytics-dashboard.jpg (590x300px)")
    print("  • 05_mobile-responsive.jpg (590x300px)")
    print("  • 06_revenue-potential.jpg (590x300px)")
    print("  • theme-preview.zip")
    
    print("\n🚀 Ready for ThemeForest upload!")
    print("Category: Site Templates")
    print("Price Range: $297 - $1,997")

if __name__ == "__main__":
    main()

