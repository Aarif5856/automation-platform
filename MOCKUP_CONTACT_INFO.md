# 🎭 Mockup Contact Information - Replace Real Data

## ❌ REMOVE (Your Real Info)

### Real Contact Info to DELETE:
```
❌ Phone: +1 (555) 123-4567
❌ Email: contact@example.com
❌ Email: support@example.com
❌ Address: 123 Business Avenue, New York, NY 10001
❌ Website: #
❌ Website: #
❌ Social: facebook.com/yourpage
❌ Social: twitter.com/yourhandle
❌ Social: linkedin.com/company/yourcompany
```

---

## ✅ REPLACE WITH (Mockup Data)

### Professional Mockup Contact Information:

```javascript
// Mockup Company Information
const mockupContact = {
  companyName: "Automation Solutions Inc.",
  tagline: "Your Business Automation Partner",
  
  // Mockup Email (use example.com domain)
  email: "contact@example.com",
  supportEmail: "support@example.com",
  salesEmail: "sales@example.com",
  
  // Mockup Phone (use standard example format)
  phone: "+1 (555) 123-4567",
  tollFree: "+1 (800) 123-4567",
  
  // Mockup Address
  address: {
    street: "123 Business Avenue",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "United States"
  },
  
  // Mockup Social Links (use # for all)
  social: {
    facebook: "#",
    twitter: "#",
    linkedin: "#",
    instagram: "#",
    youtube: "#"
  },
  
  // Mockup Website
  website: "#",
  
  // Working Hours
  hours: "Monday - Friday: 9:00 AM - 6:00 PM EST"
};
```

---

## 📝 HTML MOCKUP EXAMPLES

### Example 1: Footer Contact Section

**BEFORE (Your Real Data):**
```html
<div class="contact-info">
  <h3>Contact Us</h3>
  <p><strong>Email:</strong> contact@example.com</p>
  <p><strong>Phone:</strong> +1 (555) 123-4567</p>
  <p><strong>Address:</strong> 123 Business Avenue, New York, NY 10001</p>
</div>
```

**AFTER (Mockup Data):**
```html
<div class="contact-info">
  <h3>Contact Us</h3>
  <p><strong>Email:</strong> contact@example.com</p>
  <p><strong>Phone:</strong> +1 (555) 123-4567</p>
  <p><strong>Address:</strong> 123 Business Avenue, New York, NY 10001</p>
</div>
```

### Example 2: Contact Page

**BEFORE:**
```html
<section class="contact-section">
  <h2>Get In Touch</h2>
  <div class="contact-details">
    <div class="contact-item">
      <i class="fas fa-envelope"></i>
      <a href="mailto:contact@example.com">contact@example.com</a>
    </div>
    <div class="contact-item">
      <i class="fas fa-phone"></i>
      <a href="tel:+1 (555) 123-4567">+1 (555) 123-4567</a>
    </div>
    <div class="contact-item">
      <i class="fas fa-map-marker-alt"></i>
      <p>123 Business Avenue, New York, NY 10001</p>
    </div>
  </div>
</section>
```

**AFTER (Mockup):**
```html
<section class="contact-section">
  <h2>Get In Touch</h2>
  <div class="contact-details">
    <div class="contact-item">
      <i class="fas fa-envelope"></i>
      <a href="mailto:contact@example.com">contact@example.com</a>
    </div>
    <div class="contact-item">
      <i class="fas fa-phone"></i>
      <a href="tel:+15551234567">+1 (555) 123-4567</a>
    </div>
    <div class="contact-item">
      <i class="fas fa-map-marker-alt"></i>
      <p>123 Business Avenue, New York, NY 10001</p>
    </div>
  </div>
</section>
```

### Example 3: Social Media Links

**BEFORE:**
```html
<div class="social-links">
  <a href="#" target="_blank">
    <i class="fab fa-facebook"></i>
  </a>
  <a href="#" target="_blank">
    <i class="fab fa-twitter"></i>
  </a>
  <a href="#" target="_blank">
    <i class="fab fa-linkedin"></i>
  </a>
</div>
```

**AFTER (Mockup):**
```html
<div class="social-links">
  <a href="#">
    <i class="fab fa-facebook"></i>
  </a>
  <a href="#">
    <i class="fab fa-x-twitter"></i>
  </a>
  <a href="#">
    <i class="fab fa-linkedin"></i>
  </a>
</div>
```

