import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FiSearch, 
  FiUsers, 
  FiMail, 
  FiTrendingUp, 
  FiZap, 
  FiShield,
  FiCheck,
  FiArrowRight,
  FiStar
} from 'react-icons/fi';

const ServicesContainer = styled.div`
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
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  font-weight: 800;
  color: #1f2937;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.25rem;
  color: #64748b;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const FilterTabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 60px;
  flex-wrap: wrap;
`;

const FilterTab = styled.button`
  padding: 12px 24px;
  border: 2px solid ${props => props.active ? '#3b82f6' : '#e2e8f0'};
  background: ${props => props.active ? '#3b82f6' : 'white'};
  color: ${props => props.active ? 'white' : '#64748b'};
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    border-color: #3b82f6;
    color: #3b82f6;
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;
  margin-bottom: 80px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
    margin-bottom: 60px;
  }
`;

const ServiceCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 
      0 20px 40px rgba(0, 0, 0, 0.15),
      0 0 20px rgba(59, 130, 246, 0.2);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #3b82f6, #8b5cf6);
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

  @media (max-width: 768px) {
    padding: 24px;
    border-radius: 16px;
  }
`;

const ServiceIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 32px;
  margin-bottom: 24px;
`;

const ServiceTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 16px;
`;

const ServiceDescription = styled.p`
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 24px;
`;

const ServiceFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 32px;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  color: #374151;
  font-weight: 500;

  .icon {
    color: #10b981;
    font-size: 18px;
  }
`;

const ServicePrice = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  padding: 20px;
  background: #f8fafc;
  border-radius: 12px;
`;

const Price = styled.div`
  .amount {
    font-size: 2rem;
    font-weight: 800;
    color: #3b82f6;
  }

  .period {
    color: #64748b;
    font-size: 0.9rem;
  }
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  .stars {
    display: flex;
    gap: 2px;
  }

  .star {
    color: #fbbf24;
    font-size: 16px;
  }

  .rating-text {
    color: #64748b;
    font-size: 0.9rem;
  }
`;

const ServiceButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
  border: none;
  padding: 16px 24px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
  }
`;

const CaseStudiesSection = styled.div`
  background: white;
  border-radius: 20px;
  padding: 80px 60px;
  margin: 80px 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;

  @media (max-width: 768px) {
    padding: 40px 30px;
  }

  h2 {
    font-size: 2.5rem;
    font-weight: 800;
    color: #1f2937;
    text-align: center;
    margin-bottom: 16px;
  }

  p {
    font-size: 1.1rem;
    color: #64748b;
    text-align: center;
    margin-bottom: 60px;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const CaseStudiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;
`;

const CaseStudyCard = styled(motion.div)`
  background: #f8fafc;
  border-radius: 16px;
  padding: 32px;
  border: 1px solid #e2e8f0;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }

  .industry {
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    color: white;
    padding: 6px 16px;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 600;
    display: inline-block;
    margin-bottom: 16px;
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 16px;
  }

  p {
    color: #64748b;
    line-height: 1.6;
    margin-bottom: 24px;
    text-align: left;
  }

  .results {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;

    .result-item {
      text-align: center;
      padding: 16px;
      background: white;
      border-radius: 12px;
      border: 1px solid #e2e8f0;

      .metric {
        font-size: 1.5rem;
        font-weight: 800;
        color: #10b981;
        margin-bottom: 4px;
      }

      .label {
        font-size: 0.9rem;
        color: #64748b;
        font-weight: 500;
      }
    }
  }
`;

const CTA = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 80px 40px;
  border-radius: 20px;
  text-align: center;
  margin-top: 80px;
`;

const CTATitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 16px;
`;

const CTASubtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 40px;
  opacity: 0.9;
`;

const CTAButton = styled.button`
  background: white;
  color: #3b82f6;
  border: none;
  padding: 16px 32px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  }
