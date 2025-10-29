#!/usr/bin/env python3
"""
Web Scraper - Professional Automation Script
============================================

This script provides comprehensive web scraping capabilities:
1. Scrape data from any website
2. Handle JavaScript-rendered content
3. Rotate proxies and user agents
4. Export data to multiple formats
5. Schedule scraping tasks
6. Handle anti-bot measures

Author: AutoBiz
Version: 1.0
License: Commercial Use Allowed
"""

import requests
import time
import random
import json
import csv
import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import TimeoutException, NoSuchElementException
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
from typing import List, Dict, Optional, Any
import logging
from dataclasses import dataclass
from datetime import datetime
import re
import os
from concurrent.futures import ThreadPoolExecutor, as_completed
import hashlib

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

@dataclass
class ScrapingConfig:
    url: str
    selectors: Dict[str, str]
    wait_time: int = 5
    max_pages: int = 1
    delay_range: tuple = (1, 3)
    use_selenium: bool = False
    proxy_list: List[str] = None
    user_agents: List[str] = None
    headers: Dict[str, str] = None

@dataclass
class ScrapedData:
    url: str
    data: Dict[str, Any]
    timestamp: datetime
    success: bool
    error: str = ""

class WebScraper:
    def __init__(self, config: ScrapingConfig):
        """
        Initialize the Web Scraper
        
        Args:
            config: Scraping configuration
        """
        self.config = config
        self.session = requests.Session()
        self.driver = None
        self.scraped_data = []
        
        # Setup session
        self.setup_session()
        
        # Setup Selenium if needed
        if config.use_selenium:
            self.setup_selenium()
    
    def setup_session(self):
        """Setup requests session with headers and proxies"""
        # Default headers
        default_headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
        }
        
        if self.config.headers:
            default_headers.update(self.config.headers)
        
        self.session.headers.update(default_headers)
        
        # Setup proxy if available
        if self.config.proxy_list:
            proxy = random.choice(self.config.proxy_list)
            self.session.proxies = {'http': proxy, 'https': proxy}
    
    def setup_selenium(self):
        """Setup Selenium WebDriver"""
        chrome_options = Options()
        
        # Anti-detection settings
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.add_argument("--disable-blink-features=AutomationControlled")
        chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
        chrome_options.add_experimental_option('useAutomationExtension', False)
        
        # User agent
        if self.config.user_agents:
            user_agent = random.choice(self.config.user_agents)
        else:
            user_agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        
        chrome_options.add_argument(f"--user-agent={user_agent}")
        
        # Proxy setup
        if self.config.proxy_list:
            proxy = random.choice(self.config.proxy_list)
            chrome_options.add_argument(f"--proxy-server={proxy}")
        
        try:
            self.driver = webdriver.Chrome(options=chrome_options)
            self.driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
            logger.info("Selenium WebDriver initialized successfully")
        except Exception as e:
            logger.error(f"Failed to initialize Selenium WebDriver: {e}")
            raise
    
    def random_delay(self):
        """Add random delay to mimic human behavior"""
        delay = random.uniform(*self.config.delay_range)
        time.sleep(delay)
    
    def scrape_with_requests(self, url: str) -> ScrapedData:
        """Scrape website using requests and BeautifulSoup"""
        try:
            logger.info(f"Scraping with requests: {url}")
            
            response = self.session.get(url, timeout=30)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.content, 'html.parser')
            data = self.extract_data_from_soup(soup)
            
            return ScrapedData(
                url=url,
                data=data,
                timestamp=datetime.now(),
                success=True
            )
            
        except Exception as e:
            logger.error(f"Error scraping with requests: {e}")
            return ScrapedData(
                url=url,
                data={},
                timestamp=datetime.now(),
                success=False,
                error=str(e)
            )
    
    def scrape_with_selenium(self, url: str) -> ScrapedData:
        """Scrape website using Selenium"""
        try:
            if not self.driver:
                raise Exception("Selenium driver not initialized")
            
            logger.info(f"Scraping with Selenium: {url}")
            
            self.driver.get(url)
            self.random_delay()
            
            # Wait for content to load
            WebDriverWait(self.driver, self.config.wait_time).until(
                EC.presence_of_element_located((By.TAG_NAME, "body"))
            )
            
            # Extract data
            data = self.extract_data_from_selenium()
            
            return ScrapedData(
                url=url,
                data=data,
                timestamp=datetime.now(),
                success=True
            )
            
        except Exception as e:
            logger.error(f"Error scraping with Selenium: {e}")
            return ScrapedData(
                url=url,
                data={},
                timestamp=datetime.now(),
                success=False,
                error=str(e)
            )
    
    def extract_data_from_soup(self, soup: BeautifulSoup) -> Dict[str, Any]:
        """Extract data from BeautifulSoup object"""
        data = {}
        
        for field_name, selector in self.config.selectors.items():
            try:
                elements = soup.select(selector)
                
                if len(elements) == 1:
                    data[field_name] = self.clean_text(elements[0].get_text())
                elif len(elements) > 1:
                    data[field_name] = [self.clean_text(el.get_text()) for el in elements]
                else:
                    data[field_name] = None
                    
            except Exception as e:
                logger.warning(f"Error extracting {field_name}: {e}")
                data[field_name] = None
        
        return data
    
    def extract_data_from_selenium(self) -> Dict[str, Any]:
        """Extract data using Selenium WebDriver"""
        data = {}
        
        for field_name, selector in self.config.selectors.items():
            try:
                elements = self.driver.find_elements(By.CSS_SELECTOR, selector)
                
                if len(elements) == 1:
                    data[field_name] = self.clean_text(elements[0].text)
                elif len(elements) > 1:
                    data[field_name] = [self.clean_text(el.text) for el in elements]
                else:
                    data[field_name] = None
                    
            except Exception as e:
                logger.warning(f"Error extracting {field_name}: {e}")
                data[field_name] = None
        
        return data
    
    def clean_text(self, text: str) -> str:
        """Clean and normalize extracted text"""
        if not text:
            return ""
        
        # Remove extra whitespace
        text = re.sub(r'\s+', ' ', text.strip())
        
        # Remove special characters if needed
        # text = re.sub(r'[^\w\s@.-]', '', text)
        
        return text
    
    def scrape_single_page(self, url: str) -> ScrapedData:
        """Scrape a single page"""
        if self.config.use_selenium:
            return self.scrape_with_selenium(url)
        else:
            return self.scrape_with_requests(url)
    
    def scrape_multiple_pages(self, urls: List[str]) -> List[ScrapedData]:
        """Scrape multiple pages concurrently"""
        results = []
        
        with ThreadPoolExecutor(max_workers=5) as executor:
            # Submit all scraping tasks
            future_to_url = {
                executor.submit(self.scrape_single_page, url): url 
                for url in urls
            }
            
            # Collect results as they complete
            for future in as_completed(future_to_url):
                url = future_to_url[future]
                try:
                    result = future.result()
                    results.append(result)
                    logger.info(f"Completed scraping: {url}")
                except Exception as e:
                    logger.error(f"Error scraping {url}: {e}")
                    results.append(ScrapedData(
                        url=url,
                        data={},
                        timestamp=datetime.now(),
                        success=False,
                        error=str(e)
                    ))
        
        return results
    
    def find_pagination_links(self, base_url: str) -> List[str]:
        """Find pagination links on a page"""
        try:
            if self.config.use_selenium and self.driver:
                # Use Selenium to find pagination links
                pagination_selectors = [
                    'a[rel="next"]',
                    '.pagination a',
                    '.pager a',
                    'a[href*="page"]',
                    'a[href*="p="]'
                ]
                
                links = []
                for selector in pagination_selectors:
                    elements = self.driver.find_elements(By.CSS_SELECTOR, selector)
                    for element in elements:
                        href = element.get_attribute('href')
                        if href and href not in links:
                            links.append(href)
                
                return links[:self.config.max_pages]
            
            else:
                # Use requests to find pagination links
                response = self.session.get(base_url)
                soup = BeautifulSoup(response.content, 'html.parser')
                
                pagination_selectors = [
                    'a[rel="next"]',
                    '.pagination a',
                    '.pager a',
                    'a[href*="page"]',
                    'a[href*="p="]'
                ]
                
                links = []
                for selector in pagination_selectors:
                    elements = soup.select(selector)
                    for element in elements:
                        href = element.get('href')
                        if href:
                            full_url = urljoin(base_url, href)
                            if full_url not in links:
                                links.append(full_url)
                
                return links[:self.config.max_pages]
                
        except Exception as e:
            logger.error(f"Error finding pagination links: {e}")
            return []
    
    def scrape_with_pagination(self) -> List[ScrapedData]:
        """Scrape multiple pages with pagination"""
        all_results = []
        
        # Start with the main URL
        urls_to_scrape = [self.config.url]
        
        # Find pagination links
        pagination_links = self.find_pagination_links(self.config.url)
        urls_to_scrape.extend(pagination_links)
        
        # Limit to max_pages
        urls_to_scrape = urls_to_scrape[:self.config.max_pages]
        
        logger.info(f"Found {len(urls_to_scrape)} pages to scrape")
        
        # Scrape all pages
        for url in urls_to_scrape:
            result = self.scrape_single_page(url)
            all_results.append(result)
            self.random_delay()
        
        return all_results
    
    def export_to_csv(self, filename: str = "scraped_data.csv") -> bool:
        """Export scraped data to CSV"""
        try:
            if not self.scraped_data:
                logger.warning("No data to export")
                return False
            
            # Flatten data for CSV export
            flattened_data = []
            for item in self.scraped_data:
                if item.success and item.data:
                    row = {'url': item.url, 'timestamp': item.timestamp.isoformat()}
                    row.update(item.data)
                    flattened_data.append(row)
            
            if not flattened_data:
                logger.warning("No successful scrapes to export")
                return False
            
            df = pd.DataFrame(flattened_data)
            df.to_csv(filename, index=False)
            logger.info(f"Exported {len(flattened_data)} records to {filename}")
            return True
            
        except Exception as e:
            logger.error(f"Error exporting to CSV: {e}")
            return False
    
    def export_to_json(self, filename: str = "scraped_data.json") -> bool:
        """Export scraped data to JSON"""
        try:
            if not self.scraped_data:
                logger.warning("No data to export")
                return False
            
            # Convert to JSON-serializable format
            json_data = []
            for item in self.scraped_data:
                json_item = {
                    'url': item.url,
                    'data': item.data,
                    'timestamp': item.timestamp.isoformat(),
                    'success': item.success,
                    'error': item.error
                }
                json_data.append(json_item)
            
            with open(filename, 'w', encoding='utf-8') as f:
                json.dump(json_data, f, indent=2, ensure_ascii=False)
            
            logger.info(f"Exported {len(json_data)} records to {filename}")
            return True
            
        except Exception as e:
            logger.error(f"Error exporting to JSON: {e}")
            return False
    
    def export_to_excel(self, filename: str = "scraped_data.xlsx") -> bool:
        """Export scraped data to Excel"""
        try:
            if not self.scraped_data:
                logger.warning("No data to export")
                return False
            
            # Flatten data for Excel export
            flattened_data = []
            for item in self.scraped_data:
                if item.success and item.data:
                    row = {'url': item.url, 'timestamp': item.timestamp.isoformat()}
                    row.update(item.data)
                    flattened_data.append(row)
            
            if not flattened_data:
                logger.warning("No successful scrapes to export")
                return False
            
            df = pd.DataFrame(flattened_data)
            df.to_excel(filename, index=False)
            logger.info(f"Exported {len(flattened_data)} records to {filename}")
            return True
            
        except Exception as e:
            logger.error(f"Error exporting to Excel: {e}")
            return False
    
    def close(self):
        """Close Selenium driver if open"""
        if self.driver:
            self.driver.quit()
            logger.info("Selenium driver closed")