---

## ⚛️ REACT/JSX MOCKUP EXAMPLES

### Example 1: Footer Component

**BEFORE:**
```jsx
// Footer.js
const Footer = () => {
  return (
    <Box>
      <Text>Email: contact@example.com</Text>
      <Text>Phone: +1 (555) 123-4567</Text>
      <Text>Address: 123 Business Avenue, New York, NY 10001</Text>
      
      <HStack spacing={4}>
        <Link href="#" isExternal>
          <Icon as={FaFacebook} />
        </Link>
        <Link href="#" isExternal>
          <Icon as={FaTwitter} />
        </Link>
      </HStack>
    </Box>
  );
};
```

**AFTER (Mockup):**
```jsx
// Footer.js
const Footer = () => {
  return (
    <Box>
      <Text>Email: contact@example.com</Text>
      <Text>Phone: +1 (555) 123-4567</Text>
      <Text>Address: 123 Business Avenue, New York, NY 10001</Text>
      
      <HStack spacing={4}>
        <Link href="#">
          <Icon as={FaFacebook} />
        </Link>
        <Link href="#">
          <Icon as={FaXTwitter} />
        </Link>
      </HStack>
    </Box>
  );
};
```

### Example 2: Contact Component

**BEFORE:**
```jsx
// Contact.js
import { Box, Text, Link } from '@chakra-ui/react';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Send to real email
    emailjs.send('service_id', 'template_id', {
      to_email: 'contact@example.com'
    });
  };

  return (
    <Box>
      <Text>Contact us at: contact@example.com</Text>
      <Link href="#">Visit Our Website</Link>
    </Box>
  );
};
```

**AFTER (Mockup):**
```jsx
// Contact.js
import { Box, Text, Link } from '@chakra-ui/react';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Send to example email
    emailjs.send('service_id', 'template_id', {
      to_email: 'contact@example.com'
    });
  };

  return (
    <Box>
      <Text>Contact us at: contact@example.com</Text>
      <Link href="#">Visit Our Website</Link>
    </Box>
  );
};
```

---

## 📧 EMAIL FORM MOCKUP

### Contact Form Handler

**BEFORE:**
```javascript
// contact-handler.js
const recipient = "contact@example.com";
const ccEmail = "support@example.com";
```

**AFTER:**
```javascript
// contact-handler.js
const recipient = "contact@example.com";
const ccEmail = "support@example.com";
```

---

## 🗺️ GOOGLE MAPS MOCKUP

### Map Embed Code

**BEFORE:**
```html
<!-- Real Qatar location -->
<iframe 
  src="https://maps.google.com/maps?q=Al+Markhiya+Doha+Qatar&output=embed"
  width="600" 
  height="450">
</iframe>
```

**AFTER (Mockup Location):**
```html
<!-- Example New York location -->
<iframe 
  src="https://maps.google.com/maps?q=New+York+NY&output=embed"
  width="600" 
  height="450">
</iframe>
```

---

## 💼 BUSINESS INFO MOCKUP

### About Page / Company Info

**BEFORE:**
```html
<div class="company-info">
  <h2>About Automation Pro</h2>
  <p>Located in New York, NY</p>
  <p>Founded by [Your Name]</p>
  <p>Contact: contact@example.com</p>
</div>
```

**AFTER:**
```html
<div class="company-info">
  <h2>About Automation Solutions Inc.</h2>
  <p>Located in New York, NY</p>
  <p>Founded in 2020</p>
  <p>Contact: contact@example.com</p>
</div>
```

---

## 🎨 CSS COMMENTS MOCKUP

### Author Information in CSS

**BEFORE:**
```css
/**
 * Automation Dashboard Template
 * Author: Your Name
 * Email: contact@example.com
 * Website: #
 * Version: 1.0
 */
```

**AFTER:**
```css
/**
 * Automation Dashboard Template
 * For support, contact through TemplateMonster profile
 * Version: 1.0
 */
```

---

## 📄 README.md MOCKUP

**BEFORE:**
```markdown
# Automation Dashboard Template

## Contact

- **Email:** contact@example.com
- **Phone:** +1 (555) 123-4567
- **Website:** #

## Support

For support, email: support@example.com
```

**AFTER:**
```markdown
# Automation Dashboard Template

## Contact

- **Email:** contact@example.com
- **Phone:** +1 (555) 123-4567
- **Website:** Demo purposes only

## Support

For support, contact through TemplateMonster profile
```

