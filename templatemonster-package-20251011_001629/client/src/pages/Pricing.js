import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiCheck, FiArrowRight, FiZap, FiAward, FiTrendingUp } from 'react-icons/fi';

const PricingContainer = styled.div`
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
  max-width: 1400px;
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
  margin-bottom: 4rem;

  h1 {
    font-size: 3.5rem;
    font-weight: 900;
    background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 1rem;

    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }

  p {
    font-size: 1.3rem;
    color: #6b7280;
    max-width: 600px;
    margin: 0 auto 2rem;
    line-height: 1.6;
  }

  .tagline {
    font-size: 1.1rem;
    color: #3b82f6;
    font-weight: 600;
    margin-bottom: 2rem;
  }
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;

  .toggle-label {
    font-weight: 600;
    color: #374151;
    font-size: 1.1rem;
  }

  .toggle {
    position: relative;
    width: 60px;
    height: 30px;
    background: #e5e7eb;
    border-radius: 15px;
    cursor: pointer;
    transition: all 0.3s ease;

    &.active {
      background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    }

    .slider {
      position: absolute;
      top: 3px;
      left: 3px;
      width: 24px;
      height: 24px;
      background: white;
      border-radius: 50%;
      transition: all 0.3s ease;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

      &.active {
        transform: translateX(30px);
      }
    }
  }
`;

const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const PricingCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  border: 2px solid ${props => props.featured ? '#3b82f6' : '#e5e7eb'};
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.featured 
      ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)'
      : 'transparent'};
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    border-color: ${props => props.featured ? '#2563eb' : '#3b82f6'};
  }

  .badge {
    position: absolute;
    top: -1px;
    right: 20px;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    color: white;
    padding: 0.5rem 1.5rem;
    border-radius: 0 0 12px 12px;
    font-weight: 700;
    font-size: 0.9rem;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }

  .plan-header {
    text-align: center;
    margin-bottom: 2rem;
    position: relative;
    z-index: 1;
  }

  .plan-icon {
    width: 60px;
    height: 60px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem;
    font-size: 1.5rem;
    color: white;
    background: ${props => props.featured 
      ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)'
      : 'linear-gradient(135deg, #6b7280, #9ca3af)'};
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }

  .plan-name {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 0.5rem;
  }

  .plan-description {
    color: #6b7280;
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }

  .price {
    display: flex;
    align-items: baseline;
    justify-content: center;
    margin-bottom: 1rem;

    .currency {
      font-size: 1.5rem;
      font-weight: 600;
      color: #374151;
    }

    .amount {
      font-size: 3rem;
      font-weight: 900;
      color: #1f2937;
      margin: 0 0.25rem;
    }

    .period {
      font-size: 1rem;
      color: #6b7280;
    }
  }

  .features {
    margin-bottom: 2rem;
    position: relative;
    z-index: 1;

    .feature {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 0;
      border-bottom: 1px solid #f3f4f6;

      &:last-child {
        border-bottom: none;
      }

      .icon {
        color: #10b981;
        font-size: 1.2rem;
      }

      .text {
        color: #374151;
        font-weight: 500;
      }
    }
  }

  .cta-button {
    width: 100%;
    padding: 1rem 2rem;
    border-radius: 12px;
    font-weight: 700;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    position: relative;
    z-index: 1;

    &.primary {
      background: linear-gradient(135deg, #3b82f6, #8b5cf6);
      color: white;
      border: none;
      box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 35px rgba(59, 130, 246, 0.4);
      }
    }

    &.secondary {
      background: white;
      color: #3b82f6;
      border: 2px solid #3b82f6;

      &:hover {
        background: #3b82f6;
        color: white;
        transform: translateY(-2px);
      }
    }
  }
`;

const TrustSection = styled.div`
  background: white;
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  margin-bottom: 4rem;
  text-align: center;

  h2 {
    font-size: 2rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 1rem;
  }

  p {
    color: #6b7280;
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }

  .logos {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    flex-wrap: wrap;

    .logo {
      font-size: 1.5rem;
      font-weight: 700;
      color: #6b7280;
      padding: 1rem 2rem;
      background: #f8fafc;
      border-radius: 12px;
      border: 1px solid #e5e7eb;
    }
  }
`;

const TestimonialSection = styled.div`
  background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
  border-radius: 20px;
  padding: 3rem;
  color: white;
  text-align: center;
  margin-bottom: 4rem;

  h2 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }

  .testimonial {
    max-width: 800px;
    margin: 0 auto;

    .quote {
      font-size: 1.3rem;
      font-style: italic;
      margin-bottom: 1.5rem;
      line-height: 1.6;
    }

    .author {
      font-weight: 600;
      font-size: 1.1rem;
    }

    .company {
      color: #9ca3af;
      font-size: 1rem;
    }
  }