`;

const Services = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const navigate = useNavigate();

  const handleGetStarted = (service) => {
    // Store selected service in localStorage for checkout
    localStorage.setItem('selectedService', JSON.stringify(service));
    // Navigate to checkout page
    navigate('/checkout');
  };

  const handleViewPricing = () => {
    navigate('/pricing');
  };

  const services = [
    {
      id: 1,
      category: 'lead-generation',
      title: 'LinkedIn Lead Generation',
      description: 'Automatically find and extract high-quality leads from LinkedIn with our advanced scraping technology.',
      icon: <FiUsers />,
      price: 197,
      period: 'one-time',
      rating: 4.9,
      reviews: 1247,
      features: [
        'Extract 1000+ leads per hour',
        'Advanced filtering options',
        'Export to CSV/Excel',
        'Email verification included',
        '24/7 support',
        'Money-back guarantee'
      ]
    },
    {
      id: 2,
      category: 'web-scraping',
      title: 'Website Data Scraping',
      description: 'Extract any data from websites automatically. Perfect for competitor analysis and market research.',
      icon: <FiSearch />,
      price: 297,
      period: 'one-time',
      rating: 4.8,
      reviews: 892,
      features: [
        'Scrape any website',
        'Handle JavaScript sites',
        'Proxy rotation included',
        'Data cleaning & formatting',
        'Scheduled scraping',
        'API access included'
      ]
    },
    {
      id: 3,
      category: 'email-marketing',
      title: 'Email Marketing Automation',
      description: 'Build and manage email campaigns that convert. From cold outreach to nurturing sequences.',
      icon: <FiMail />,
      price: 397,
      period: 'one-time',
      rating: 4.9,
      reviews: 1563,
      features: [
        'Drag & drop email builder',
        'Advanced segmentation',
        'A/B testing tools',
        'Analytics dashboard',
        'Deliverability optimization',
        'Unlimited sends'
      ]
    },
    {
      id: 4,
      category: 'social-media',
      title: 'Social Media Automation',
      description: 'Automate your social media presence across all platforms. Post, engage, and grow your audience.',
      icon: <FiTrendingUp />,
      price: 497,
      period: 'one-time',
      rating: 4.7,
      reviews: 743,
      features: [
        'Multi-platform posting',
        'Content scheduling',
        'Auto-engagement',
        'Hashtag research',
        'Analytics tracking',
        'Team collaboration'
      ]
    },
    {
      id: 5,
      category: 'custom',
      title: 'Custom Automation',
      description: 'Need something specific? We build custom automation solutions tailored to your exact needs.',
      icon: <FiZap />,
      price: 997,
      period: 'one-time',
      rating: 5.0,
      reviews: 234,
      features: [
        '100% custom solution',
        'Unlimited revisions',
        'Source code included',
        'Training & documentation',
        '6 months support',
        'Commercial license'
      ]
    },
    {
      id: 6,
      category: 'lead-generation',
      title: 'Email Finder & Verifier',
      description: 'Find and verify email addresses for any domain. Perfect for building targeted contact lists.',
      icon: <FiShield />,
      price: 147,
      period: 'one-time',
      rating: 4.8,
      reviews: 1089,
      features: [
        'Find emails by domain',
        'Verify email validity',
        'Bulk processing',
        'API integration',
        'High accuracy rate',
        'Real-time verification'
      ]
    }
  ];

  const categories = [
    { id: 'all', name: 'All Services' },
    { id: 'lead-generation', name: 'Lead Generation' },
    { id: 'web-scraping', name: 'Web Scraping' },
    { id: 'email-marketing', name: 'Email Marketing' },
    { id: 'social-media', name: 'Social Media' },
    { id: 'custom', name: 'Custom' }
  ];

  const caseStudies = [
    {
      industry: 'E-commerce',
      title: 'Online Store Lead Generation',
      description: 'A fashion e-commerce store used our LinkedIn automation to generate 5,000+ qualified leads and increase sales by 300% in just 3 months.',
      results: {
        leads: '5,000+',
        revenue: '+300%',
        time: '20hrs/week'
      }
    },
    {
      industry: 'Real Estate',
      title: 'Property Investment Leads',
      description: 'A real estate agency automated their lead generation process and now captures 200+ qualified property investors monthly with minimal effort.',
      results: {
        leads: '200+/month',
        revenue: '+250%',
        time: '15hrs/week'
      }
    },
    {
      industry: 'SaaS',
      title: 'B2B Software Sales',
      description: 'A SaaS company used our email automation to nurture leads and increased their conversion rate from 2% to 8% while saving 25 hours per week.',
      results: {
        leads: '1,200+',
        revenue: '+400%',
        time: '25hrs/week'
      }
    }
  ];

  const filteredServices = activeFilter === 'all' 
    ? services 
    : services.filter(service => service.category === activeFilter);

  return (
    <ServicesContainer>
      <Container>
        <Header>
          <Title
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Automation Services
          </Title>
          
          <Subtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Choose from our proven automation tools and start making money today. 
            Each service comes with complete setup and training.
          </Subtitle>
        </Header>

        <FilterTabs>
          {categories.map(category => (
            <FilterTab
              key={category.id}
              active={activeFilter === category.id}
              onClick={() => setActiveFilter(category.id)}
            >
              {category.name}
            </FilterTab>
          ))}
        </FilterTabs>

        <ServicesGrid>
          {filteredServices.map((service, index) => (
            <ServiceCard
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <ServiceIcon>{service.icon}</ServiceIcon>
              
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDescription>{service.description}</ServiceDescription>
              
              <ServiceFeatures>
                {service.features.map((feature, idx) => (
                  <FeatureItem key={idx}>
                    <FiCheck className="icon" />
                    {feature}
                  </FeatureItem>
                ))}
              </ServiceFeatures>

              <ServicePrice>
                <Price>
                  <div className="amount">${service.price}</div>
                  <div className="period">/{service.period}</div>
                </Price>
                <Rating>
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <FiStar 
                        key={i} 
                        className="star" 
                        style={{ 
                          color: i < Math.floor(service.rating) ? '#fbbf24' : '#e5e7eb' 
                        }} 
                      />
                    ))}
                  </div>
                  <div className="rating-text">
                    {service.rating} ({service.reviews} reviews)
                  </div>
                </Rating>
              </ServicePrice>

              <ServiceButton onClick={() => handleGetStarted(service)}>
                Get Started Now
                <FiArrowRight />
              </ServiceButton>
            </ServiceCard>
          ))}
        </ServicesGrid>

        <CaseStudiesSection>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Real Results from Real Customers
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            See how our automation tools have transformed businesses across different industries.
          </motion.p>
          <CaseStudiesGrid>
            {caseStudies.map((study, index) => (
              <CaseStudyCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="industry">{study.industry}</div>
                <h3>{study.title}</h3>
                <p>{study.description}</p>
                <div className="results">
                  <div className="result-item">
                    <div className="metric">{study.results.leads}</div>
                    <div className="label">Leads Generated</div>
                  </div>
                  <div className="result-item">
                    <div className="metric">{study.results.revenue}</div>
                    <div className="label">Revenue Increase</div>
                  </div>
                  <div className="result-item">
                    <div className="metric">{study.results.time}</div>
                    <div className="label">Time Saved</div>
                  </div>
                </div>
              </CaseStudyCard>
            ))}
          </CaseStudiesGrid>
        </CaseStudiesSection>

        <CTA>
          <CTATitle>Ready to Start Making Money?</CTATitle>
          <CTASubtitle>
            Join thousands of entrepreneurs who are already using our automation tools 
            to build profitable businesses.
          </CTASubtitle>
          <CTAButton onClick={handleViewPricing}>
            View All Pricing
            <FiArrowRight />
          </CTAButton>
        </CTA>
      </Container>
    </ServicesContainer>
  );
};

export default Services;
