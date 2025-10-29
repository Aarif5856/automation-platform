import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FiMail, 
  FiTrendingUp, 
  FiUsers, 
  FiZap, 
  FiCheck,
  FiArrowRight,
  FiClock,
  FiTarget,
  FiBarChart
} from 'react-icons/fi';

const PageContainer = styled.div`
  min-height: 100vh;
  background: #f8fafc;
`;

const Header = styled.section`
  background: linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%);
  color: white;
  padding: 120px 0 80px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%);
    opacity: 0.8;
  }
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 1;
  text-align: center;
`;

const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
  font-size: 0.9rem;
  opacity: 0.8;

  a {
    color: #cbd5e1;
    text-decoration: none;
    transition: color 0.3s;

    &:hover {
      color: #3b82f6;
    }
  }
`;

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 900;
  margin-bottom: 24px;
  line-height: 1.1;
  background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.3rem;
  color: #cbd5e1;
  max-width: 800px;
  margin: 0 auto 40px;
  line-height: 1.6;
`;

const MetaInfo = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
  margin-top: 40px;

  @media (max-width: 768px) {
    gap: 20px;
  }
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #cbd5e1;
  font-size: 0.9rem;
`;

const Content = styled.section`
  max-width: 800px;
  margin: 0 auto;
  padding: 80px 20px;
  background: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  margin-top: -40px;
  position: relative;
  z-index: 2;
`;

const ContentSection = styled(motion.section)`
  margin-bottom: 60px;

  h2 {
    font-size: 2rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 16px;
    margin-top: 32px;
  }

  p {
    color: #4b5563;
    line-height: 1.7;
    margin-bottom: 20px;
    font-size: 1.1rem;
  }

  ul, ol {
    color: #4b5563;
    line-height: 1.7;
    margin-bottom: 20px;
    padding-left: 24px;

    li {
      margin-bottom: 12px;
    }
  }
`;

const HighlightBox = styled.div`
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border: 1px solid #0ea5e9;
  border-radius: 12px;
  padding: 24px;
  margin: 32px 0;
  position: relative;

  &::before {
    content: '💡';
    position: absolute;
    top: -12px;
    left: 24px;
    background: white;
    padding: 0 8px;
    font-size: 1.2rem;
  }

  h4 {
    color: #0c4a6e;
    font-weight: 600;
    margin-bottom: 12px;
    font-size: 1.1rem;
  }

  p {
    color: #0c4a6e;
    margin: 0;
    font-size: 1rem;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
  margin: 40px 0;
`;

const StatCard = styled.div`
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 24px;
  text-align: center;

  .icon {
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 16px;
    color: white;
    font-size: 20px;
  }

  .number {
    font-size: 2rem;
    font-weight: 800;
    color: #1f2937;
    margin-bottom: 8px;
  }

  .label {
    color: #64748b;
    font-size: 0.9rem;
    font-weight: 500;
  }
`;

const CTA = styled.div`
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  color: white;
  padding: 40px;
  border-radius: 16px;
  text-align: center;
  margin: 60px 0;

  h3 {
    font-size: 1.8rem;
    margin-bottom: 16px;
    color: white;
  }

  p {
    font-size: 1.1rem;
    margin-bottom: 24px;
    color: #e0f2fe;
  }

  .buttons {
    display: flex;
    gap: 16px;
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const Button = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 16px 32px;
  border-radius: 12px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;
  font-size: 1rem;

  &.primary {
    background: white;
    color: #1e40af;

    &:hover {
      background: #f8fafc;
      transform: translateY(-2px);
    }
  }

  &.secondary {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.3);

    &:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
    }
  }
`;

const AffiliateSection = styled.div`
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 24px;
  margin: 40px 0;
  text-align: center;

  h4 {
    color: #1f2937;
    margin-bottom: 12px;
  }

  p {
    color: #64748b;
    margin-bottom: 16px;
    font-size: 0.9rem;
  }

  .affiliate-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    background: #3b82f6;
    color: white;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 600;
    transition: all 0.3s;

    &:hover {
      background: #2563eb;
      transform: translateY(-2px);
    }
  }
