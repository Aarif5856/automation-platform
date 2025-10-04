import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FiTrendingUp, 
  FiUsers, 
  FiDollarSign, 
  FiZap,
  FiDownload,
  FiPlay,
  FiSettings,
  FiBarChart,
  FiMail,
  FiSearch,
  FiTarget,
  FiCheckCircle,
  FiUpload,
  FiStar
} from 'react-icons/fi';
import EmailMarketingSystem from '../components/EmailMarketingSystem';
import DemoVideoSystem from '../components/DemoVideoSystem';
import SocialMediaSystem from '../components/SocialMediaSystem';
import AffiliateSystem from '../components/AffiliateSystem';

const DashboardContainer = styled.div`
  padding: 120px 0 80px;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
  min-height: 100vh;
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
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse"><path d="M 50 0 L 0 0 0 50" fill="none" stroke="%23ffffff" stroke-width="0.5" opacity="0.05"/></pattern></defs><rect width="100%" height="100%" fill="url(%23grid)"/></svg>');
    opacity: 0.3;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 1;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;

  .title-section {
    flex: 1;
  }

  h1 {
    font-size: 2.5rem;
    font-weight: 900;
    background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 8px;

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }

  p {
    color: #cbd5e1;
    font-size: 1.1rem;
    font-weight: 400;
    margin: 0;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
  margin-bottom: 60px;
`;

const StatCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 24px;
  padding: 40px;
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.1);
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
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
    border-radius: 24px;
  }

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(from 0deg, transparent, rgba(59, 130, 246, 0.1), transparent);
    animation: rotate 10s linear infinite;
    opacity: 0.3;
  }

  @keyframes rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 
      0 35px 70px rgba(0, 0, 0, 0.4),
      0 0 0 1px rgba(255, 255, 255, 0.2);
  }

  .content {
    position: relative;
    z-index: 1;
  }

  .icon {
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
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
    filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.5));
  }

  .value {
    font-size: 3rem;
    font-weight: 900;
    color: white;
    margin-bottom: 12px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .label {
    color: #cbd5e1;
    font-weight: 600;
    font-size: 1.1rem;
  }

  .change {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 16px;
    font-size: 1rem;
    font-weight: 700;

    &.positive {
      color: #10b981;
      text-shadow: 0 0 10px rgba(16, 185, 129, 0.3);
    }

    &.negative {
      color: #ef4444;
      text-shadow: 0 0 10px rgba(239, 68, 68, 0.3);
    }
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 40px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const Section = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;

  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 24px;
  }
`;

const AutomationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
`;

const AutomationCard = styled(motion.div)`
  background: #f8fafc;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #e2e8f0;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
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
    margin-bottom: 16px;
  }

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 8px;
  }

  p {
    color: #64748b;
    margin-bottom: 20px;
    line-height: 1.5;
  }

  .actions {
    display: flex;
    gap: 12px;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 0.9rem;

  &.primary {
    background: #3b82f6;
    color: white;
    border: none;

    &:hover {
      background: #2563eb;
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

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const QuickActionsHeader = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const ActionButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    padding: 0.6rem 1.2rem;
    font-size: 0.8rem;
  }
`;

const ChartsSection = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
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
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::after {
    opacity: 1;
  }
`;

const ChartTitle = styled.h3`
  color: #1f2937;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
`;

const ChartPlaceholder = styled.div`
  height: 200px;
  background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  font-size: 1.1rem;
  font-weight: 500;
`;

const InsightsSection = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
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
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::after {
    opacity: 1;
  }
`;

const InsightsTitle = styled.h3`
  color: #1f2937;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const InsightItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(99, 102, 241, 0.05);
  border-radius: 12px;
  margin-bottom: 0.75rem;
  border-left: 4px solid #6366f1;

  &:last-child {
    margin-bottom: 0;
  }
`;

const InsightIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
`;

const InsightText = styled.div`
  flex: 1;
`;

const InsightTitle = styled.div`
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.25rem;
`;

const InsightDescription = styled.div`
  color: #6b7280;
  font-size: 0.9rem;
`;

const QuickActions = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;

  h3 {
    font-size: 1.25rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 20px;
  }

  .action-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .action-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px;
    background: #f8fafc;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background: #e2e8f0;
    }

    .icon {
      color: #3b82f6;
      font-size: 18px;
    }

    span {
      color: #374151;
      font-weight: 500;
    }
  }
`;

const RecentActivity = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;

  h3 {
    font-size: 1.25rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 20px;
  }

  .activity-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .activity-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px;
    background: #f8fafc;
    border-radius: 8px;

    .icon {
      color: #10b981;
      font-size: 18px;
    }

    .content {
      flex: 1;

      .title {
        font-weight: 600;
        color: #1f2937;
        margin-bottom: 4px;
      }

      .time {
        font-size: 0.9rem;
        color: #64748b;
      }
    }
  }
