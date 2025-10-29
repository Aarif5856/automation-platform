import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FiSettings,
  FiTarget, 
  FiTrendingUp, 
  FiUsers, 
  FiZap, 
  FiArrowRight,
  FiClock,
  FiBarChart,
  FiMail,
  FiSearch,
  FiDollarSign,
  FiAward
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

const StrategyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin: 40px 0;
`;

const StrategyCard = styled.div`
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 24px;
  text-align: center;

  .icon {
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, #10b981, #059669);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 16px;
    color: white;
    font-size: 24px;
  }

  h4 {
    font-size: 1.2rem;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 12px;
  }

  p {
    color: #64748b;
    font-size: 0.95rem;
    margin: 0;
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

const LeadGenerationAutomation = () => {
  return (
    <PageContainer>
      <Header>
        <HeaderContent>
          <Breadcrumb>
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/services">Services</Link>
            <span>/</span>
            <span>Lead Generation Automation</span>
          </Breadcrumb>

          <Title
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Lead Generation Automation: 10x Your Sales Pipeline in 2024
          </Title>

          <Subtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover proven strategies and tools to automate your lead generation process, 
            generate 500% more qualified leads, and convert them into paying customers 
            with minimal manual effort.
          </Subtitle>

          <MetaInfo>
            <MetaItem>
              <FiClock />
              <span>18 min read</span>
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
            <FiTarget />
            The Power of Automated Lead Generation
          </h2>
          
          <p>
            Lead generation automation has revolutionized how businesses acquire and nurture 
            prospects. By leveraging AI, machine learning, and sophisticated automation 
            tools, companies can now generate 500% more qualified leads while reducing 
            acquisition costs by up to 70%. This isn't just about sending more emails—it's 
            about creating intelligent systems that identify, engage, and convert prospects 
            at scale.
          </p>

          <p>
            The modern lead generation landscape requires a multi-channel approach that 
            combines social media automation, content marketing, email sequences, and 
            advanced analytics. Businesses that master these automated systems see 
            consistent month-over-month growth and sustainable competitive advantages.
          </p>

          <StatsGrid>
            <StatCard>
              <div className="icon">
                <FiTrendingUp />
              </div>
              <div className="number">500%</div>
              <div className="label">More Qualified Leads</div>
            </StatCard>
            <StatCard>
              <div className="icon">
                <FiDollarSign />
              </div>
              <div className="number">70%</div>
              <div className="label">Cost Reduction</div>
            </StatCard>
            <StatCard>
              <div className="icon">
                <FiUsers />
              </div>
              <div className="number">85%</div>
              <div className="label">Time Saved</div>
            </StatCard>
            <StatCard>
              <div className="icon">
                <FiAward />
              </div>
              <div className="number">3x</div>
              <div className="label">Higher Conversion</div>
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
            Essential Lead Generation Automation Strategies
          </h2>

          <h3>1. Social Media Lead Generation Automation</h3>
          <p>
            Social media platforms offer the largest pool of potential leads, but manual 
            outreach is time-consuming and often ineffective. Automated social media 
            lead generation uses AI to identify prospects, engage with them authentically, 
            and nurture relationships at scale.
          </p>

          <p>
            LinkedIn automation tools can identify decision-makers in your target companies, 
            send personalized connection requests, and follow up with value-driven content. 
            Instagram and Facebook automation can engage with users who interact with your 
            content, building relationships that lead to business opportunities.
          </p>

          <h3>2. Content Marketing Automation</h3>
          <p>
            Content marketing automation goes beyond scheduled posts. It includes automated 
            content distribution, lead magnet delivery, and personalized content recommendations 
            based on user behavior. This approach nurtures leads through the entire sales 
            funnel without manual intervention.
          </p>

          <h3>3. Email Sequence Automation</h3>
          <p>
            Automated email sequences are the backbone of lead nurturing. Modern systems 
            can segment leads based on behavior, industry, company size, and engagement 
            level, then deliver personalized content that moves prospects closer to purchase.
          </p>

          <h3>4. Web Scraping & Data Collection</h3>
          <p>
            Automated web scraping tools can collect contact information, company details, 
            and behavioral data from various sources. This data feeds into your CRM and 
            marketing automation platforms, creating a comprehensive view of each prospect.
          </p>

          <HighlightBox>
            <h4>Pro Tip: Multi-Channel Attribution</h4>
            <p>
              Track leads across all channels to understand which automation strategies 
              are most effective. Use UTM parameters, custom landing pages, and CRM 
              integration to get a complete picture of your lead generation ROI.
            </p>
          </HighlightBox>
        </ContentSection>

        <ContentSection
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2>
            <FiSearch />
            Advanced Lead Generation Techniques
          </h2>

          <p>
            Beyond basic automation, advanced lead generation techniques leverage AI and 
            machine learning to identify high-value prospects and optimize conversion 
            strategies in real-time.
          </p>

          <StrategyGrid>
            <StrategyCard>
              <div className="icon">
                <FiTarget />
              </div>
              <h4>Predictive Lead Scoring</h4>
              <p>AI analyzes prospect behavior to predict likelihood of conversion and prioritizes outreach efforts</p>
            </StrategyCard>
            <StrategyCard>
              <div className="icon">
                <FiMail />
              </div>
              <h4>Dynamic Email Personalization</h4>
              <p>Automatically customize email content based on prospect's industry, role, and engagement history</p>
            </StrategyCard>
            <StrategyCard>
              <div className="icon">
                <FiUsers />
              </div>
              <h4>Account-Based Marketing</h4>
              <p>Target entire organizations with coordinated campaigns across multiple channels and touchpoints</p>
            </StrategyCard>
            <StrategyCard>
              <div className="icon">
                <FiBarChart />
              </div>
              <h4>Behavioral Triggers</h4>
              <p>Automatically engage prospects based on specific actions like website visits or content downloads</p>
            </StrategyCard>
            <StrategyCard>
              <div className="icon">
                <FiZap />
              </div>
              <h4>Cross-Platform Integration</h4>
              <p>Sync data across all marketing channels to create unified prospect profiles and seamless experiences</p>
            </StrategyCard>
            <StrategyCard>
              <div className="icon">
                <FiAward />
              </div>
              <h4>Conversion Optimization</h4>
              <p>Continuously test and optimize landing pages, forms, and CTAs to maximize lead conversion rates</p>
            </StrategyCard>
          </StrategyGrid>
        </ContentSection>

        <ContentSection
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <h2>
            <FiSettings />
            Building Your Lead Generation Automation Stack
          </h2>

          <h3>Essential Tools for Lead Generation Automation</h3>
          <p>
            A successful lead generation automation system requires the right combination 
            of tools that work together seamlessly. Here's the essential stack:
          </p>

          <h3>1. CRM & Lead Management</h3>
          <p>
            Your CRM is the central hub for all lead data. Choose a platform that offers 
            automation capabilities, lead scoring, and integration with your other tools. 
            Popular options include HubSpot, Salesforce, and Pipedrive.
          </p>

          <h3>2. Marketing Automation Platform</h3>
          <p>
            This tool handles email sequences, lead nurturing, and behavioral triggers. 
            Look for platforms that offer advanced segmentation, A/B testing, and 
            multi-channel campaign management.
          </p>

          <h3>3. Social Media Automation Tools</h3>
          <p>
            Tools like Hootsuite, Buffer, or specialized LinkedIn automation platforms 
            help you maintain consistent social media presence and engage with prospects 
            at scale.
          </p>

          <h3>4. Web Scraping & Data Collection</h3>
          <p>
            Automated data collection tools can gather contact information, company 
            details, and behavioral data from various online sources. This data feeds 
            into your CRM and marketing automation systems.
          </p>

          <h3>5. Analytics & Reporting</h3>
          <p>
            Comprehensive analytics help you understand which strategies are working 
            and where to optimize. Look for tools that provide detailed attribution 
            and ROI reporting.
          </p>

          <HighlightBox>
            <h4>Integration is Key</h4>
            <p>
              Ensure all your tools integrate seamlessly. Use Zapier or similar 
              platforms to connect different systems and create automated workflows 
              that span your entire lead generation process.
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
            Measuring Lead Generation Automation Success
          </h2>

          <p>
            To ensure your lead generation automation is delivering results, track these 
            key performance indicators:
          </p>

          <h3>Primary Metrics</h3>
          <ul>
            <li><strong>Lead Volume:</strong> Total number of leads generated per month</li>
            <li><strong>Lead Quality Score:</strong> Percentage of leads that meet your ideal customer profile</li>
            <li><strong>Cost Per Lead (CPL):</strong> Total marketing spend divided by number of leads</li>
            <li><strong>Lead-to-Customer Conversion Rate:</strong> Percentage of leads that become paying customers</li>
          </ul>

          <h3>Channel-Specific Metrics</h3>
          <ul>
            <li><strong>Email Open Rates:</strong> Track engagement across different email sequences</li>
            <li><strong>Social Media Engagement:</strong> Monitor likes, comments, shares, and profile visits</li>
            <li><strong>Website Conversion Rate:</strong> Percentage of visitors who become leads</li>
            <li><strong>Content Performance:</strong> Which content pieces generate the most leads</li>
          </ul>

          <h3>Advanced Analytics</h3>
          <ul>
            <li><strong>Attribution Analysis:</strong> Which channels contribute most to closed deals</li>
            <li><strong>Lead Velocity:</strong> How quickly leads move through your sales funnel</li>
            <li><strong>Customer Lifetime Value (CLV):</strong> Long-term value of leads from different sources</li>
            <li><strong>Return on Ad Spend (ROAS):</strong> Revenue generated per dollar spent on advertising</li>
          </ul>
        </ContentSection>

        <AffiliateSection>
          <h4>Recommended Lead Generation Tools</h4>
          <p>
            Ready to automate your lead generation? Here are the top-rated tools for 
            building a powerful lead generation automation system:
          </p>
          <a 
            href="https://zapier.com/automation/lead-generation?utm_source=automatepro&utm_medium=affiliate&utm_campaign=lead_generation&utm_content=seo_page" 
            target="_blank"
            rel="noopener noreferrer"
            className="affiliate-link"
            onClick={() => {
              // Track affiliate click
              if (window.gtag) {
                window.gtag('event', 'affiliate_click', {
                  'affiliate_provider': 'zapier',
                  'page': 'lead_generation_automation',
                  'link_text': 'Explore Zapier Lead Generation Automation'
                });
              }
            }}
          >
            <FiZap />
            Explore Zapier Lead Generation Automation
          </a>
        </AffiliateSection>

        <CTA>
          <h3>Ready to 10x Your Lead Generation?</h3>
          <p>
            Our business automation services can help you build a comprehensive lead 
            generation system that generates qualified prospects 24/7. Get started 
            with a free lead generation audit today.
          </p>
          <div className="buttons">
            <Button to="/contact" className="primary">
              <FiArrowRight />
              Get Free Audit
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

export default LeadGenerationAutomation;

