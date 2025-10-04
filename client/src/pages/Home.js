import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FiArrowRight, 
  FiCheck, 
  FiUsers, 
  FiTrendingUp, 
  FiZap, 
  FiShield,
  FiStar,
  FiPlay
} from 'react-icons/fi';
import VideoModal from '../components/VideoModal';

const HeroSection = styled.section`
  background: linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%);
  color: white;
  padding: 140px 0 100px;
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  align-items: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 60%, rgba(16, 185, 129, 0.05) 0%, transparent 50%);
    opacity: 0.8;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse"><path d="M 50 0 L 0 0 0 50" fill="none" stroke="%23ffffff" stroke-width="0.5" opacity="0.1"/></pattern></defs><rect width="100%" height="100%" fill="url(%23grid)"/></svg>');
    opacity: 0.3;
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 60px;
    text-align: center;
  }
`;

const HeroText = styled.div`
  max-width: 600px;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 4rem;
  font-weight: 900;
  margin-bottom: 24px;
  line-height: 1.1;
  background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 3rem;
  }

  @media (max-width: 480px) {
    font-size: 2.5rem;
  }
`;

const HeroTagline = styled(motion.div)`
  font-size: 1.5rem;
  font-weight: 600;
  color: #3b82f6;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.2rem;
    justify-content: center;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.4rem;
  margin-bottom: 40px;
  opacity: 0.9;
  line-height: 1.6;
  color: #cbd5e1;
  font-weight: 400;
`;

const HeroVisual = styled(motion.div)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FloatingCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 24px;
  padding: 40px;
  text-align: center;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
    border-radius: 24px;
  }

  .content {
    position: relative;
    z-index: 1;
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 16px;
    color: white;
  }

  .metric {
    font-size: 3rem;
    font-weight: 900;
    color: #10b981;
    margin-bottom: 8px;
  }

  .label {
    color: #cbd5e1;
    font-size: 1rem;
    font-weight: 500;
  }
`;

const CTAButtons = styled(motion.div)`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  margin-bottom: 60px;

  @media (max-width: 968px) {
    justify-content: center;
  }
`;

const Button = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 18px 36px;
  border-radius: 16px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s;
  font-size: 1.1rem;
  position: relative;
  overflow: hidden;

  &.primary {
    background: linear-gradient(135deg, #3b82f6, #10b981, #8b5cf6);
    background-size: 200% 200%;
    color: white;
    position: relative;
    overflow: hidden;
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
    border: none;
    animation: gradient-shift 3s ease infinite;

    @keyframes gradient-shift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 15px 35px rgba(59, 130, 246, 0.6);
      animation-duration: 1s;
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
      transition: left 0.5s;
    }

    &:hover::before {
      left: 100%;
    }
  }

  &.secondary {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);

    &:hover {
      background: rgba(255, 255, 255, 0.2);
      border-color: rgba(255, 255, 255, 0.5);
      transform: translateY(-2px);
    }
  }
`;

const VideoSection = styled(motion.div)`
  position: relative;
  max-width: 600px;
  margin: 0 auto;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
`;

const VideoPlaceholder = styled.div`
  background: #1f2937;
  padding: 60px 40px;
  text-align: center;
  color: white;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80px;
    height: 80px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const PlayButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  background: #3b82f6;
  border: none;
  border-radius: 50%;
  color: white;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;

  &:hover {
    background: #2563eb;
    transform: translate(-50%, -50%) scale(1.1);
  }
`;

const StatsSection = styled.section`
  padding: 80px 0;
  background: #f8fafc;
`;

const StatsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;
  text-align: center;
`;

const StatItem = styled(motion.div)`
  h3 {
    font-size: 3rem;
    font-weight: 800;
    color: #3b82f6;
    margin-bottom: 8px;
  }

  p {
    font-size: 1.1rem;
    color: #64748b;
    font-weight: 500;
  }
`;

const FeaturesSection = styled.section`
  padding: 100px 0;
  background: white;
`;

const FeaturesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  font-size: 2.5rem;
  font-weight: 800;
  color: #1f2937;
  margin-bottom: 16px;
`;

const SectionSubtitle = styled(motion.p)`
  text-align: center;
  font-size: 1.25rem;
  color: #64748b;
  margin-bottom: 60px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  margin-top: 60px;
`;

const FeatureCard = styled(motion.div)`
  background: white;
  padding: 40px 30px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  text-align: center;
  transition: all 0.3s;
  border: 1px solid #e2e8f0;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }

  .icon {
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 24px;
    color: white;
    font-size: 24px;
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
  }
`;

const TestimonialsSection = styled.section`
  padding: 100px 0;
  background: #f8fafc;
`;

const TestimonialsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;
  margin-top: 60px;