`;

const Dashboard = () => {
  const [stats, setStats] = useState({
    revenue: 0,
    leads: 0,
    automations: 0,
    conversion: 0
  });

  const [insights] = useState([
    {
      icon: <FiTrendingUp />,
      title: "Best Performing Campaign",
      description: "LinkedIn Outreach generated 847 leads this month (+23%)"
    },
    {
      icon: <FiTarget />,
      title: "Optimization Opportunity",
      description: "Email campaigns could improve 15% with better subject lines"
    },
    {
      icon: <FiZap />,
      title: "Automation Suggestion",
      description: "Set up auto-follow-up sequence for new leads"
    }
  ]);

  const handleAutomationAction = (automationId, action) => {
    if (action === 'start') {
      alert(`Starting automation ${automationId}...`);
      // Here you would typically make an API call to start the automation
    } else if (action === 'settings') {
      alert(`Opening settings for automation ${automationId}...`);
      // Here you would typically navigate to settings or open a modal
    }
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case 'create':
        alert('Creating new automation...');
        // Navigate to create automation page
        break;
      case 'export':
        alert('Exporting leads...');
        // Trigger export functionality
        break;
      case 'analytics':
        alert('Opening analytics...');
        // Navigate to analytics page
        break;
      case 'settings':
        alert('Opening account settings...');
        // Navigate to settings page
        break;
      case 'campaign':
        alert('Starting new campaign...');
        // Navigate to campaign creation
        break;
      case 'import':
        alert('Importing leads...');
        // Navigate to lead import
        break;
      case 'verify':
        alert('Verifying emails...');
        // Navigate to email verification
        break;
      default:
        break;
    }
  };

  const automations = [
    {
      id: 1,
      name: 'LinkedIn Lead Generator',
      description: 'Extract high-quality leads from LinkedIn automatically',
      icon: <FiUsers />,
      status: 'active',
      leads: 1247
    },
    {
      id: 2,
      name: 'Email Campaign Manager',
      description: 'Automate your email marketing campaigns',
      icon: <FiMail />,
      status: 'active',
      leads: 892
    },
    {
      id: 3,
      name: 'Website Scraper',
      description: 'Extract data from any website automatically',
      icon: <FiSearch />,
      status: 'paused',
      leads: 456
    }
  ];

  const activities = [
    {
      title: 'LinkedIn Lead Generator completed',
      time: '2 hours ago',
      icon: <FiZap />
    },
    {
      title: 'New lead added to campaign',
      time: '4 hours ago',
      icon: <FiUsers />
    },
    {
      title: 'Email campaign sent',
      time: '6 hours ago',
      icon: <FiMail />
    },
    {
      title: 'Website scraper started',
      time: '8 hours ago',
      icon: <FiSearch />
    }
  ];

  useEffect(() => {
    // Simulate loading stats
    setTimeout(() => {
      setStats({
        revenue: 12450,
        leads: 2847,
        automations: 3,
        conversion: 12.5
      });
    }, 1000);
  }, []);

  return (
    <DashboardContainer>
      <Container>
        <Header>
          <div className="title-section">
            <h1>Welcome back! 👋</h1>
            <p>Here's what's happening with your automation business today.</p>
          </div>
          <QuickActionsHeader>
            <ActionButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleQuickAction('campaign')}
            >
              <FiPlay /> Start New Campaign
            </ActionButton>
            <ActionButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleQuickAction('import')}
            >
              <FiUpload /> Import Leads
            </ActionButton>
            <ActionButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleQuickAction('verify')}
            >
              <FiCheckCircle /> Verify Emails
            </ActionButton>
          </QuickActionsHeader>
        </Header>

        <StatsGrid>
          <StatCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="content">
              <div className="icon">
                <FiDollarSign />
              </div>
              <div className="value">${stats.revenue.toLocaleString()}</div>
              <div className="label">Total Revenue</div>
              <div className="change positive">
                <FiTrendingUp />
                +23% from last month
              </div>
            </div>
          </StatCard>

          <StatCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="content">
              <div className="icon">
                <FiUsers />
              </div>
              <div className="value">{stats.leads.toLocaleString()}</div>
              <div className="label">Leads Generated</div>
              <div className="change positive">
                <FiTrendingUp />
                +18% from last month
              </div>
            </div>
          </StatCard>

          <StatCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="content">
              <div className="icon">
                <FiZap />
              </div>
              <div className="value">{stats.automations}</div>
              <div className="label">Active Automations</div>
              <div className="change positive">
                <FiTrendingUp />
                +1 this week
              </div>
            </div>
          </StatCard>

          <StatCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="content">
              <div className="icon">
                <FiBarChart />
              </div>
              <div className="value">{stats.conversion}%</div>
              <div className="label">Conversion Rate</div>
              <div className="change positive">
                <FiTrendingUp />
                +2.1% from last month
              </div>
            </div>
          </StatCard>
        </StatsGrid>

        <ChartsSection>
          <ChartCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <ChartTitle>Revenue & Leads Trend</ChartTitle>
            <ChartPlaceholder>
              📊 Interactive Chart Coming Soon
            </ChartPlaceholder>
          </ChartCard>

          <ChartCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <ChartTitle>Campaign Performance</ChartTitle>
            <ChartPlaceholder>
              📈 Performance Metrics
            </ChartPlaceholder>
          </ChartCard>
        </ChartsSection>

        <InsightsSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <InsightsTitle>
            <FiStar /> Personalized Insights
          </InsightsTitle>
          {insights.map((insight, index) => (
            <InsightItem key={index}>
              <InsightIcon>{insight.icon}</InsightIcon>
              <InsightText>
                <InsightTitle>{insight.title}</InsightTitle>
                <InsightDescription>{insight.description}</InsightDescription>
              </InsightText>
            </InsightItem>
          ))}
        </InsightsSection>

        <EmailMarketingSystem />
        <DemoVideoSystem />
        <SocialMediaSystem />
        <AffiliateSystem />

        <ContentGrid>
          <MainContent>
            <Section>
              <h2>Your Automations</h2>
              <AutomationGrid>
                {automations.map((automation, index) => (
                  <AutomationCard
                    key={automation.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="icon">{automation.icon}</div>
                    <h3>{automation.name}</h3>
                    <p>{automation.description}</p>
                    <div className="actions">
                      <Button 
                        className="primary"
                        onClick={() => handleAutomationAction(automation.id, 'start')}
                      >
                        <FiPlay />
                        {automation.status === 'active' ? 'Running' : 'Start'}
                      </Button>
                      <Button 
                        className="secondary"
                        onClick={() => handleAutomationAction(automation.id, 'settings')}
                      >
                        <FiSettings />
                        Settings
                      </Button>
                    </div>
                  </AutomationCard>
                ))}
              </AutomationGrid>
            </Section>
          </MainContent>

          <Sidebar>
            <QuickActions>
              <h3>Quick Actions</h3>
              <div className="action-list">
                <div className="action-item" onClick={() => handleQuickAction('create')}>
                  <FiZap className="icon" />
                  <span>Create New Automation</span>
                </div>
                <div className="action-item" onClick={() => handleQuickAction('export')}>
                  <FiDownload className="icon" />
                  <span>Export Leads</span>
                </div>
                <div className="action-item" onClick={() => handleQuickAction('analytics')}>
                  <FiBarChart className="icon" />
                  <span>View Analytics</span>
                </div>
                <div className="action-item" onClick={() => handleQuickAction('settings')}>
                  <FiSettings className="icon" />
                  <span>Account Settings</span>
                </div>
              </div>
            </QuickActions>

            <RecentActivity>
              <h3>Recent Activity</h3>
              <div className="activity-list">
                {activities.map((activity, index) => (
                  <div key={index} className="activity-item">
                    <div className="icon">{activity.icon}</div>
                    <div className="content">
                      <div className="title">{activity.title}</div>
                      <div className="time">{activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </RecentActivity>
          </Sidebar>
        </ContentGrid>
      </Container>
    </DashboardContainer>
  );
};

export default Dashboard;
