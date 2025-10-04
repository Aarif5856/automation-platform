import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheckCircle } from 'react-icons/fi';

const ContactContainer = styled.div`
  padding: 120px 0 80px;
  background: #f8fafc;
  min-height: 100vh;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, 
      rgba(59, 130, 246, 0.05) 0%, 
      rgba(139, 92, 246, 0.05) 25%, 
      rgba(236, 72, 153, 0.05) 50%, 
      rgba(59, 130, 246, 0.05) 75%, 
      rgba(139, 92, 246, 0.05) 100%);
    animation: glow-rotate 20s linear infinite;
    pointer-events: none;
    z-index: 0;
  }

  @media (max-width: 768px) {
    padding: 80px 0 60px;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 80px;

  h1 {
    font-size: 3rem;
    font-weight: 800;
    color: #1f2937;
    margin-bottom: 24px;

    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }

  p {
    font-size: 1.25rem;
    color: #64748b;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  margin-bottom: 80px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
    margin-bottom: 60px;
  }
`;

const ContactInfo = styled.div`
  h2 {
    font-size: 2rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 32px;
  }

  p {
    color: #64748b;
    line-height: 1.6;
    margin-bottom: 40px;
    font-size: 1.1rem;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 12px 40px rgba(0, 0, 0, 0.15),
      0 0 20px rgba(59, 130, 246, 0.1);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, 
      rgba(59, 130, 246, 0.05) 0%, 
      rgba(139, 92, 246, 0.05) 100%);
    border-radius: inherit;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  &:hover::after {
    opacity: 1;
  }

  .icon {
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 20px;
    position: relative;
    z-index: 1;
  }

  .content {
    position: relative;
    z-index: 1;

    h3 {
      font-size: 1.1rem;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 4px;
    }

    p {
      color: #64748b;
      margin: 0;
      font-size: 1rem;
    }
  }

  @media (max-width: 768px) {
    padding: 16px;
    gap: 12px;

    .icon {
      width: 40px;
      height: 40px;
      font-size: 18px;
    }
  }
`;

const Form = styled.form`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 40px;
  border-radius: 20px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, 
      rgba(59, 130, 246, 0.05) 0%, 
      rgba(139, 92, 246, 0.05) 100%);
    border-radius: inherit;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  &:hover::after {
    opacity: 1;
  }

  h2 {
    font-size: 2rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 32px;
    position: relative;
    z-index: 1;
  }

  @media (max-width: 768px) {
    padding: 24px;
    border-radius: 16px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 24px;
  position: relative;
  z-index: 1;

  label {
    display: block;
    font-weight: 600;
    color: #374151;
    margin-bottom: 8px;
  }

  input,
  textarea,
  select {
    width: 100%;
    padding: 16px;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    font-size: 16px;
    transition: all 0.3s;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(5px);

    &:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    &::placeholder {
      color: #9ca3af;
    }
  }

  textarea {
    resize: vertical;
    min-height: 120px;
  }

  @media (max-width: 768px) {
    input,
    textarea,
    select {
      font-size: 16px; /* Prevents zoom on iOS */
    }
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s;
  position: relative;
  z-index: 1;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(255, 255, 255, 0.2), 
      transparent);
    transition: left 0.5s ease;
  }

  &:hover::before {
    left: 100%;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 8px 25px rgba(59, 130, 246, 0.4),
      0 0 20px rgba(139, 92, 246, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 14px 24px;
    font-size: 16px;
  }
`;

const SuccessMessage = styled.div`
  background: #dcfce7;
  color: #166534;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
`;

const FAQ = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 80px 60px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, 
      rgba(59, 130, 246, 0.05) 0%, 
      rgba(139, 92, 246, 0.05) 100%);
    border-radius: inherit;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  &:hover::after {
    opacity: 1;
  }

  @media (max-width: 768px) {
    padding: 40px 30px;
  }

  h2 {
    font-size: 2.5rem;
    font-weight: 800;
    color: #1f2937;
    text-align: center;
    margin-bottom: 60px;
    position: relative;
    z-index: 1;
  }
