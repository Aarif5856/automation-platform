import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FiUsers, 
  FiDollarSign, 
  FiTrendingUp, 
  FiShare2, 
  FiCopy, 
  FiCheck,
  FiAward,
  FiTarget
} from 'react-icons/fi';
import toast from 'react-hot-toast';

const AffiliateContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 2rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  h2 {
    color: #1f2937;
    font-size: 2rem;
    font-weight: 700;
    margin: 0 0 0.5rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
  }

  p {
    color: #6b7280;
    font-size: 1.1rem;
    margin: 0;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e5e7eb;
  text-align: center;

  .icon {
    width: 50px;
    height: 50px;
    border-radius: 12px;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem;
    color: white;
    font-size: 1.5rem;
  }

  .value {
    font-size: 2rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 0.5rem;
  }

  .label {
    color: #6b7280;
    font-size: 0.9rem;
    font-weight: 500;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const AffiliateProgram = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e5e7eb;

  h3 {
    color: #1f2937;
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0 0 1rem 0;
  }

  .program-features {
    margin-bottom: 1.5rem;

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

  .commission-tiers {
    margin-bottom: 1.5rem;

    .tier {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem;
      background: #f8fafc;
      border-radius: 8px;
      margin-bottom: 0.5rem;

      .tier-name {
        font-weight: 600;
        color: #1f2937;
      }

      .tier-rate {
        font-weight: 700;
        color: #3b82f6;
      }
    }
  }

  .cta-button {
    width: 100%;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
    }
  }
`;

const ReferralLinks = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e5e7eb;

  h3 {
    color: #1f2937;
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0 0 1rem 0;
  }

  .link-group {
    margin-bottom: 1.5rem;

    label {
      display: block;
      color: #374151;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .link-input {
      display: flex;
      gap: 0.5rem;

      input {
        flex: 1;
        padding: 0.75rem;
        border: 2px solid #e5e7eb;
        border-radius: 8px;
        font-size: 0.9rem;
        background: #f8fafc;
      }

      button {
        padding: 0.75rem;
        background: #3b82f6;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
          background: #2563eb;
        }
      }
    }
  }

  .social-share {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;

    button {
      padding: 0.5rem 1rem;
      border: 2px solid #e5e7eb;
      border-radius: 6px;
      background: white;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.25rem;
      font-size: 0.9rem;

      &:hover {
        border-color: #3b82f6;
        background: #f0f9ff;
      }
    }
  }
`;

const AffiliateList = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e5e7eb;

  h3 {
    color: #1f2937;
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0 0 1rem 0;
  }

  .affiliate-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: #f8fafc;
    border-radius: 8px;
    margin-bottom: 0.75rem;

    .affiliate-info {
      .name {
        font-weight: 600;
        color: #1f2937;
        margin-bottom: 0.25rem;
      }

      .email {
        color: #6b7280;
        font-size: 0.9rem;
      }
    }

    .affiliate-stats {
      text-align: right;

      .earnings {
        font-weight: 700;
        color: #10b981;
        margin-bottom: 0.25rem;
      }

      .referrals {
        color: #6b7280;
        font-size: 0.9rem;
      }
    }
  }
`;

const AffiliateSystem = () => {
  const [affiliateStats] = useState({
    totalAffiliates: 47,
    totalEarnings: 125430,
    totalReferrals: 892,
    conversionRate: 12.5
  });

  const [referralLinks] = useState({
    general: '#/ref/yourcode',
    starter: '#/ref/starter/yourcode',
    pro: '#/ref/pro/yourcode',
    enterprise: '#/ref/enterprise/yourcode'
  });

  const [affiliates] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      earnings: 15420,
      referrals: 23
    },
    {
      id: 2,
      name: 'Mike Chen',
      email: 'mike@example.com',
      earnings: 8930,
      referrals: 15
    },
    {
      id: 3,
      name: 'Emily Davis',
      email: 'emily@example.com',
      earnings: 2340,
      referrals: 8
    }
  ]);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Link copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };

  const shareToSocial = (platform) => {
    const text = `Join the Automation Solutions affiliate program and earn 30% commission! ${referralLinks.general}`;
    const url = encodeURIComponent(referralLinks.general);
    const encodedText = encodeURIComponent(text);
    
    let shareUrl = '';
    switch (platform) {
      case 'x':
        shareUrl = `https://x.com/intent/tweet?text=${encodedText}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      default:
        return;
    }
    
    window.open(shareUrl, '_blank');
  };

  return (
    <AffiliateContainer>
      <Header>
        <h2>
          <FiUsers />
          Affiliate Program
        </h2>
        <p>Recruit partners and earn 30% commission on every referral</p>
      </Header>

      <StatsGrid>
        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="icon">
            <FiUsers />
          </div>
          <div className="value">{affiliateStats.totalAffiliates}</div>
          <div className="label">Active Affiliates</div>
        </StatCard>

        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="icon">
            <FiDollarSign />
          </div>
          <div className="value">${affiliateStats.totalEarnings.toLocaleString()}</div>
          <div className="label">Total Earnings</div>
        </StatCard>

        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="icon">
            <FiTarget />
          </div>
          <div className="value">{affiliateStats.totalReferrals}</div>
          <div className="label">Total Referrals</div>
        </StatCard>

        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="icon">
            <FiTrendingUp />
          </div>
          <div className="value">{affiliateStats.conversionRate}%</div>
          <div className="label">Conversion Rate</div>
        </StatCard>
      </StatsGrid>

      <ContentGrid>
        <AffiliateProgram>
          <h3>Program Benefits</h3>
          
          <div className="program-features">
            <div className="feature">
              <FiCheck className="icon" />
              <span className="text">30% commission on all referrals</span>
            </div>
            <div className="feature">
              <FiCheck className="icon" />
              <span className="text">Real-time tracking and analytics</span>
            </div>
            <div className="feature">
              <FiCheck className="icon" />
              <span className="text">Marketing materials provided</span>
            </div>
            <div className="feature">
              <FiCheck className="icon" />
              <span className="text">Monthly payouts</span>
            </div>
            <div className="feature">
              <FiCheck className="icon" />
              <span className="text">Dedicated support team</span>
            </div>
          </div>

          <div className="commission-tiers">
            <h4>Commission Tiers</h4>
            <div className="tier">
              <span className="tier-name">Starter Plan</span>
              <span className="tier-rate">30%</span>
            </div>
            <div className="tier">
              <span className="tier-name">Pro Plan</span>
              <span className="tier-rate">30%</span>
            </div>
            <div className="tier">
              <span className="tier-name">Enterprise Plan</span>
              <span className="tier-rate">30%</span>
            </div>
          </div>

          <button className="cta-button">
            <FiAward />
            Join Affiliate Program
          </button>
        </AffiliateProgram>

        <ReferralLinks>
          <h3>Your Referral Links</h3>
          
          <div className="link-group">
            <label>General Link</label>
            <div className="link-input">
              <input value={referralLinks.general} readOnly />
              <button onClick={() => copyToClipboard(referralLinks.general)}>
                <FiCopy />
              </button>
            </div>
          </div>

          <div className="link-group">
            <label>Starter Plan Link</label>
            <div className="link-input">
              <input value={referralLinks.starter} readOnly />
              <button onClick={() => copyToClipboard(referralLinks.starter)}>
                <FiCopy />
              </button>
            </div>
          </div>

          <div className="link-group">
            <label>Pro Plan Link</label>
            <div className="link-input">
              <input value={referralLinks.pro} readOnly />
              <button onClick={() => copyToClipboard(referralLinks.pro)}>
                <FiCopy />
              </button>
            </div>
          </div>

          <div className="social-share">
            <button onClick={() => shareToSocial('x')}>
              <FiShare2 /> X
            </button>
            <button onClick={() => shareToSocial('linkedin')}>
              <FiShare2 /> LinkedIn
            </button>
            <button onClick={() => shareToSocial('facebook')}>
              <FiShare2 /> Facebook
            </button>
          </div>
        </ReferralLinks>
      </ContentGrid>

      <AffiliateList>
        <h3>Top Affiliates</h3>
        {affiliates.map(affiliate => (
          <div key={affiliate.id} className="affiliate-item">
            <div className="affiliate-info">
              <div className="name">{affiliate.name}</div>
              <div className="email">{affiliate.email}</div>
            </div>
            <div className="affiliate-stats">
              <div className="earnings">${affiliate.earnings.toLocaleString()}</div>
              <div className="referrals">{affiliate.referrals} referrals</div>
            </div>
          </div>
        ))}
      </AffiliateList>
    </AffiliateContainer>
  );
};

export default AffiliateSystem;