`;

const Pricing = () => {
  const navigate = useNavigate();
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for small businesses getting started',
      icon: <FiZap />,
      monthlyPrice: 97,
      yearlyPrice: 970,
      features: [
        'LinkedIn Lead Generation (500/month)',
        'Email Finder (1000/month)',
        'Basic Email Campaigns',
        'Standard Support',
        'Basic Analytics',
        '1 User Account'
      ],
      featured: false
    },
    {
      name: 'Pro',
      description: 'Most popular for growing businesses',
      icon: <FiTrendingUp />,
      monthlyPrice: 297,
      yearlyPrice: 2970,
      features: [
        'LinkedIn Lead Generation (2000/month)',
        'Email Finder (5000/month)',
        'Advanced Email Campaigns',
        'CRM Integration',
        'API Access',
        'Priority Support',
        'Advanced Analytics',
        '5 User Accounts',
        'A/B Testing',
        'Custom Templates'
      ],
      featured: true
    },
    {
      name: 'Enterprise',
      description: 'For large organizations with complex needs',
      icon: <FiAward />,
      monthlyPrice: 997,
      yearlyPrice: 9970,
      features: [
        'Unlimited Lead Generation',
        'Unlimited Email Finder',
        'White-label Solution',
        'Custom Integrations',
        'Dedicated Account Manager',
        '24/7 Phone Support',
        'Custom Analytics Dashboard',
        'Unlimited User Accounts',
        'Advanced Security Features',
        'Custom Development'
      ],
      featured: false
    }
  ];

  const handleSelectPlan = (planName) => {
    // Store selected plan in localStorage
    localStorage.setItem('selectedPlan', JSON.stringify({
      name: planName,
      isYearly: isYearly,
      price: isYearly ? plans.find(p => p.name === planName)?.yearlyPrice : plans.find(p => p.name === planName)?.monthlyPrice
    }));
    navigate('/checkout');
  };

  return (
    <PricingContainer>
      <Container>
        <Header>
          <h1>Choose Your Plan</h1>
          <p>Scale your automation business with our powerful tools and features</p>
          <div className="tagline">Automate. Scale. Grow.</div>
        </Header>

        <ToggleContainer>
          <span className="toggle-label">Monthly</span>
          <div 
            className={`toggle ${isYearly ? 'active' : ''}`}
            onClick={() => setIsYearly(!isYearly)}
          >
            <div className={`slider ${isYearly ? 'active' : ''}`}></div>
          </div>
          <span className="toggle-label">Yearly <span style={{color: '#10b981', fontWeight: '700'}}>(Save 20%)</span></span>
        </ToggleContainer>

        <PricingGrid>
          {plans.map((plan, index) => (
            <PricingCard
              key={plan.name}
              featured={plan.featured}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              {plan.featured && <div className="badge">Most Popular</div>}
              
              <div className="plan-header">
                <div className="plan-icon">{plan.icon}</div>
                <h3 className="plan-name">{plan.name}</h3>
                <p className="plan-description">{plan.description}</p>
                
                <div className="price">
                  <span className="currency">$</span>
                  <span className="amount">
                    {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <span className="period">/{isYearly ? 'year' : 'month'}</span>
                </div>
              </div>

              <div className="features">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="feature">
                    <FiCheck className="icon" />
                    <span className="text">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                className={`cta-button ${plan.featured ? 'primary' : 'secondary'}`}
                onClick={() => handleSelectPlan(plan.name)}
              >
                Get Started
                <FiArrowRight />
              </button>
            </PricingCard>
          ))}
        </PricingGrid>

        <TrustSection>
          <h2>Trusted by 10,000+ Businesses</h2>
          <p>Join companies that are already scaling with Automation Solutions</p>
          <div className="logos">
            <div className="logo">TechCorp</div>
            <div className="logo">StartupXYZ</div>
            <div className="logo">GrowthCo</div>
            <div className="logo">ScaleUp</div>
            <div className="logo">Automation Solutions</div>
          </div>
        </TrustSection>

        <TestimonialSection>
          <h2>Success Stories</h2>
          <div className="testimonial">
            <div className="quote">
              "Automation Solutions helped us generate $25k in revenue in just 3 months. 
              The LinkedIn lead generation tool is absolutely game-changing!"
            </div>
            <div className="author">Sarah Johnson</div>
            <div className="company">CEO, Growth Marketing Agency</div>
          </div>
        </TestimonialSection>
      </Container>
    </PricingContainer>
  );
};

export default Pricing;