`;

const TestimonialCard = styled(motion.div)`
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  position: relative;

  &::before {
    content: '"';
    position: absolute;
    top: -10px;
    left: 30px;
    font-size: 4rem;
    color: #3b82f6;
    font-weight: 800;
  }

  p {
    color: #374151;
    line-height: 1.6;
    margin-bottom: 24px;
    font-style: italic;
  }

  .author {
    display: flex;
    align-items: center;
    gap: 16px;

    .avatar {
      width: 50px;
      height: 50px;
      background: #3b82f6;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 700;
      font-size: 1.2rem;
    }

    .info {
      h4 {
        font-weight: 600;
        color: #1f2937;
        margin-bottom: 4px;
      }

      p {
        color: #64748b;
        font-size: 0.9rem;
        margin: 0;
        font-style: normal;
      }
    }
  }

  .rating {
    display: flex;
    gap: 4px;
    margin-bottom: 16px;

    .star {
      color: #fbbf24;
      font-size: 1.2rem;
    }
  }
`;

const Banner = styled.div`
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  color: white;
  padding: 12px 0;
  text-align: center;
  font-size: 0.9rem;
  font-weight: 500;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    animation: shimmer 3s infinite;
  }

  @keyframes shimmer {
    0% { left: -100%; }
    100% { left: 100%; }
  }
`;

const Home = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const features = [
    {
      icon: <FiZap />,
      title: "Agentic Process Automation",
      description: "Transform your business with AI-powered automation that handles complex workflows and decision-making processes."
    },
    {
      icon: <FiShield />,
      title: "Enterprise Security",
      description: "Bank-level security with 99.9% uptime. Your data is protected with enterprise-grade encryption and compliance."
    },
    {
      icon: <FiTrendingUp />,
      title: "Proven ROI",
      description: "Join 10,000+ businesses achieving 80% productivity gains and 300% revenue growth with our automation platform."
    },
    {
      icon: <FiUsers />,
      title: "24/7 Expert Support",
      description: "Dedicated support team and comprehensive training to ensure your automation success from day one."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CTO, Fortune 500 Company",
      content: "AutomatePro's agentic process automation transformed our entire operations. We achieved 80% productivity gains across 1000+ users and reduced processing time by 2 hours per transaction.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "VP Operations, Global Manufacturing",
      content: "The AI agents handle complex decision-making processes that previously required human intervention. Our compliance and document verification is now 100% automated with zero errors.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "CEO, Financial Services",
      content: "We've integrated AutomatePro across our entire loan processing workflow. The system now handles document verification, compliance checks, and eligibility determination automatically, saving us millions annually.",
      rating: 5
    }
  ];

  const stats = [
    { number: "10,000+", label: "Enterprise Customers" },
    { number: "80%", label: "Productivity Gains" },
    { number: "99.9%", label: "Uptime SLA" },
    { number: "24/7", label: "Global Support" }
  ];

  return (
    <div>
      <Banner>
        🚀 AutomatePro recognized as one of the '7 Wonders of AI' transforming business automation
      </Banner>

      <HeroSection>
        <HeroContent>
          <HeroText>
            <HeroTagline
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <FiZap />
              Automate. Scale. Grow.
            </HeroTagline>

            <HeroTitle
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              The Leading Agentic Process Automation Platform
            </HeroTitle>
            
            <HeroSubtitle
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Transform your business with AI-powered automation that handles complex workflows, 
              decision-making processes, and scales across your entire organization.
            </HeroSubtitle>

            <CTAButtons
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Button to="/pricing" className="primary">
                Request Demo
                <FiArrowRight />
              </Button>
              <Button as="button" onClick={() => setIsVideoModalOpen(true)} className="secondary">
                <FiPlay />
                Watch Demo
              </Button>
            </CTAButtons>
          </HeroText>

          <HeroVisual
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <FloatingCard
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 1, -1, 0]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="content">
                <h3>Productivity Improvement</h3>
                <div className="metric">80%</div>
                <div className="label">Tasks completed faster, smarter, and more cost-effectively</div>
              </div>
            </FloatingCard>
          </HeroVisual>
        </HeroContent>
      </HeroSection>

      <StatsSection>
        <StatsContainer>
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3>{stat.number}</h3>
              <p>{stat.label}</p>
            </StatItem>
          ))}
        </StatsContainer>
      </StatsSection>

      <FeaturesSection>
        <FeaturesContainer>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Not All AI Agents Are Created Equal
          </SectionTitle>
          
          <SectionSubtitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Experience the power of true agentic process automation that transforms your entire business
          </SectionSubtitle>

          <FeaturesGrid>
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </FeatureCard>
            ))}
          </FeaturesGrid>
        </FeaturesContainer>
      </FeaturesSection>

      <TestimonialsSection>
        <TestimonialsContainer>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Trusted by Global Leaders
          </SectionTitle>
          
          <SectionSubtitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            See how Fortune 500 companies are transforming their operations with agentic process automation
          </SectionSubtitle>

          <TestimonialsGrid>
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar key={i} className="star" />
                  ))}
                </div>
                <p>{testimonial.content}</p>
                <div className="author">
                  <div className="avatar">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="info">
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.role}</p>
                  </div>
                </div>
              </TestimonialCard>
            ))}
          </TestimonialsGrid>
        </TestimonialsContainer>
      </TestimonialsSection>

      <VideoModal 
        isOpen={isVideoModalOpen} 
        onClose={() => setIsVideoModalOpen(false)} 
      />
    </div>
  );
};

export default Home;
