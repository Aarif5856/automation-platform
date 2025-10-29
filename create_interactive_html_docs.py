#!/usr/bin/env python3
"""
Create Interactive HTML Documentation for TemplateMonster
========================================================

This script converts all markdown documentation to interactive HTML
and creates the proper folder structure for TemplateMonster submission.
"""

import os
import markdown
from datetime import datetime

def create_interactive_html_docs():
    """Create interactive HTML documentation"""
    print("Creating Interactive HTML Documentation...")
    print("=" * 50)
    
    # Create documentation directory
    docs_dir = "documentation"
    if os.path.exists(docs_dir):
        import shutil
        shutil.rmtree(docs_dir)
    os.makedirs(docs_dir)
    
    # HTML template with navigation and styling
    html_template = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} - Automation Dashboard Template</title>
    <style>
        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }}
        
        body {{
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background: #f8f9fa;
        }}
        
        .container {{
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }}
        
        .header {{
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 2rem 0;
            text-align: center;
            margin-bottom: 2rem;
            border-radius: 10px;
        }}
        
        .header h1 {{
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
        }}
        
        .header p {{
            font-size: 1.2rem;
            opacity: 0.9;
        }}
        
        .nav {{
            background: white;
            padding: 1rem;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            margin-bottom: 2rem;
        }}
        
        .nav ul {{
            list-style: none;
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
        }}
        
        .nav a {{
            color: #667eea;
            text-decoration: none;
            padding: 0.5rem 1rem;
            border-radius: 5px;
            transition: all 0.3s ease;
        }}
        
        .nav a:hover {{
            background: #667eea;
            color: white;
        }}
        
        .content {{
            background: white;
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            margin-bottom: 2rem;
        }}
        
        .content h1, .content h2, .content h3 {{
            color: #667eea;
            margin-top: 2rem;
            margin-bottom: 1rem;
        }}
        
        .content h1 {{
            font-size: 2rem;
            border-bottom: 3px solid #667eea;
            padding-bottom: 0.5rem;
        }}
        
        .content h2 {{
            font-size: 1.5rem;
            border-left: 4px solid #667eea;
            padding-left: 1rem;
        }}
        
        .content h3 {{
            font-size: 1.2rem;
            color: #555;
        }}
        
        .content p {{
            margin-bottom: 1rem;
        }}
        
        .content ul, .content ol {{
            margin-left: 2rem;
            margin-bottom: 1rem;
        }}
        
        .content li {{
            margin-bottom: 0.5rem;
        }}
        
        .code-block {{
            background: #f8f9fa;
            border: 1px solid #e9ecef;
            border-radius: 5px;
            padding: 1rem;
            margin: 1rem 0;
            overflow-x: auto;
        }}
        
        .code-block pre {{
            margin: 0;
            font-family: 'Courier New', monospace;
        }}
        
        .highlight {{
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 5px;
            padding: 1rem;
            margin: 1rem 0;
        }}
        
        .success {{
            background: #d4edda;
            border: 1px solid #c3e6cb;
            color: #155724;
            border-radius: 5px;
            padding: 1rem;
            margin: 1rem 0;
        }}
        
        .warning {{
            background: #f8d7da;
            border: 1px solid #f5c6cb;
            color: #721c24;
            border-radius: 5px;
            padding: 1rem;
            margin: 1rem 0;
        }}
        
        .info {{
            background: #d1ecf1;
            border: 1px solid #bee5eb;
            color: #0c5460;
            border-radius: 5px;
            padding: 1rem;
            margin: 1rem 0;
        }}
        
        .footer {{
            text-align: center;
            padding: 2rem;
            color: #666;
            border-top: 1px solid #eee;
        }}
        
        @media (max-width: 768px) {{
            .nav ul {{
                flex-direction: column;
            }}
            
            .header h1 {{
                font-size: 2rem;
            }}
            
            .content {{
                padding: 1rem;
            }}
        }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>{title}</h1>
            <p>Automation Business Dashboard Template Documentation</p>
        </div>
        
        <nav class="nav">
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="installation.html">Installation</a></li>
                <li><a href="quick-start.html">Quick Start</a></li>
                <li><a href="customization.html">Customization</a></li>
                <li><a href="features.html">Features</a></li>
                <li><a href="troubleshooting.html">Troubleshooting</a></li>
                <li><a href="api-reference.html">API Reference</a></li>
                <li><a href="deployment.html">Deployment</a></li>
            </ul>
        </nav>
        
        <div class="content">
            {content}
        </div>
        
        <div class="footer">
            <p>&copy; 2024 Automation Dashboard Template. All rights reserved.</p>
            <p>Template ID: 1692573 | Version: 1.0.0</p>
        </div>
    </div>
</body>
</html>"""
    
    # Documentation files to convert
    docs_files = [
        {
            'source': 'README.md',
            'output': 'index.html',
            'title': 'Template Overview'
        },
        {
            'source': 'TEMPLATEMONSTER_INSTALLATION_GUIDE.md',
            'output': 'installation.html',
            'title': 'Installation Guide'
        },
        {
            'source': 'QUICK_START_VISUAL_GUIDE.md',
            'output': 'quick-start.html',
            'title': 'Quick Start Guide'
        },
        {
            'source': 'SIMPLE_MANUAL_GUIDE.md',
            'output': 'customization.html',
            'title': 'Customization Guide'
        },
        {
            'source': 'AUTOMATION_FEATURES_HIGHLIGHT.md',
            'output': 'features.html',
            'title': 'Features Overview'
        },
        {
            'source': 'TECHNICAL_OPTIMIZATION_REPORT.md',
            'output': 'troubleshooting.html',
            'title': 'Troubleshooting'
        },
        {
            'source': 'DEPLOYMENT_CHECKLIST.md',
            'output': 'deployment.html',
            'title': 'Deployment Guide'
        }
    ]
    
    # Create navigation data
    nav_items = []
    for doc in docs_files:
        nav_items.append(f'<li><a href="{doc["output"]}">{doc["title"]}</a></li>')
    
    # Convert each documentation file
    for doc in docs_files:
        if os.path.exists(doc['source']):
            print(f"Converting {doc['source']} to {doc['output']}...")
            
            # Read markdown content
            with open(doc['source'], 'r', encoding='utf-8') as f:
                markdown_content = f.read()
            
            # Convert markdown to HTML
            html_content = markdown.markdown(markdown_content, extensions=['codehilite', 'fenced_code'])
            
            # Create full HTML page
            full_html = html_template.format(
                title=doc['title'],
                content=html_content
            )
            
            # Write HTML file
            output_path = os.path.join(docs_dir, doc['output'])
            with open(output_path, 'w', encoding='utf-8') as f:
                f.write(full_html)
            
            print(f"✅ Created {output_path}")
        else:
            print(f"⚠️  Warning: {doc['source']} not found")
    
    # Create main index.html
    index_content = """
    <h1>Welcome to Automation Dashboard Template</h1>
    
    <div class="info">
        <h3>🚀 Complete Business Automation Solution</h3>
        <p>This template provides everything you need to start an automation business, including lead generation, email marketing, web scraping, and analytics tools.</p>
    </div>
    
    <h2>What's Included</h2>
    <ul>
        <li><strong>React.js Frontend</strong> - Modern, responsive dashboard</li>
        <li><strong>Node.js Backend</strong> - RESTful API with Express</li>
        <li><strong>MongoDB Database</strong> - Scalable data storage</li>
        <li><strong>15+ Automation Tools</strong> - Ready-to-use Python scripts</li>
        <li><strong>Demo Data</strong> - Sample clients and campaigns</li>
        <li><strong>Complete Documentation</strong> - Setup and customization guides</li>
    </ul>
    
    <h2>Quick Start</h2>
    <div class="code-block">
        <pre><code># Install dependencies
npm install
cd client && npm install && cd ..

# Setup environment
cp .env.example .env

# Start the application
npm start</code></pre>
    </div>
    
    <div class="success">
        <h3>✅ Ready to Use</h3>
        <p>Follow the <a href="installation.html">Installation Guide</a> to get started in minutes!</p>
    </div>
    
    <h2>Revenue Potential</h2>
    <ul>
        <li><strong>Service Pricing:</strong> $500-2,000/month per client</li>
        <li><strong>Client Capacity:</strong> 10-50 clients</li>
        <li><strong>Monthly Revenue:</strong> $5,000-100,000+</li>
        <li><strong>Break-even:</strong> 1-2 clients</li>
    </ul>
    
    <h2>Documentation</h2>
    <p>Use the navigation menu above to access detailed guides for installation, customization, features, and deployment.</p>
    """
    
    # Create main index
    main_index = html_template.format(
        title="Template Overview",
        content=index_content
    )
    
    with open(os.path.join(docs_dir, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(main_index)
    
    print(f"\n✅ Interactive HTML Documentation Created!")
    print(f"📁 Location: {docs_dir}/")
    print(f"📄 Files created: {len(docs_files) + 1}")
    
    return docs_dir

if __name__ == "__main__":
    create_interactive_html_docs()