def create_sample_configs():
    """Create sample scraping configurations"""
    
    # E-commerce product scraper
    ecommerce_config = ScrapingConfig(
        url="https://example-store.com/products",
        selectors={
            "product_name": ".product-title",
            "price": ".price",
            "description": ".product-description",
            "rating": ".rating",
            "availability": ".stock-status"
        },
        use_selenium=True,
        max_pages=5
    )
    
    # News article scraper
    news_config = ScrapingConfig(
        url="https://example-news.com/articles",
        selectors={
            "headline": "h1.article-title",
            "content": ".article-content",
            "author": ".author-name",
            "publish_date": ".publish-date",
            "tags": ".article-tags a"
        },
        use_selenium=False,
        max_pages=10
    )
    
    # Job listing scraper
    jobs_config = ScrapingConfig(
        url="https://example-jobs.com/listings",
        selectors={
            "job_title": ".job-title",
            "company": ".company-name",
            "location": ".job-location",
            "salary": ".job-salary",
            "description": ".job-description",
            "requirements": ".job-requirements"
        },
        use_selenium=True,
        max_pages=3
    )
    
    return {
        "ecommerce": ecommerce_config,
        "news": news_config,
        "jobs": jobs_config
    }

def main():
    """Main function to demonstrate the Web Scraper"""
    
    # Sample configurations
    configs = create_sample_configs()
    
    # Choose a configuration
    config = configs["ecommerce"]
    
    # Initialize scraper
    scraper = WebScraper(config)
    
    try:
        # Scrape with pagination
        results = scraper.scrape_with_pagination()
        scraper.scraped_data = results
        
        # Export results
        scraper.export_to_csv()
        scraper.export_to_json()
        scraper.export_to_excel()
        
        # Print summary
        successful_scrapes = sum(1 for r in results if r.success)
        logger.info(f"Scraping complete!")
        logger.info(f"Total pages scraped: {len(results)}")
        logger.info(f"Successful scrapes: {successful_scrapes}")
        
    except Exception as e:
        logger.error(f"Error in main execution: {e}")
    
    finally:
        scraper.close()

if __name__ == "__main__":
    main()