`;

const AIEmailMarketing = () => {
  return (
    <PageContainer>
      <Header>
        <HeaderContent>
          <Breadcrumb>
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/services">Services</Link>
            <span>/</span>
            <span>AI Email Marketing</span>
          </Breadcrumb>

          <Title
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            How AI Automates Email Marketing: Complete Guide 2024
          </Title>

          <Subtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover how artificial intelligence is revolutionizing email marketing automation, 
            increasing open rates by 300% and driving 5x more conversions for businesses worldwide.
          </Subtitle>

          <MetaInfo>
            <MetaItem>
              <FiClock />
              <span>12 min read</span>
            </MetaItem>
            <MetaItem>
              <FiTarget />
              <span>Updated Dec 2024</span>
            </MetaItem>
            <MetaItem>
              <FiBarChart />
              <span>Expert Level</span>
            </MetaItem>
          </MetaInfo>
        </HeaderContent>
      </Header>

      <Content>
        <ContentSection
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2>
            <FiMail />
            The AI Email Marketing Revolution
          </h2>
          
          <p>
            Email marketing automation has evolved from simple drip campaigns to sophisticated 
            AI-powered systems that can predict customer behavior, personalize content in real-time, 
            and optimize send times for maximum engagement. In 2024, businesses using AI-driven 
            email marketing see an average of 300% higher open rates and 5x more conversions 
            compared to traditional email campaigns.
          </p>

          <p>
            The key to this transformation lies in machine learning algorithms that analyze 
            vast amounts of customer data to create hyper-personalized experiences. From 
            predictive analytics to natural language processing, AI is making email marketing 
            more effective than ever before.
          </p>

          <StatsGrid>
            <StatCard>
              <div className="icon">
                <FiTrendingUp />
              </div>
              <div className="number">300%</div>
              <div className="label">Higher Open Rates</div>
            </StatCard>
            <StatCard>
              <div className="icon">
                <FiUsers />
              </div>
              <div className="number">5x</div>
              <div className="label">More Conversions</div>
            </StatCard>
            <StatCard>
              <div className="icon">
                <FiZap />
              </div>
              <div className="number">85%</div>
              <div className="label">Time Saved</div>
            </StatCard>
            <StatCard>
              <div className="icon">
                <FiCheck />
              </div>
              <div className="number">92%</div>
              <div className="label">Accuracy Rate</div>
            </StatCard>
          </StatsGrid>
        </ContentSection>

        <ContentSection
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2>
            <FiZap />
            Core AI Email Marketing Technologies
          </h2>

          <h3>1. Predictive Analytics & Customer Segmentation</h3>
          <p>
            AI-powered predictive analytics goes beyond basic demographic segmentation. 
            Machine learning algorithms analyze customer behavior patterns, purchase history, 
            email engagement metrics, and even external factors like weather or economic 
            indicators to predict the best time to send emails and what content will resonate.
          </p>

          <p>
            Advanced segmentation uses clustering algorithms to group customers based on 
            behavioral similarities rather than just demographics. This creates more 
            meaningful segments that lead to higher engagement rates and better conversion outcomes.
          </p>

          <h3>2. Natural Language Processing (NLP) for Content Generation</h3>
          <p>
            Modern AI can generate compelling email subject lines, body content, and even 
            entire campaigns based on your brand voice and customer preferences. NLP models 
            analyze successful email patterns across your industry and create content that 
            matches your tone while optimizing for engagement.
          </p>

          <h3>3. Send Time Optimization</h3>
          <p>
            AI algorithms continuously learn from your audience's email behavior to determine 
            the optimal send times for each individual subscriber. This personalization 
            extends beyond time zones to include factors like device usage patterns and 
            engagement history.
          </p>

          <HighlightBox>
            <h4>Pro Tip: A/B Testing at Scale</h4>
            <p>
              AI can run thousands of A/B tests simultaneously, testing subject lines, 
              content variations, send times, and even email designs. The system learns 
              from each test and automatically applies winning elements to future campaigns.
            </p>
          </HighlightBox>
        </ContentSection>

        <ContentSection
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2>
            <FiTarget />
            Implementation Strategies for Business Automation Services
          </h2>

          <h3>Step 1: Data Collection & Integration</h3>
          <p>
            The foundation of effective AI email marketing is comprehensive data collection. 
            Integrate your CRM, website analytics, social media data, and customer service 
            interactions to create a complete customer profile. This 360-degree view enables 
            AI to make more accurate predictions and personalizations.
          </p>

          <h3>Step 2: Choose the Right AI Email Marketing Platform</h3>
          <p>
            When selecting an AI-powered email marketing platform, look for features like:
          </p>
          <ul>
            <li>Machine learning-powered send time optimization</li>
            <li>Automated content generation and personalization</li>
            <li>Predictive analytics and customer scoring</li>
            <li>Advanced segmentation capabilities</li>
            <li>Integration with your existing business tools</li>
            <li>Real-time performance optimization</li>
          </ul>

          <h3>Step 3: Start with Welcome Series Automation</h3>
          <p>
            Begin your AI email marketing journey with automated welcome series. AI can 
            create personalized onboarding sequences based on how customers found your 
            business, their interests, and their behavior on your website.
          </p>

          <h3>Step 4: Implement Behavioral Triggers</h3>
          <p>
            Set up AI-powered behavioral triggers that respond to customer actions in real-time. 
            These can include abandoned cart emails, post-purchase follow-ups, re-engagement 
            campaigns, and loyalty program communications.
          </p>
        </ContentSection>

        <ContentSection
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <h2>
            <FiBarChart />
            Measuring Success: Key Metrics to Track
          </h2>

          <p>
            To ensure your AI email marketing automation is delivering results, track these 
            essential metrics:
          </p>

          <h3>Primary Metrics</h3>
          <ul>
            <li><strong>Open Rate:</strong> AI-optimized campaigns typically see 25-40% open rates</li>
            <li><strong>Click-Through Rate (CTR):</strong> Aim for 3-8% CTR with AI personalization</li>
            <li><strong>Conversion Rate:</strong> Track email-to-purchase conversions</li>
            <li><strong>Revenue Per Email:</strong> Measure direct revenue attribution</li>
          </ul>

          <h3>Advanced AI-Specific Metrics</h3>
          <ul>
            <li><strong>Personalization Score:</strong> How well AI is tailoring content</li>
            <li><strong>Send Time Accuracy:</strong> Effectiveness of AI send time optimization</li>
            <li><strong>Content Performance:</strong> Which AI-generated content performs best</li>
            <li><strong>Customer Lifetime Value:</strong> Impact of AI email marketing on CLV</li>
          </ul>

          <HighlightBox>
            <h4>ROI Calculation</h4>
            <p>
              Calculate your AI email marketing ROI by comparing the cost of your email 
              marketing platform and time investment against the revenue generated from 
              email-driven conversions. Most businesses see 3,800% ROI on email marketing 
              with AI optimization.
            </p>
          </HighlightBox>
        </ContentSection>

        <AffiliateSection>
          <h4>Recommended AI Email Marketing Tools</h4>
          <p>
            Ready to implement AI email marketing? Here are the top-rated platforms that 
            integrate seamlessly with business automation services:
          </p>
          <a 
            href="https://zapier.com/automation/email-marketing-automation/ai-email-marketing?utm_source=automatepro&utm_medium=affiliate&utm_campaign=ai_email_marketing&utm_content=seo_page" 
            target="_blank"
            rel="noopener noreferrer"
            className="affiliate-link"
            onClick={() => {
              // Track affiliate click
              if (window.gtag) {
                window.gtag('event', 'affiliate_click', {
                  'affiliate_provider': 'zapier',
                  'page': 'ai_email_marketing',
                  'link_text': 'Explore Zapier AI Email Marketing'
                });
              }
            }}
          >
            <FiZap />
            Explore Zapier AI Email Marketing
          </a>
        </AffiliateSection>

        <CTA>
          <h3>Ready to Transform Your Email Marketing?</h3>
          <p>
            Our business automation services can help you implement AI-powered email marketing 
            that drives real results. Get started with a free consultation today.
          </p>
          <div className="buttons">
            <Button to="/contact" className="primary">
              <FiArrowRight />
              Get Free Consultation
            </Button>
            <Button to="/services" className="secondary">
              View All Services
            </Button>
          </div>
        </CTA>
      </Content>
    </PageContainer>
  );
};

export default AIEmailMarketing;
