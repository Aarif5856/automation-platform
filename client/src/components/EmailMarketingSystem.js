import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FiMail, 
  FiUsers, 
  FiTrendingUp, 
  FiTarget, 
  FiZap, 
  FiBarChart,
  FiPlay,
  FiPause,
  FiEdit,
  FiTrash2,
  FiEye,
  FiSend
} from 'react-icons/fi';
import toast from 'react-hot-toast';

const EmailMarketingContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;

  h2 {
    color: #1f2937;
    font-size: 2rem;
    font-weight: 700;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .stats {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .stat {
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-weight: 600;
    font-size: 0.9rem;
  }
`;

const CampaignGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const CampaignCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e5e7eb;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }

  .status {
    position: absolute;
    top: 1rem;
    right: 1rem;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;

    &.active {
      background: #d1fae5;
      color: #065f46;
    }

    &.paused {
      background: #fef3c7;
      color: #92400e;
    }

    &.draft {
      background: #e5e7eb;
      color: #374151;
    }
  }

  .campaign-header {
    margin-bottom: 1rem;

    h3 {
      color: #1f2937;
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0 0 0.5rem 0;
    }

    p {
      color: #6b7280;
      font-size: 0.9rem;
      margin: 0;
    }
  }

  .metrics {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-bottom: 1rem;

    .metric {
      text-align: center;

      .value {
        font-size: 1.5rem;
        font-weight: 700;
        color: #1f2937;
        margin-bottom: 0.25rem;
      }

      .label {
        font-size: 0.8rem;
        color: #6b7280;
        font-weight: 500;
      }
    }
  }

  .actions {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;

    button {
      padding: 0.5rem 1rem;
      border-radius: 6px;
      border: none;
      font-weight: 600;
      font-size: 0.8rem;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.25rem;

      &.primary {
        background: #3b82f6;
        color: white;

        &:hover {
          background: #2563eb;
        }
      }

      &.secondary {
        background: #f3f4f6;
        color: #374151;

        &:hover {
          background: #e5e7eb;
        }
      }

      &.danger {
        background: #fef2f2;
        color: #dc2626;

        &:hover {
          background: #fee2e2;
        }
      }
    }
  }
`;

const CreateCampaignButton = styled(motion.button)`
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 auto;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
  }
`;

const EmailMarketingSystem = () => {
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: 'Welcome Series',
      description: 'Onboard new users with 5-email sequence',
      status: 'active',
      subscribers: 1247,
      openRate: 68.5,
      clickRate: 12.3,
      conversionRate: 8.7,
      revenue: 15420
    },
    {
      id: 2,
      name: 'Product Launch',
      description: 'Announce new features and updates',
      status: 'active',
      subscribers: 892,
      openRate: 72.1,
      clickRate: 15.8,
      conversionRate: 11.2,
      revenue: 8930
    },
    {
      id: 3,
      name: 'Re-engagement',
      description: 'Win back inactive subscribers',
      status: 'paused',
      subscribers: 456,
      openRate: 45.2,
      clickRate: 8.9,
      conversionRate: 5.1,
      revenue: 2340
    },
    {
      id: 4,
      name: 'Holiday Promotion',
      description: 'Black Friday and holiday campaigns',
      status: 'draft',
      subscribers: 0,
      openRate: 0,
      clickRate: 0,
      conversionRate: 0,
      revenue: 0
    }
  ]);

  const [totalStats, setTotalStats] = useState({
    totalSubscribers: 2595,
    totalRevenue: 26690,
    avgOpenRate: 61.9,
    avgConversionRate: 8.3
  });

  const handleCampaignAction = (campaignId, action) => {
    switch (action) {
      case 'play':
        setCampaigns(campaigns.map(c => 
          c.id === campaignId ? { ...c, status: 'active' } : c
        ));
        toast.success('Campaign started!');
        break;
      case 'pause':
        setCampaigns(campaigns.map(c => 
          c.id === campaignId ? { ...c, status: 'paused' } : c
        ));
        toast.success('Campaign paused!');
        break;
      case 'edit':
        toast.success('Opening campaign editor...');
        break;
      case 'delete':
        setCampaigns(campaigns.filter(c => c.id !== campaignId));
        toast.success('Campaign deleted!');
        break;
      case 'view':
        toast.success('Opening campaign analytics...');
        break;
      default:
        break;
    }
  };

  const createNewCampaign = () => {
    toast.success('Opening campaign creator...');
  };

  return (
    <EmailMarketingContainer>
      <Header>
        <h2>
          <FiMail />
          Email Marketing Dashboard
        </h2>
        <div className="stats">
          <div className="stat">
            <FiUsers /> {totalStats.totalSubscribers.toLocaleString()} Subscribers
          </div>
          <div className="stat">
            <FiTrendingUp /> ${totalStats.totalRevenue.toLocaleString()} Revenue
          </div>
          <div className="stat">
            <FiTarget /> {totalStats.avgOpenRate}% Avg Open Rate
          </div>
        </div>
      </Header>

      <CampaignGrid>
        {campaigns.map((campaign, index) => (
          <CampaignCard
            key={campaign.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className={`status ${campaign.status}`}>
              {campaign.status.toUpperCase()}
            </div>

            <div className="campaign-header">
              <h3>{campaign.name}</h3>
              <p>{campaign.description}</p>
            </div>

            <div className="metrics">
              <div className="metric">
                <div className="value">{campaign.subscribers.toLocaleString()}</div>
                <div className="label">Subscribers</div>
              </div>
              <div className="metric">
                <div className="value">{campaign.openRate}%</div>
                <div className="label">Open Rate</div>
              </div>
              <div className="metric">
                <div className="value">{campaign.clickRate}%</div>
                <div className="label">Click Rate</div>
              </div>
              <div className="metric">
                <div className="value">${campaign.revenue.toLocaleString()}</div>
                <div className="label">Revenue</div>
              </div>
            </div>

            <div className="actions">
              {campaign.status === 'active' ? (
                <button 
                  className="secondary"
                  onClick={() => handleCampaignAction(campaign.id, 'pause')}
                >
                  <FiPause /> Pause
                </button>
              ) : (
                <button 
                  className="primary"
                  onClick={() => handleCampaignAction(campaign.id, 'play')}
                >
                  <FiPlay /> Start
                </button>
              )}
              
              <button 
                className="secondary"
                onClick={() => handleCampaignAction(campaign.id, 'edit')}
              >
                <FiEdit /> Edit
              </button>
              
              <button 
                className="secondary"
                onClick={() => handleCampaignAction(campaign.id, 'view')}
              >
                <FiEye /> View
              </button>
              
              <button 
                className="danger"
                onClick={() => handleCampaignAction(campaign.id, 'delete')}
              >
                <FiTrash2 /> Delete
              </button>
            </div>
          </CampaignCard>
        ))}
      </CampaignGrid>

      <CreateCampaignButton
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={createNewCampaign}
      >
        <FiSend />
        Create New Campaign
      </CreateCampaignButton>
    </EmailMarketingContainer>
  );
};

export default EmailMarketingSystem;
