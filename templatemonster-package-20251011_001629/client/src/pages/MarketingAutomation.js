import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FiTrendingUp, 
  FiUsers, 
  FiZap, 
  FiArrowRight,
  FiClock,
  FiTarget,
  FiBarChart,
  FiMessageSquare,
  FiDollarSign
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
  justify-content: center;
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

const MarketingAutomation = () => {
  return (
    <PageContainer>
      <Header>
        <HeaderContent>
          <Breadcrumb>
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/services">Services</Link>
            <span>/</span>
            <span>Marketing Automation</span>
          </Breadcrumb>

          <Title
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Marketing Automation: Scale Your Marketing & Generate More Revenue 2024
          </Title>

          <Subtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Master marketing automation to nurture leads, personalize customer journeys, 
            and increase revenue by 400% while reducing marketing costs by 50%.
          </Subtitle>

          <MetaInfo>
            <MetaItem>
              <FiClock />
              <span>16 min read</span>
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
            <FiTrendingUp />
            What is Marketing Automation?
          </h2>
          
          <p>
            Marketing automation is the use of software and technology to automate repetitive 
            marketing tasks, nurture leads through personalized journeys, and measure campaign 
            performance across multiple channels. It enables businesses to deliver the right 
            message to the right person at the right time—automatically and at scale.
          </p>

          <p>
            In 2024, marketing automation has evolved beyond simple email campaigns to include 
            AI-powered personalization, predictive analytics, cross-channel orchestration, 
            and intelligent lead scoring. Companies using advanced marketing automation see 
            400% increases in revenue, 50% reductions in marketing costs, and dramatic 
            improvements in customer lifetime value.
          </p>

          <StatsGrid>
            <StatCard>
              <div className="icon">
                <FiDollarSign />
              </div>
              <div className="number">400%</div>
              <div className="label">Revenue Increase</div>
            </StatCard>
            <StatCard>
              <div className="icon">
                <FiUsers />
              </div>
              <div className="number">50%</div>
              <div className="label">Cost Reduction</div>
            </StatCard>
            <StatCard>
              <div className="icon">
                <FiTarget />
              </div>
              <div className="number">77%</div>
              <div className="label">Higher Conversions</div>
            </StatCard>
            <StatCard>
              <div className="icon">
                <FiZap />
              </div>
              <div className="number">12hrs</div>
              <div className="label">Time Saved/Week</div>
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
            Core Marketing Automation Capabilities
          </h2>

          <h3>1. Email Marketing Automation</h3>
          <p>
            Automated email campaigns go far beyond scheduled newsletters. Modern email 
            automation includes behavioral triggers, dynamic content personalization, 
            predictive send time optimization, and automated A/B testing. Create drip 
            campaigns that adapt based on subscriber engagement, ensuring each recipient 
            receives content tailored to their interests and stage in the buyer journey.
          </p>

          <h3>2. Lead Nurturing & Scoring</h3>
          <p>
            Marketing automation platforms track every interaction a lead has with your 
            brand—website visits, email opens, content downloads, social media engagement. 
            This data feeds into lead scoring models that automatically identify your 
            most qualified prospects, ensuring sales teams focus on leads most likely to convert.
          </p>

          <h3>3. Multi-Channel Campaign Management</h3>
          <p>
            Orchestrate campaigns across email, social media, SMS, web push notifications, 
            and more from a single platform. Create unified customer experiences that 
            seamlessly transition between channels based on user preferences and behavior.
          </p>

          <h3>4. Personalization & Dynamic Content</h3>
          <p>
            Deliver personalized experiences at scale by dynamically changing content based 
            on user attributes, behavior, location, and preferences. Show different homepage 
            content to different segments, personalize email subject lines and body content, 
            and create unique landing page experiences for each visitor.
          </p>

          <h3>5. Analytics & Attribution</h3>
          <p>
            Track campaign performance across all channels with detailed analytics. 
            Understand which touchpoints contribute to conversions, calculate ROI for 
            each campaign, and use AI-powered insights to optimize future marketing efforts.
          </p>

          <HighlightBox>
            <h4>Real Success Story</h4>
            <p>
              An e-commerce company implemented marketing automation and saw their email 
              revenue increase by 320% in 6 months. By automating abandoned cart sequences, 
              post-purchase follow-ups, and personalized product recommendations, they 
              recovered $450,000 in otherwise lost sales.
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
            Essential Marketing Automation Workflows
          </h2>

          <h3>Welcome Series</h3>
          <p>
            Automatically engage new subscribers or customers with a series of emails that 
            introduce your brand, provide value, and guide them toward their first purchase 
            or key action. Welcome series emails have 4x higher open rates and 5x higher 
            click rates than regular promotional emails.
          </p>

          <h3>Abandoned Cart Recovery</h3>
          <p>
            Recover lost revenue by automatically sending personalized reminders to shoppers 
            who abandoned their carts. Include product images, customer reviews, and limited-time 
            incentives. Companies recover 10-15% of abandoned carts through automated sequences.
          </p>

          <h3>Post-Purchase Nurturing</h3>
          <p>
            Build customer loyalty with automated post-purchase sequences that provide 
            order confirmations, shipping updates, product usage tips, review requests, 
            and cross-sell opportunities. This increases repeat purchase rates by 35%.
          </p>

          <h3>Re-engagement Campaigns</h3>
          <p>
            Automatically identify inactive subscribers or customers and win them back with 
            targeted re-engagement campaigns. Test different incentives, highlight new 
            products, or simply ask for feedback. Re-engagement campaigns can reactivate 
            12-20% of dormant contacts.
          </p>

          <h3>Lead Nurturing Sequences</h3>
          <p>
            Guide prospects through the buyer journey with educational content, case studies, 
            product demonstrations, and social proof. Automated nurturing increases conversion 
            rates by 50% and shortens sales cycles by 23%.
          </p>

          <h3>Event-Based Campaigns</h3>
          <p>
            Trigger campaigns based on specific events like birthdays, anniversaries, 
            subscription renewals, or milestone achievements. Event-based campaigns have 
            3x higher engagement rates than generic promotions.
          </p>
        </ContentSection>

        <ContentSection
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <h2>
            <FiMessageSquare />
            Building Your Marketing Automation Strategy
          </h2>

          <h3>Phase 1: Strategy & Planning</h3>
          <p>
            Define your marketing automation goals, target audience, and key metrics. 
            Map out customer journeys, identify touchpoints, and plan the content needed 
            for each stage. Successful automation starts with a clear strategy.
          </p>

          <h3>Phase 2: Platform Selection</h3>
          <p>
            Choose a marketing automation platform that aligns with your business size, 
            budget, and technical requirements. Consider factors like:
          </p>
          <ul>
            <li>Integration with your existing tech stack (CRM, e-commerce, analytics)</li>
            <li>Ease of use and learning curve</li>
            <li>Scalability as your business grows</li>
            <li>Advanced features like AI, predictive analytics, and multi-channel support</li>
            <li>Pricing structure and total cost of ownership</li>
          </ul>

          <h3>Phase 3: Data Integration & Segmentation</h3>
          <p>
            Connect your data sources and establish a single source of truth for customer 
            information. Create meaningful segments based on demographics, behavior, 
            purchase history, and engagement level. Quality segmentation is the foundation 
            of effective personalization.
          </p>

          <h3>Phase 4: Content Creation</h3>
          <p>
            Develop content for each stage of your automated workflows. This includes 
            email templates, landing pages, social media content, and lead magnets. 
            Focus on providing value and moving prospects toward conversion.
          </p>

          <h3>Phase 5: Workflow Implementation</h3>
          <p>
            Build and test your automated workflows one at a time. Start with high-impact, 
            low-complexity workflows like welcome series or abandoned cart recovery. 
            Test thoroughly before launching to a larger audience.
          </p>

          <h3>Phase 6: Optimization & Scaling</h3>
          <p>
            Continuously monitor performance, run A/B tests, and optimize based on data. 
            Gradually expand your automation efforts to cover more use cases and channels. 
            The most successful companies treat marketing automation as an ongoing 
            optimization process, not a one-time project.
          </p>

          <HighlightBox>
            <h4>Quick Win Strategy</h4>
            <p>
              Start by automating your welcome email series. This single workflow typically 
              generates 3-4x higher revenue per email than regular campaigns and takes 
              only 1-2 days to implement. Use this quick win to build momentum and 
              justify further automation investments.
            </p>
          </HighlightBox>
        </ContentSection>

        <ContentSection
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <h2>
            <FiBarChart />
            Marketing Automation Best Practices
          </h2>

          <h3>Personalization at Scale</h3>
          <p>
            Use dynamic content and merge tags to personalize every message. Go beyond 
            first names—reference past purchases, browsing behavior, location, and 
            preferences. Personalized emails deliver 6x higher transaction rates.
          </p>

          <h3>Behavioral Triggers Over Scheduled Sends</h3>
          <p>
            Prioritize behavior-triggered campaigns over scheduled blasts. Messages sent 
            in response to specific actions (cart abandonment, content download, trial 
            expiration) are 3-5x more effective than generic promotions.
          </p>

          <h3>Test Everything</h3>
          <p>
            A/B test subject lines, send times, content, CTAs, and landing pages. Let 
            data guide your decisions rather than assumptions. Even small improvements 
            compound over time to significant revenue gains.
          </p>

          <h3>Focus on Value, Not Just Promotion</h3>
          <p>
            Balance promotional content with educational, entertaining, and helpful 
            content. Provide value in every interaction to build trust and engagement. 
            The 80/20 rule applies: 80% value, 20% promotion.
          </p>

          <h3>Respect Privacy & Preferences</h3>
          <p>
            Honor unsubscribe requests immediately, provide clear preference centers, 
            and comply with regulations like GDPR and CAN-SPAM. Respecting subscriber 
            preferences actually improves deliverability and engagement rates.
          </p>
        </ContentSection>

        <AffiliateSection>
          <h4>Recommended Marketing Automation Platforms</h4>
          <p>
            Ready to scale your marketing with automation? Here are the top-rated 
            platforms for business automation services:
          </p>
          <a 
            href="https://zapier.com/apps/marketing-automation?utm_source=automatepro&utm_medium=affiliate&utm_campaign=marketing_automation&utm_content=seo_page" 
            target="_blank" 
            rel="noopener noreferrer"
            className="affiliate-link"
            onClick={() => {
              // Track affiliate click
              if (window.gtag) {
                window.gtag('event', 'affiliate_click', {
                  'affiliate_provider': 'zapier',
                  'page': 'marketing_automation',
                  'link_text': 'Explore Marketing Automation Tools'
                });
              }
            }}
          >
            <FiZap />
            Explore Marketing Automation Tools
          </a>
        </AffiliateSection>

        <CTA>
          <h3>Ready to Transform Your Marketing?</h3>
          <p>
            Our business automation services can help you design and implement marketing 
            automation that delivers measurable results. Get started with a free marketing 
            automation strategy session today.
          </p>
          <div className="buttons">
            <Button to="/contact" className="primary">
              <FiArrowRight />
              Get Free Strategy Session
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

export default MarketingAutomation;



