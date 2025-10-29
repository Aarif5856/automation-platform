import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FiSettings, 
  FiTrendingUp, 
  FiUsers, 
  FiZap, 
  FiArrowRight,
  FiClock,
  FiTarget,
  FiBarChart,
  FiShield,
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

const ProcessGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin: 40px 0;
`;

const ProcessCard = styled.div`
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

const BusinessProcessAutomation = () => {
  return (
    <PageContainer>
      <Header>
        <HeaderContent>
          <Breadcrumb>
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/services">Services</Link>
            <span>/</span>
            <span>Business Process Automation</span>
          </Breadcrumb>

          <Title
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Business Process Automation: Complete Implementation Guide 2024
          </Title>

          <Subtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Transform your business operations with intelligent automation that reduces costs by 60%, 
            increases efficiency by 80%, and eliminates human error across all processes.
          </Subtitle>

          <MetaInfo>
            <MetaItem>
              <FiClock />
              <span>15 min read</span>
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
            <FiSettings />
            What is Business Process Automation?
          </h2>
          
          <p>
            Business Process Automation (BPA) is the use of technology to execute recurring tasks 
            or processes in a business where manual effort can be replaced. It's designed to 
            streamline operations, reduce costs, and improve efficiency by automating routine, 
            rule-based tasks that don't require human judgment or creativity.
          </p>

          <p>
            In 2024, BPA has evolved beyond simple task automation to include intelligent 
            decision-making, predictive analytics, and cross-system integration. Modern 
            automation platforms can handle complex workflows that span multiple departments, 
            systems, and even external partners.
          </p>

          <StatsGrid>
            <StatCard>
              <div className="icon">
                <FiDollarSign />
              </div>
              <div className="number">60%</div>
              <div className="label">Cost Reduction</div>
            </StatCard>
            <StatCard>
              <div className="icon">
                <FiTrendingUp />
              </div>
              <div className="number">80%</div>
              <div className="label">Efficiency Gain</div>
            </StatCard>
            <StatCard>
              <div className="icon">
                <FiShield />
              </div>
              <div className="number">99.9%</div>
              <div className="label">Error Reduction</div>
            </StatCard>
            <StatCard>
              <div className="icon">
                <FiUsers />
              </div>
              <div className="number">24/7</div>
              <div className="label">Operation</div>
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
            Key Benefits of Business Process Automation
          </h2>

          <h3>1. Cost Reduction & ROI</h3>
          <p>
            Businesses implementing BPA typically see 60-80% reduction in operational costs 
            within the first year. By eliminating manual tasks, reducing errors, and 
            optimizing resource allocation, companies can redirect their workforce to 
            higher-value activities while maintaining or improving service quality.
          </p>

          <h3>2. Improved Accuracy & Compliance</h3>
          <p>
            Automated processes eliminate human error and ensure consistent adherence to 
            business rules and compliance requirements. This is particularly crucial in 
            industries like finance, healthcare, and manufacturing where accuracy is paramount.
          </p>

          <h3>3. Enhanced Scalability</h3>
          <p>
            Automation allows businesses to scale operations without proportionally increasing 
            headcount. As demand grows, automated processes can handle increased volume 
            without the need for additional human resources.
          </p>

          <h3>4. Better Customer Experience</h3>
          <p>
            Faster processing times, consistent service delivery, and 24/7 availability 
            lead to improved customer satisfaction. Automated systems can respond to 
            customer requests instantly and provide real-time updates on process status.
          </p>

          <HighlightBox>
            <h4>Real-World Impact</h4>
            <p>
              A Fortune 500 manufacturing company automated their invoice processing workflow, 
              reducing processing time from 5 days to 2 hours while achieving 99.8% accuracy. 
              This resulted in $2.3M annual savings and improved supplier relationships.
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
            Common Business Processes to Automate
          </h2>

          <p>
            While virtually any repetitive business process can be automated, some processes 
            offer higher ROI and are easier to implement. Here are the most commonly 
            automated business processes:
          </p>

          <ProcessGrid>
            <ProcessCard>
              <div className="icon">
                <FiUsers />
              </div>
              <h4>HR & Onboarding</h4>
              <p>Automate employee onboarding, leave requests, performance reviews, and payroll processing</p>
            </ProcessCard>
            <ProcessCard>
              <div className="icon">
                <FiDollarSign />
              </div>
              <h4>Finance & Accounting</h4>
              <p>Invoice processing, expense management, budget tracking, and financial reporting</p>
            </ProcessCard>
            <ProcessCard>
              <div className="icon">
                <FiSettings />
              </div>
              <h4>IT Operations</h4>
              <p>System monitoring, backup management, user provisioning, and security compliance</p>
            </ProcessCard>
            <ProcessCard>
              <div className="icon">
                <FiZap />
              </div>
              <h4>Customer Service</h4>
              <p>Ticket routing, response generation, escalation management, and feedback collection</p>
            </ProcessCard>
            <ProcessCard>
              <div className="icon">
                <FiBarChart />
              </div>
              <h4>Sales & Marketing</h4>
              <p>Lead scoring, email campaigns, social media posting, and performance analytics</p>
            </ProcessCard>
            <ProcessCard>
              <div className="icon">
                <FiShield />
              </div>
              <h4>Compliance & Security</h4>
              <p>Audit trails, compliance reporting, access management, and risk assessment</p>
            </ProcessCard>
          </ProcessGrid>
        </ContentSection>

        <ContentSection
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <h2>
            <FiSettings />
            Implementation Roadmap for Business Automation Services
          </h2>

          <h3>Phase 1: Assessment & Planning (Weeks 1-2)</h3>
          <p>
            Begin by conducting a comprehensive audit of your current business processes. 
            Identify repetitive tasks, bottlenecks, and areas with high error rates. 
            Prioritize processes based on automation potential and business impact.
          </p>

          <h3>Phase 2: Process Design & Documentation (Weeks 3-4)</h3>
          <p>
            Map out your current processes in detail, then design the automated workflows. 
            This includes defining triggers, decision points, data requirements, and 
            exception handling procedures.
          </p>

          <h3>Phase 3: Technology Selection (Weeks 5-6)</h3>
          <p>
            Choose the right automation platform based on your requirements. Consider factors 
            like integration capabilities, scalability, user-friendliness, and total cost 
            of ownership. Popular options include Zapier, Microsoft Power Automate, and 
            custom solutions.
          </p>

          <h3>Phase 4: Pilot Implementation (Weeks 7-10)</h3>
          <p>
            Start with a small-scale pilot of your most promising automation opportunity. 
            This allows you to test the technology, refine the process, and demonstrate 
            value before full deployment.
          </p>

          <h3>Phase 5: Full Deployment & Optimization (Weeks 11-16)</h3>
          <p>
            Roll out automation across your organization, starting with high-impact, 
            low-risk processes. Continuously monitor performance and optimize based on 
            real-world usage patterns.
          </p>

          <HighlightBox>
            <h4>Success Metrics to Track</h4>
            <p>
              Monitor these key performance indicators: process completion time, error rates, 
              cost per transaction, employee satisfaction, customer satisfaction, and ROI. 
              Aim for 50% improvement in at least three metrics within 6 months.
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
            Technology Stack for Business Process Automation
          </h2>

          <h3>Low-Code/No-Code Platforms</h3>
          <p>
            These platforms allow business users to create automation workflows without 
            extensive programming knowledge. They're ideal for simple to moderate 
            automation needs and offer quick implementation times.
          </p>

          <h3>Robotic Process Automation (RPA)</h3>
          <p>
            RPA tools can mimic human interactions with software applications, making 
            them perfect for automating legacy systems that don't have modern APIs. 
            They work by recording and replaying user actions.
          </p>

          <h3>Workflow Management Systems</h3>
          <p>
            These enterprise-grade platforms provide comprehensive automation capabilities 
            including process modeling, execution engines, monitoring, and analytics. 
            They're designed for complex, multi-step business processes.
          </p>

          <h3>Integration Platforms</h3>
          <p>
            These tools focus on connecting different systems and applications, enabling 
            data flow and process automation across your entire technology stack. 
            They're essential for creating end-to-end automated workflows.
          </p>
        </ContentSection>

        <AffiliateSection>
          <h4>Recommended Business Automation Tools</h4>
          <p>
            Ready to start automating your business processes? Here are the top-rated 
            platforms for business automation services:
          </p>
          <a 
            href="https://zapier.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="affiliate-link"
          >
            <FiZap />
            Explore Zapier Business Automation
          </a>
        </AffiliateSection>

        <CTA>
          <h3>Ready to Automate Your Business Processes?</h3>
          <p>
            Our business automation services can help you identify, design, and implement 
            automation solutions that deliver measurable results. Get started with a 
            free process assessment today.
          </p>
          <div className="buttons">
            <Button to="/contact" className="primary">
              <FiArrowRight />
              Get Free Assessment
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

export default BusinessProcessAutomation;