`;

const FAQGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 40px;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const FAQItem = styled.div`
  position: relative;
  z-index: 1;

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 16px;
  }

  p {
    color: #64748b;
    line-height: 1.6;
  }
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
    inquiry: 'general'
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        subject: '',
        message: '',
        inquiry: 'general'
      });
    }, 2000);
  };

  const faqs = [
    {
      question: 'How quickly can you set up my automation?',
      answer: 'Most automations are set up within 24-48 hours. Complex custom solutions may take 1-2 weeks depending on requirements.'
    },
    {
      question: 'Do you provide training and support?',
      answer: 'Yes! We provide comprehensive training, documentation, and 24/7 support to ensure you get the most out of your automation tools.'
    },
    {
      question: 'Can I customize the automation to my specific needs?',
      answer: 'Absolutely! All our automations are fully customizable. We can modify existing templates or build completely custom solutions for your business.'
    },
    {
      question: 'What if I need help after setup?',
      answer: 'We offer ongoing support and maintenance. You can reach us anytime via email, phone, or our support portal for assistance.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'Yes, we offer a 30-day money-back guarantee. If you\'re not satisfied with our service, we\'ll provide a full refund.'
    },
    {
      question: 'Can I integrate with my existing tools?',
      answer: 'Yes! Our automations integrate with over 100+ popular business tools including CRM systems, email platforms, and marketing tools.'
    }
  ];

  return (
    <ContactContainer>
      <Container>
        <Header>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Ready to transform your business with automation? We're here to help you 
            get started and answer any questions you might have.
          </motion.p>
        </Header>

        <ContactGrid>
          <ContactInfo>
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              Let's Talk
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Whether you're just getting started or looking to scale your existing 
              automation, our team is ready to help you succeed.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <ContactItem>
                <div className="icon">
                  <FiMail />
                </div>
                <div className="content">
                  <h3>Email Us</h3>
                  <p>hello@the-automatepro.info</p>
                  <p style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '4px' }}>
                    Support: support@the-automatepro.info
                  </p>
                </div>
              </ContactItem>

              <ContactItem>
                <div className="icon">
                  <FiPhone />
                </div>
                <div className="content">
                  <h3>Call Us</h3>
                  <p>+974 33288952</p>
                </div>
              </ContactItem>

              <ContactItem>
                <div className="icon">
                  <FiMapPin />
                </div>
                <div className="content">
                  <h3>Visit Us</h3>
                  <p>820 street 33 zone 29 building, Al Markhiya, Doha, Qatar</p>
                </div>
              </ContactItem>
            </motion.div>
          </ContactInfo>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Form onSubmit={handleSubmit}>
              <h2>Send us a Message</h2>

              {success && (
                <SuccessMessage>
                  <FiCheckCircle />
                  Thank you! Your message has been sent successfully.
                </SuccessMessage>
              )}

              <FormGroup>
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                />
              </FormGroup>

              <FormGroup>
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                />
              </FormGroup>

              <FormGroup>
                <label htmlFor="company">Company</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your company name"
                />
              </FormGroup>

              <FormGroup>
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                />
              </FormGroup>

              <FormGroup>
                <label htmlFor="inquiry">Type of Inquiry</label>
                <select
                  id="inquiry"
                  name="inquiry"
                  value={formData.inquiry}
                  onChange={handleChange}
                >
                  <option value="general">General Question</option>
                  <option value="sales">Sales Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="partnership">Partnership</option>
                  <option value="custom">Custom Automation</option>
                </select>
              </FormGroup>

              <FormGroup>
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Brief description of your inquiry"
                  required
                />
              </FormGroup>

              <FormGroup>
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your automation needs..."
                  required
                />
              </FormGroup>

              <Button type="submit" disabled={loading}>
                <FiSend />
                {loading ? 'Sending...' : 'Send Message'}
              </Button>
            </Form>
          </motion.div>
        </ContactGrid>

        <FAQ>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Frequently Asked Questions
          </motion.h2>
          <FAQGrid>
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <FAQItem>
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </FAQItem>
              </motion.div>
            ))}
          </FAQGrid>
        </FAQ>
      </Container>
    </ContactContainer>
  );
};

export default Contact;