---

## 🔍 SEARCH & REPLACE GUIDE

### Use VS Code Global Search & Replace:

**Step 1: Press `Ctrl+Shift+F` (Windows) or `Cmd+Shift+F` (Mac)**

**Step 2: Use These Patterns:**

```
FIND: info@the-automatepro\.info
REPLACE: contact@example.com

FIND: 5856music@gmail\.com
REPLACE: support@example.com

FIND: \+974\s*33288952
REPLACE: +1 (555) 123-4567

FIND: 123 Business Avenue, New York, NY 10001
REPLACE: 123 Business Avenue, New York, NY 10001

FIND: https?://(?:www\.)?the-automatepro\.info
REPLACE: #

FIND: facebook\.com/[^\s"'<>]+
REPLACE: #

FIND: twitter\.com/[^\s"'<>]+
REPLACE: #

FIND: linkedin\.com/[^\s"'<>]+
REPLACE: #
```

---

## 🚀 QUICK AUTOMATION SCRIPT

### Create this file: `replace-contact-info.js`

```javascript
const fs = require('fs');
const path = require('path');

// Mockup data
const replacements = {
  'contact@example.com': 'contact@example.com',
  'support@example.com': 'support@example.com',
  '+1 (555) 123-4567': '+1 (555) 123-4567',
  '123 Business Avenue, New York, NY 10001': '123 Business Avenue, New York, NY 10001',
  '#': '#',
  '#': '#',
  '#': '#',
  '#': '#'
};

// Function to replace in file
function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  for (const [find, replace] of Object.entries(replacements)) {
    if (content.includes(find)) {
      content = content.replace(new RegExp(find, 'g'), replace);
      modified = true;
    }
  }
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Updated: ${filePath}`);
  }
}

// Recursively process directory
function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Skip node_modules and .git
      if (file !== 'node_modules' && file !== '.git') {
        processDirectory(filePath);
      }
    } else if (file.match(/\.(js|jsx|html|css|md|json)$/)) {
      replaceInFile(filePath);
    }
  });
}

// Run
console.log('🔄 Replacing contact information with mockup data...\n');
processDirectory('./client');
console.log('\n✅ Done! All contact info replaced with mockup data.');
```

**To use:**
```bash
node replace-contact-info.js
```

---

## ✅ VERIFICATION CHECKLIST

After replacing, verify these are all mockup data:

- [ ] All emails use `@example.com` domain
- [ ] All phone numbers use `+1 (555) xxx-xxxx` format
- [ ] All addresses use example locations (New York, NY)
- [ ] All social links point to `#`
- [ ] All website links point to `#`
- [ ] No real company names
- [ ] No real personal information

---

## 🎭 MOCKUP VARIATIONS

### If You Need Different Mockups:

**Tech Company Style:**
```javascript
companyName: "TechFlow Solutions"
email: "hello@techflow.example"
phone: "+1 (555) 987-6543"
address: "456 Innovation Drive, San Francisco, CA 94102"
```

**Agency Style:**
```javascript
companyName: "Creative Agency Co."
email: "contact@agency.example"
phone: "+1 (555) 246-8135"
address: "789 Design Street, Los Angeles, CA 90001"
```

**Corporate Style:**
```javascript
companyName: "Global Business Corp."
email: "info@business.example"
phone: "+1 (800) 555-0123"
address: "321 Corporate Plaza, Chicago, IL 60601"
```

---

## 🎨 VISUAL MOCKUP TIPS

### For Screenshots:
1. Use mockup data in all screenshots
2. Blur any remaining real data
3. Use generic company names
4. Show example data, not real client info

### For Demo:
1. Use demo email addresses
2. Show test data only
3. No real customer information
4. Clear "Demo Mode" indicators

---

## ✅ FINAL CHECK

Run these searches to verify all real info is removed:

```bash
# Search for real email
grep -r "#" client/

# Search for real phone
grep -r "+974" client/

# Search for Qatar address
grep -r "Qatar" client/

# Should return ZERO results!
```

---

## 🎉 YOU'RE DONE WHEN:

- ✅ All real contact info replaced with mockup
- ✅ All emails use @example.com
- ✅ All phone numbers are (555) format
- ✅ All addresses are example locations
- ✅ All social links are #
- ✅ No verification searches find real data

**Template is now TemplateMonster compliant! 🚀**


