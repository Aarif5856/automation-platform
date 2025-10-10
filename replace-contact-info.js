#!/usr/bin/env node

/**
 * Automated Contact Info Replacement Script
 * Replaces real contact information with mockup data for TemplateMonster submission
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes for pretty console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// Mockup replacement data
const replacements = {
  // Email addresses
  'contact@example.com': 'contact@example.com',
  'support@example.com': 'support@example.com',
  
  // Phone numbers
  '+1 (555) 123-4567': '+1 (555) 123-4567',
  '+1 (555) 123-4567': '+1 (555) 123-4567',
  
  // Physical addresses
  '123 Business Avenue, New York, NY 10001': '123 Business Avenue, New York, NY 10001',
  '123 Business Avenue': '123 Business Avenue',
  'New York, NY 10001': 'New York, NY 10001',
  'New York, NY': 'New York, NY',
  
  // Website URLs
  '#': '#',
  '#': '#',
  '#': '#',
  '#': '#',
  '#': '#',
  '#': '#',
  
  // Company name (optional - adjust if needed)
  'Automation Solutions Inc.': 'Automation Solutions Inc.',
  'Automation Solutions': 'Automation Solutions'
};

// Social media patterns (will be replaced with #)
const socialPatterns = [
  /https?:\/\/(www\.)?facebook\.com\/[^\s"'<>]+/g,
  /https?:\/\/(www\.)?twitter\.com\/[^\s"'<>]+/g,
  /https?:\/\/(www\.)?linkedin\.com\/[^\s"'<>]+/g,
  /https?:\/\/(www\.)?instagram\.com\/[^\s"'<>]+/g,
  /https?:\/\/(www\.)?youtube\.com\/[^\s"'<>]+/g
];

// Statistics
let stats = {
  filesScanned: 0,
  filesModified: 0,
  replacementsMade: 0
};

/**
 * Replace content in a single file
 */
function replaceInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;
    let fileReplacements = 0;
    
    // Apply direct replacements
    for (const [find, replace] of Object.entries(replacements)) {
      const regex = new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      const matches = content.match(regex);
      if (matches) {
        content = content.replace(regex, replace);
        fileReplacements += matches.length;
      }
    }
    
    // Replace social media URLs
    socialPatterns.forEach(pattern => {
      const matches = content.match(pattern);
      if (matches) {
        content = content.replace(pattern, '#');
        fileReplacements += matches.length;
      }
    });
    
    // Only write if content changed
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      stats.filesModified++;
      stats.replacementsMade += fileReplacements;
      console.log(`${colors.green}✅ ${colors.cyan}${path.relative(process.cwd(), filePath)}${colors.reset} - ${fileReplacements} replacement(s)`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.log(`${colors.red}❌ Error processing ${filePath}: ${error.message}${colors.reset}`);
    return false;
  }
}

/**
 * Recursively process directory
 */
function processDirectory(dir, depth = 0) {
  // Skip if doesn't exist
  if (!fs.existsSync(dir)) {
    console.log(`${colors.yellow}⚠️  Directory not found: ${dir}${colors.reset}`);
    return;
  }
  
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    
    try {
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        // Skip certain directories
        const skipDirs = ['node_modules', '.git', '.next', 'build', 'dist', '.cache'];
        if (!skipDirs.includes(file)) {
          processDirectory(filePath, depth + 1);
        }
      } else if (stat.isFile()) {
        // Process these file types
        const processExtensions = ['.js', '.jsx', '.ts', '.tsx', '.html', '.css', '.scss', '.md', '.json', '.txt'];
        const ext = path.extname(file).toLowerCase();
        
        if (processExtensions.includes(ext)) {
          stats.filesScanned++;
          replaceInFile(filePath);
        }
      }
    } catch (error) {
      console.log(`${colors.red}❌ Error accessing ${filePath}: ${error.message}${colors.reset}`);
    }
  });
}

/**
 * Main execution
 */
function main() {
  console.log(`\n${colors.bright}${colors.cyan}========================================${colors.reset}`);
  console.log(`${colors.bright}${colors.cyan}  Contact Info Replacement Tool${colors.reset}`);
  console.log(`${colors.bright}${colors.cyan}========================================${colors.reset}\n`);
  
  console.log(`${colors.yellow}🔄 Replacing real contact info with mockup data...${colors.reset}\n`);
  
  // Directories to process
  const dirsToProcess = ['client', 'src', '.'];
  
  dirsToProcess.forEach(dir => {
    if (fs.existsSync(dir)) {
      console.log(`${colors.blue}📁 Processing directory: ${dir}${colors.reset}\n`);
      processDirectory(dir);
    }
  });
  
  // Display results
  console.log(`\n${colors.bright}${colors.cyan}========================================${colors.reset}`);
  console.log(`${colors.bright}${colors.green}  Results${colors.reset}`);
  console.log(`${colors.bright}${colors.cyan}========================================${colors.reset}\n`);
  
  console.log(`${colors.cyan}📊 Files scanned:${colors.reset} ${stats.filesScanned}`);
  console.log(`${colors.green}✅ Files modified:${colors.reset} ${stats.filesModified}`);
  console.log(`${colors.magenta}🔄 Total replacements:${colors.reset} ${stats.replacementsMade}\n`);
  
  if (stats.filesModified > 0) {
    console.log(`${colors.bright}${colors.green}✅ SUCCESS!${colors.reset} All contact information replaced with mockup data.\n`);
    console.log(`${colors.yellow}⚠️  IMPORTANT: Review the changes before committing!${colors.reset}`);
    console.log(`${colors.yellow}   Run: git diff${colors.reset}\n`);
  } else {
    console.log(`${colors.yellow}⚠️  No changes made. Either files already updated or no contact info found.${colors.reset}\n`);
  }
  
  console.log(`${colors.cyan}💡 TIP: Search for any remaining real data:${colors.reset}`);
  console.log(`${colors.cyan}   grep -r "the-automatepro" .${colors.reset}`);
  console.log(`${colors.cyan}   grep -r "+974" .${colors.reset}\n`);
}

// Run the script
main();

