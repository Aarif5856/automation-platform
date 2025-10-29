import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FiRepeat, 
  FiTrendingUp, 
  FiUsers, 
  FiZap, 
  FiArrowRight,
  FiClock,
  FiTarget,
  FiBarChart,
  FiSettings,
  FiLayout,
  FiCheckCircle
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

const WorkflowAutomation = () => {
  return (
    <PageContainer>
      <Header>
        <HeaderContent>
          <Breadcrumb>
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/services">Services</Link>
            <span>/</span>
            <span>Workflow Automation</span>
          </Breadcrumb>

          <Title
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Workflow Automation: Ultimate Guide to Streamline Your Business 2024
          </Title>

          <Subtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Learn how to automate repetitive workflows, eliminate bottlenecks, and increase 
            team productivity by 75% with proven workflow automation strategies and tools.
          </Subtitle>

          <MetaInfo>
            <MetaItem>
              <FiClock />
              <span>14 min read</span>
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
            <FiRepeat />
            Understanding Workflow Automation
          </h2>
          
          <p>
            Workflow automation is the process of designing and implementing technology-driven 
            systems to execute recurring business tasks and processes with minimal human 
            intervention. By automating workflows, organizations can reduce manual errors, 
            accelerate processing times, and free up employees to focus on strategic, 
            high-value activities.
          </p>

          <p>
            Modern workflow automation goes beyond simple task automation. It involves 
            creating intelligent systems that can handle complex multi-step processes, 
            make conditional decisions, integrate with multiple applications, and adapt 
            to changing business requirements. The result is a more efficient, agile, 
            and scalable organization.
          </p>

          <StatsGrid>
            <StatCard>
              <div className="icon">
                <FiTrendingUp />
              </div>
              <div className="number">75%</div>
              <div className="label">Productivity Increase</div>
            </StatCard>
            <StatCard>
              <div className="icon">
                <FiCheckCircle />
              </div>
              <div className="number">90%</div>
              <div className="label">Error Reduction</div>
            </StatCard>
            <StatCard>
              <div className="icon">
                <FiClock />
              </div>
              <div className="number">40hrs</div>
              <div className="label">Time Saved/Week</div>
            </StatCard>
            <StatCard>
              <div className="icon">
                <FiUsers />
              </div>
              <div className="number">95%</div>
              <div className="label">Employee Satisfaction</div>
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
            Key Benefits of Workflow Automation
          </h2>

          <h3>1. Dramatic Time Savings</h3>
          <p>
            Organizations implementing workflow automation report saving an average of 
            40 hours per week on routine tasks. This time can be redirected toward 
            innovation, customer engagement, and strategic initiatives that drive growth.
          </p>

          <h3>2. Enhanced Accuracy and Consistency</h3>
          <p>
            Automated workflows eliminate human error and ensure that every process is 
            executed exactly the same way every time. This consistency is crucial for 
            maintaining quality standards and meeting compliance requirements.
          </p>

          <h3>3. Improved Visibility and Control</h3>
          <p>
            Workflow automation platforms provide real-time visibility into process status, 
            bottlenecks, and performance metrics. Managers can track progress, identify 
            issues early, and make data-driven decisions to optimize operations.
          </p>

          <h3>4. Better Collaboration and Communication</h3>
          <p>
            Automated workflows ensure that the right information reaches the right people 
            at the right time. Team members receive automatic notifications, handoffs are 
            seamless, and everyone stays aligned on project status and priorities.
          </p>

          <h3>5. Scalability Without Complexity</h3>
          <p>
            As your business grows, automated workflows can handle increased volume without 
            requiring proportional increases in staff. Processes that would overwhelm manual 
            systems run smoothly when automated.
          </p>

          <HighlightBox>
            <h4>ROI Example</h4>
            <p>
              A mid-sized company automated their invoice approval workflow, reducing 
              processing time from 5 days to 4 hours. This resulted in $180,000 annual 
              savings, improved vendor relationships, and early payment discounts worth 
              an additional $45,000 per year.
            </p>
          </HighlightBox>
        </ContentSection>

        <ContentSection
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2>
            <FiLayout />
            Common Workflows to Automate
          </h2>

          <h3>Employee Onboarding and Offboarding</h3>
          <p>
            Automate the entire employee lifecycle from offer letter generation to equipment 
            provisioning, system access setup, training enrollment, and exit procedures. 
            This ensures consistent experiences and reduces HR administrative burden by 70%.
          </p>

          <h3>Document Approval Processes</h3>
          <p>
            Route documents through approval chains automatically based on type, amount, 
            or department. Track status in real-time, send reminders for pending approvals, 
            and maintain complete audit trails for compliance.
          </p>

          <h3>Customer Service Ticket Management</h3>
          <p>
            Automatically categorize, prioritize, and route support tickets to the appropriate 
            teams. Escalate urgent issues, send status updates to customers, and collect 
            feedback after resolution—all without manual intervention.
          </p>

          <h3>Sales Pipeline Management</h3>
          <p>
            Automate lead assignment, follow-up reminders, proposal generation, contract 
            routing, and deal closing procedures. Keep your CRM updated automatically and 
            ensure no opportunities fall through the cracks.
          </p>

          <h3>Inventory and Order Management</h3>
          <p>
            Trigger reorder workflows when stock levels drop, automatically generate purchase 
            orders, track shipments, update inventory systems, and notify relevant teams of 
            stock changes.
          </p>

          <h3>Content Approval and Publishing</h3>
          <p>
            Route content through review and approval stages, check for compliance and brand 
            guidelines, schedule publication across multiple channels, and track performance 
            metrics automatically.
          </p>
        </ContentSection>

        <ContentSection
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <h2>
            <FiSettings />
            Building Effective Automated Workflows
          </h2>

          <h3>Step 1: Process Discovery and Documentation</h3>
          <p>
            Start by mapping your current processes in detail. Document every step, decision 
            point, stakeholder, and system involved. Look for bottlenecks, redundancies, and 
            opportunities for improvement. The best candidates for automation are processes 
            that are:
          </p>
          <ul>
            <li>Repetitive and rule-based</li>
            <li>High-volume and time-consuming</li>
            <li>Prone to human error</li>
            <li>Well-documented with clear steps</li>
            <li>Consistent in execution</li>
          </ul>

          <h3>Step 2: Workflow Design and Optimization</h3>
          <p>
            Before automating, optimize the process. Eliminate unnecessary steps, simplify 
            decision trees, and streamline handoffs. Design your automated workflow to be:
          </p>
          <ul>
            <li><strong>Clear:</strong> Each step has a defined purpose and outcome</li>
            <li><strong>Logical:</strong> The flow follows natural business logic</li>
            <li><strong>Flexible:</strong> Can handle exceptions and edge cases</li>
            <li><strong>Measurable:</strong> Key metrics can be tracked and analyzed</li>
          </ul>

          <h3>Step 3: Tool Selection and Integration</h3>
          <p>
            Choose a workflow automation platform that integrates with your existing systems. 
            Consider factors like ease of use, scalability, integration capabilities, and 
            support for complex logic. Popular platforms include Zapier, Microsoft Power 
            Automate, and custom-built solutions.
          </p>

          <h3>Step 4: Implementation and Testing</h3>
          <p>
            Build your workflow in stages, testing thoroughly at each step. Start with a 
            pilot group to identify issues before full deployment. Ensure proper error 
            handling, notification systems, and fallback procedures are in place.
          </p>

          <h3>Step 5: Training and Change Management</h3>
          <p>
            Prepare your team for the new automated workflows. Provide training, documentation, 
            and ongoing support. Address concerns about job security by emphasizing how 
            automation frees them for more meaningful work.
          </p>

          <h3>Step 6: Monitoring and Continuous Improvement</h3>
          <p>
            Track workflow performance metrics, gather user feedback, and identify opportunities 
            for refinement. Successful workflow automation is an ongoing process of optimization 
            and enhancement.
          </p>

          <HighlightBox>
            <h4>Best Practice: Start Small, Scale Fast</h4>
            <p>
              Begin with one high-impact, low-complexity workflow. Demonstrate success, 
              learn from the experience, and then rapidly expand to other processes. 
              This approach builds organizational confidence and momentum.
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
            Measuring Workflow Automation Success
          </h2>

          <h3>Process Efficiency Metrics</h3>
          <ul>
            <li><strong>Cycle Time:</strong> Time from workflow initiation to completion</li>
            <li><strong>Throughput:</strong> Number of processes completed per time period</li>
            <li><strong>Bottleneck Identification:</strong> Steps causing delays or backlogs</li>
            <li><strong>Resource Utilization:</strong> How efficiently resources are being used</li>
          </ul>

          <h3>Quality Metrics</h3>
          <ul>
            <li><strong>Error Rate:</strong> Percentage of processes with errors or exceptions</li>
            <li><strong>Rework Rate:</strong> How often processes need to be redone</li>
            <li><strong>Compliance Rate:</strong> Adherence to policies and regulations</li>
            <li><strong>First-Time-Right Rate:</strong> Processes completed correctly on first attempt</li>
          </ul>

          <h3>Business Impact Metrics</h3>
          <ul>
            <li><strong>Cost Savings:</strong> Reduction in operational costs</li>
            <li><strong>Time Savings:</strong> Hours saved through automation</li>
            <li><strong>Customer Satisfaction:</strong> Impact on customer experience scores</li>
            <li><strong>Employee Satisfaction:</strong> Staff engagement and job satisfaction</li>
            <li><strong>ROI:</strong> Return on automation investment</li>
          </ul>
        </ContentSection>

        <AffiliateSection>
          <h4>Recommended Workflow Automation Tools</h4>
          <p>
            Ready to automate your workflows? Here are the top-rated platforms for 
            business workflow automation:
          </p>
          <a 
            href="https://zapier.com?utm_source=automatepro&utm_medium=affiliate&utm_campaign=workflow_automation&utm_content=seo_page" 
            target="_blank"
            rel="noopener noreferrer"
            className="affiliate-link"
            onClick={() => {
              // Track affiliate click
              if (window.gtag) {
                window.gtag('event', 'affiliate_click', {
                  'affiliate_provider': 'zapier',
                  'page': 'workflow_automation',
                  'link_text': 'Explore Zapier Workflow Automation'
                });
              }
            }}
          >
            <FiZap />
            Explore Zapier Workflow Automation
          </a>
        </AffiliateSection>

        <CTA>
          <h3>Ready to Automate Your Workflows?</h3>
          <p>
            Our business automation services can help you design, implement, and optimize 
            workflows that drive real results. Get started with a free workflow assessment today.
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

export default WorkflowAutomation;
