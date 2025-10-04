import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiDownload, FiMail, FiArrowRight, FiZap } from 'react-icons/fi';

const SuccessContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
`;

const SuccessCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 80px 60px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 600px;
  width: 100%;

  @media (max-width: 768px) {
    padding: 40px 30px;
  }
`;

const SuccessIcon = styled.div`
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #10b981, #059669);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 48px;
  margin: 0 auto 32px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: #1f2937;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: #64748b;
  margin-bottom: 40px;
  line-height: 1.6;
`;

const NextSteps = styled.div`
  background: #f8fafc;
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 40px;
  text-align: left;

  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 24px;
    text-align: center;
  }
`;

const StepItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
  padding: 16px;
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;

  .step-number {
    width: 32px;
    height: 32px;
    background: #3b82f6;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 14px;
    flex-shrink: 0;
  }

  .content {
    flex: 1;

    h4 {
      font-size: 1.1rem;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 4px;
    }

    p {
      color: #64748b;
      font-size: 0.9rem;
      margin: 0;
    }
  }

  .icon {
    color: #3b82f6;
    font-size: 20px;
    flex-shrink: 0;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 32px;
`;

const Button = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 16px 32px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  transition: all 0.3s;

  &.primary {
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    color: white;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
    }
  }

  &.secondary {
    background: transparent;
    color: #3b82f6;
    border: 2px solid #3b82f6;

    &:hover {
      background: #3b82f6;
      color: white;
    }
  }
`;

const ContactInfo = styled.div`
  background: #f0f9ff;
  border-radius: 12px;
  padding: 24px;
  margin-top: 32px;

  h4 {
    font-size: 1.1rem;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 12px;
  }

  p {
    color: #64748b;
    margin-bottom: 16px;
    font-size: 0.9rem;
  }

  .contact-methods {
    display: flex;
    gap: 16px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #3b82f6;
    font-weight: 500;
    font-size: 0.9rem;
  }
`;

const Success = () => {
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Get payment data
    const storedPaymentData = localStorage.getItem('paymentData');
    if (storedPaymentData) {
      setPaymentData(JSON.parse(storedPaymentData));
    }
  }, []);

  const steps = [
    {
      number: 1,
      title: 'Check Your Email',
      description: 'We\'ve sent you a confirmation email with your order details and next steps.',
      icon: <FiMail />
    },
    {
      number: 2,
      title: 'Access Your Dashboard',
      description: 'Log in to your dashboard to start using your automation tools immediately.',
      icon: <FiZap />
    },
    {
      number: 3,
      title: 'Download Your Tools',
      description: 'Download the automation scripts and templates included with your purchase.',
      icon: <FiDownload />
    },
    {
      number: 4,
      title: 'Schedule Your Setup Call',
      description: 'Book a free setup call with our automation experts to get you started.',
      icon: <FiCheckCircle />
    }
  ];

  return (
    <SuccessContainer>
      <SuccessCard
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <SuccessIcon>
          <FiCheckCircle />
        </SuccessIcon>

        <Title>Payment Successful! 🎉</Title>
        <Subtitle>
          Congratulations! Your order has been processed and you're now ready to start 
          building your automated business empire.
        </Subtitle>

        {paymentData && (
          <div style={{
            background: '#f0f9ff',
            border: '1px solid #0ea5e9',
            borderRadius: '12px',
            padding: '20px',
            margin: '24px 0',
            textAlign: 'left'
          }}>
            <h4 style={{ 
              color: '#0c4a6e', 
              margin: '0 0 12px 0', 
              fontSize: '1.1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              {paymentData.method === 'crypto' ? <FiZap /> : <FiCheckCircle />}
              Payment Confirmation
            </h4>
            <div style={{ color: '#0c4a6e', fontSize: '0.9rem' }}>
              <p><strong>Method:</strong> {paymentData.method === 'crypto' ? 'Crypto (USDT)' : paymentData.method === 'paypal' ? 'PayPal' : 'Credit Card'}</p>
              <p><strong>Amount:</strong> ${paymentData.amount} {paymentData.currency ? `(${paymentData.currency})` : ''}</p>
              <p><strong>Payment ID:</strong> {paymentData.paymentId}</p>
              {paymentData.txHash && <p><strong>Transaction Hash:</strong> {paymentData.txHash}</p>}
              <p><strong>Status:</strong> {paymentData.status}</p>
            </div>
          </div>
        )}

        <NextSteps>
          <h3>What's Next?</h3>
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <StepItem>
                <div className="step-number">{step.number}</div>
                <div className="content">
                  <h4>{step.title}</h4>
                  <p>{step.description}</p>
                </div>
                <div className="icon">{step.icon}</div>
              </StepItem>
            </motion.div>
          ))}
        </NextSteps>

        <ActionButtons>
          <Button to="/dashboard" className="primary">
            <FiZap />
            Go to Dashboard
          </Button>
          <Button to="/services" className="secondary">
            <FiArrowRight />
            Browse More Tools
          </Button>
        </ActionButtons>

        <ContactInfo>
          <h4>Need Help Getting Started?</h4>
          <p>
            Our automation experts are standing by to help you set up your tools 
            and start generating leads immediately.
          </p>
          <div className="contact-methods">
            <div className="contact-item">
              <FiMail />
              hello@the-automatepro.info
            </div>
            <div className="contact-item">
              <FiCheckCircle />
              Live Chat Available
            </div>
          </div>
        </ContactInfo>
      </SuccessCard>
    </SuccessContainer>
  );
};

export default Success;
