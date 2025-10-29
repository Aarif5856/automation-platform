import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const TermsContainer = styled.div`
  padding: 120px 0 80px;
  background: #f8fafc;
  min-height: 100vh;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 60px;

  h1 {
    font-size: 2.5rem;
    font-weight: 800;
    color: #1f2937;
    margin-bottom: 16px;
  }

  p {
    color: #64748b;
    font-size: 1.1rem;
  }
`;

const Content = styled.div`
  background: white;
  border-radius: 20px;
  padding: 60px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
  line-height: 1.8;

  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1f2937;
    margin: 40px 0 20px 0;

    &:first-child {
      margin-top: 0;
    }
  }

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #374151;
    margin: 30px 0 15px 0;
  }

  p {
    color: #4b5563;
    margin-bottom: 20px;
  }

  ul, ol {
    margin: 20px 0;
    padding-left: 30px;

    li {
      color: #4b5563;
      margin-bottom: 10px;
    }
  }

  .highlight {
    background: #f0f9ff;
    border-left: 4px solid #3b82f6;
    padding: 20px;
    margin: 30px 0;
    border-radius: 8px;

    p {
      margin: 0;
      font-weight: 600;
      color: #1e40af;
    }
  }

  .contact-info {
    background: #f8fafc;
    padding: 30px;
    border-radius: 12px;
    margin: 40px 0;
    border: 1px solid #e2e8f0;

    h3 {
      margin-top: 0;
      color: #1f2937;
    }

    p {
      margin: 10px 0;
      color: #4b5563;
    }
  }
`;

const TermsOfService = () => {
  return (
    <TermsContainer>
      <Container>
        <Header>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Terms of Service
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Last updated: December 2024
          </motion.p>
        </Header>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Content>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using Automation Solutions ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>

            <h2>2. Description of Service</h2>
            <p>
              Automation Solutions provides automation services including but not limited to:
            </p>
            <ul>
              <li>Lead generation and management</li>
              <li>Web scraping and data extraction</li>
              <li>Social media automation</li>
              <li>Email marketing automation</li>
              <li>Custom automation solutions</li>
            </ul>

            <h2>3. User Accounts</h2>
            <p>
              To access certain features of the Service, you must register for an account. You agree to:
            </p>
            <ul>
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and update your account information</li>
              <li>Maintain the security of your password and account</li>
              <li>Accept responsibility for all activities under your account</li>
            </ul>

            <h2>4. Payment Terms</h2>
            <p>
              Our services are offered on a subscription basis with the following pricing tiers:
            </p>
            <ul>
              <li>Starter Plan: $97/month</li>
              <li>Pro Plan: $197/month</li>
              <li>Enterprise Plan: $497/month</li>
            </ul>
            <p>
              All payments are processed securely through our payment partners. Subscriptions automatically renew unless cancelled before the next billing cycle.
            </p>

            <div className="highlight">
              <p>
                <strong>Refund Policy:</strong> We offer a 30-day money-back guarantee for all new subscriptions. Refunds will be processed within 5-7 business days.
              </p>
            </div>

            <h2>5. Acceptable Use</h2>
            <p>You agree not to use the Service to:</p>
            <ul>
              <li>Violate any laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Transmit harmful or malicious code</li>
              <li>Spam or send unsolicited communications</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Use the service for illegal or unauthorized purposes</li>
            </ul>

            <h2>6. Data and Privacy</h2>
            <p>
              We collect and process data in accordance with our Privacy Policy. By using our Service, you consent to the collection and use of information as outlined in our Privacy Policy.
            </p>

            <h2>7. Intellectual Property</h2>
            <p>
              The Service and its original content, features, and functionality are owned by Automation Solutions and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>

            <h2>8. Service Availability</h2>
            <p>
              We strive to maintain 99.9% uptime but do not guarantee uninterrupted service. We reserve the right to modify or discontinue the Service with reasonable notice.
            </p>

            <h2>9. Limitation of Liability</h2>
            <p>
              In no event shall Automation Solutions be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
            </p>

            <h2>10. Termination</h2>
            <p>
              We may terminate or suspend your account immediately, without prior notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties.
            </p>

            <h2>11. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through the Service. Continued use constitutes acceptance of the new terms.
            </p>

            <h2>12. Governing Law</h2>
            <p>
              These Terms shall be interpreted and governed by the laws of the United States, without regard to its conflict of law provisions.
            </p>

            <div className="contact-info">
              <h3>Contact Information</h3>
              <p><strong>Email:</strong> legal@autobiz.com</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              <p><strong>Address:</strong> 123 Business St, City, State 12345</p>
              <p>
                If you have any questions about these Terms of Service, please contact us using the information above.
              </p>
            </div>
          </Content>
        </motion.div>
      </Container>
    </TermsContainer>
  );
};

export default TermsOfService;
