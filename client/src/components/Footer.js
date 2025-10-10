import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiMail, FiPhone, FiMapPin, FiLinkedin, FiGithub } from 'react-icons/fi';
import { FaXTwitter } from 'react-icons/fa6';

const FooterContainer = styled.footer`
  background: #1f2937;
  color: #f9fafb;
  padding: 60px 0 20px;
  margin-top: 80px;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
`;

const FooterSection = styled.div`
  h3 {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 20px;
    color: #ffffff;
  }

  p {
    color: #d1d5db;
    line-height: 1.6;
    margin-bottom: 16px;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 12px;
  }

  a {
    color: #d1d5db;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: #3b82f6;
    }
  }
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  color: #d1d5db;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 20px;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: #374151;
  border-radius: 8px;
  color: #d1d5db;
  text-decoration: none;
  transition: all 0.2s;

  &:hover {
    background: #3b82f6;
    color: white;
    transform: translateY(-2px);
  }
`;

const NewsletterForm = styled.form`
  display: flex;
  gap: 8px;
  margin-top: 20px;

  input {
    flex: 1;
    padding: 12px;
    border: 1px solid #374151;
    border-radius: 8px;
    background: #374151;
    color: white;
    font-size: 14px;

    &::placeholder {
      color: #9ca3af;
    }

    &:focus {
      outline: none;
      border-color: #3b82f6;
    }
  }

  button {
    background: #3b82f6;
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background: #2563eb;
    }
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid #374151;
  margin-top: 40px;
  padding-top: 20px;
  text-align: center;
  color: #9ca3af;
  font-size: 14px;
`;

const Footer = () => {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    alert('Thank you for subscribing to our newsletter!');
  };

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>The Automate Pro</h3>
          <p>
            Professional automation services that help businesses scale efficiently. 
            We provide powerful tools and solutions to automate your workflows and 
            generate more leads.
          </p>
          <SocialLinks>
            <SocialLink href="#" aria-label="LinkedIn">
              <FiLinkedin />
            </SocialLink>
            <SocialLink href="#" aria-label="X">
              <FaXTwitter />
            </SocialLink>
            <SocialLink href="#" aria-label="GitHub">
              <FiGithub />
            </SocialLink>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <h3>Services</h3>
          <ul>
            <li><Link to="/services#lead-generation">Lead Generation</Link></li>
            <li><Link to="/services#web-scraping">Web Scraping</Link></li>
            <li><Link to="/services#social-media">Social Media Automation</Link></li>
            <li><Link to="/services#email-marketing">Email Marketing</Link></li>
            <li><Link to="/services#custom">Custom Automation</Link></li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>Company</h3>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/pricing">Pricing</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>Contact Info</h3>
          <ContactInfo>
            <FiMail />
            <span>contact@example.com</span>
          </ContactInfo>
          <ContactInfo>
            <FiPhone />
            <span>+1 (555) 123-4567</span>
          </ContactInfo>
          <ContactInfo>
            <FiMapPin />
            <span>123 Business Avenue, New York, NY 10001</span>
          </ContactInfo>
          
          <h4 style={{ marginTop: '24px', marginBottom: '12px' }}>Newsletter</h4>
          <p style={{ fontSize: '14px' }}>
            Get the latest automation tips and updates.
          </p>
          <NewsletterForm onSubmit={handleNewsletterSubmit}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              required 
            />
            <button type="submit">Subscribe</button>
          </NewsletterForm>
        </FooterSection>
      </FooterContent>

      <FooterBottom>
        <p>&copy; 2024 The Automate Pro. All rights reserved. | Built with ❤️ for entrepreneurs</p>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;
