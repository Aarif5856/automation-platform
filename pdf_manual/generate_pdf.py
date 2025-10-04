
# PDF Generation Script
# Install required packages: pip install weasyprint

import weasyprint
from weasyprint import HTML, CSS

def generate_pdf():
    # Read HTML file
    with open('manual.html', 'r', encoding='utf-8') as f:
        html_content = f.read()
    
    # Create HTML object
    html = HTML(string=html_content)
    
    # Generate PDF
    html.write_pdf('Automation_Business_Manual.pdf')
    print("PDF generated successfully!")

if __name__ == "__main__":
    generate_pdf()
