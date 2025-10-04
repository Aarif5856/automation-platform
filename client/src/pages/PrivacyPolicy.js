import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PrivacyContainer = styled.div`
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

  .data-table {
    background: #f8fafc;
    border-radius: 12px;
    padding: 30px;
    margin: 30px 0;
    border: 1px solid #e2e8f0;
    overflow-x: auto;

    table {
      width: 100%;
      border-collapse: collapse;

      th, td {
        padding: 12px;
        text-align: left;
        border-bottom: 1px solid #e2e8f0;
      }

      th {
        background: #f1f5f9;
        font-weight: 600;
        color: #374151;
      }

      td {
        color: #4b5563;
      }
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

const PrivacyPolicy = () => {
  return (
    <PrivacyContainer>
      <Container>
        <Header>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Privacy Policy
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
            <h2>1. Introduction</h2>
            <p>
              AutomatePro ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our automation services.
            </p>

            <h2>2. Information We Collect</h2>
            
            <h3>2.1 Personal Information</h3>
            <p>We collect information you provide directly to us, such as:</p>
            <ul>
              <li>Name and contact information (email, phone, address)</li>
              <li>Account credentials and profile information</li>
              <li>Payment and billing information</li>
              <li>Communication preferences</li>
              <li>Support requests and communications</li>
            </ul>

            <h3>2.2 Usage Information</h3>
            <p>We automatically collect certain information when you use our Service:</p>
            <ul>
              <li>Device information (IP address, browser type, operating system)</li>
              <li>Usage patterns and preferences</li>
              <li>Log files and analytics data</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>

            <h3>2.3 Business Data</h3>
            <p>When using our automation services, we may process:</p>
            <ul>
              <li>Lead generation data and contact lists</li>
              <li>Social media profiles and engagement data</li>
              <li>Email campaign data and analytics</li>
              <li>Website scraping results and extracted data</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send technical notices, updates, and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Monitor and analyze usage and trends</li>
              <li>Detect, investigate, and prevent security incidents</li>
              <li>Comply with legal obligations</li>
            </ul>

            <div className="data-table">
              <h3>Data Processing Purposes</h3>
              <table>
                <thead>
                  <tr>
                    <th>Data Type</th>
                    <th>Purpose</th>
                    <th>Legal Basis</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Account Information</td>
                    <td>Service delivery, authentication</td>
                    <td>Contract performance</td>
                  </tr>
                  <tr>
                    <td>Payment Data</td>
                    <td>Transaction processing</td>
                    <td>Contract performance</td>
                  </tr>
                  <tr>
                    <td>Usage Analytics</td>
                    <td>Service improvement</td>
                    <td>Legitimate interest</td>
                  </tr>
                  <tr>
                    <td>Communication Data</td>
                    <td>Customer support</td>
                    <td>Contract performance</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>4. Information Sharing and Disclosure</h2>
            <p>We may share your information in the following circumstances:</p>
            <ul>
              <li><strong>Service Providers:</strong> With trusted third parties who assist in operating our service</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              <li><strong>Business Transfers:</strong> In connection with mergers, acquisitions, or asset sales</li>
              <li><strong>Consent:</strong> When you explicitly consent to sharing</li>
            </ul>

            <div className="highlight">
              <p>
                <strong>We do not sell, trade, or rent your personal information to third parties for marketing purposes.</strong>
              </p>
            </div>

            <h2>5. Data Security</h2>
            <p>We implement appropriate security measures to protect your information:</p>
            <ul>
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security assessments and updates</li>
              <li>Access controls and authentication</li>
              <li>Secure data centers and infrastructure</li>
              <li>Employee training on data protection</li>
            </ul>

            <h2>6. Data Retention</h2>
            <p>
              We retain your information for as long as necessary to provide our services and fulfill the purposes outlined in this policy. We will delete or anonymize your information when it's no longer needed, unless we're required to retain it for legal or regulatory purposes.
            </p>

            <h2>7. Your Rights and Choices</h2>
            <p>Depending on your location, you may have the following rights:</p>
            <ul>
              <li><strong>Access:</strong> Request a copy of your personal information</li>
              <li><strong>Correction:</strong> Update or correct inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information</li>
              <li><strong>Portability:</strong> Receive your data in a structured format</li>
              <li><strong>Objection:</strong> Object to certain processing activities</li>
              <li><strong>Withdrawal:</strong> Withdraw consent where applicable</li>
            </ul>

            <h2>8. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar technologies to enhance your experience, analyze usage, and provide personalized content. You can control cookie settings through your browser preferences.
            </p>

            <h2>9. International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information in accordance with this Privacy Policy.
            </p>

            <h2>10. Children's Privacy</h2>
            <p>
              Our Service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will take steps to delete it.
            </p>

            <h2>11. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>

            <h2>12. Contact Us</h2>
            <div className="contact-info">
              <h3>Data Protection Officer</h3>
              <p><strong>Email:</strong> privacy@autobiz.com</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              <p><strong>Address:</strong> 123 Business St, City, State 12345</p>
              <p>
                If you have any questions about this Privacy Policy or our data practices, please contact us using the information above.
              </p>
            </div>

            <div className="highlight">
              <p>
                <strong>GDPR Compliance:</strong> This Privacy Policy complies with the General Data Protection Regulation (GDPR) and other applicable privacy laws.
              </p>
            </div>
          </Content>
        </motion.div>
      </Container>
    </PrivacyContainer>
  );
};

export default PrivacyPolicy;
