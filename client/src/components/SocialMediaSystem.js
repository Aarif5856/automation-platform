import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  FiLinkedin, 
  FiFacebook, 
  FiInstagram, 
  FiYoutube,
  FiSend,
  FiTrendingUp,
  FiUsers,
  FiEye,
  FiHeart,
  FiCalendar,
  FiBarChart,
  FiZap
} from 'react-icons/fi';
import { FaXTwitter } from 'react-icons/fa6';

const SocialMediaContainer = styled.div`
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

const PlatformTabs = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const Tab = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: 2px solid ${props => props.active ? '#3b82f6' : '#e5e7eb'};
  background: ${props => props.active ? '#3b82f6' : 'white'};
  color: ${props => props.active ? 'white' : '#374151'};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    border-color: #3b82f6;
    background: ${props => props.active ? '#2563eb' : '#f0f9ff'};
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

const PostCreator = styled.div`
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

  .form-group {
    margin-bottom: 1rem;

    label {
      display: block;
      color: #374151;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    input, textarea, select {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      font-size: 1rem;
      transition: all 0.3s ease;

      &:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      }
    }

    textarea {
      resize: vertical;
      min-height: 100px;
    }
  }

  .platform-selector {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;

    .platform {
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

      &.selected {
        border-color: #3b82f6;
        background: #f0f9ff;
        color: #3b82f6;
      }

      &:hover {
        border-color: #3b82f6;
      }
    }
  }

  .actions {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;

    button {
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      border: none;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;

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
    }
  }
`;

const AnalyticsPanel = styled.div`
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

  .metrics {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-bottom: 1rem;

    .metric {
      text-align: center;
      padding: 1rem;
      background: #f8fafc;
      border-radius: 8px;

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

  .recent-posts {
    .post {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.75rem;
      background: #f8fafc;
      border-radius: 8px;
      margin-bottom: 0.5rem;

      .platform-icon {
        width: 32px;
        height: 32px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 1rem;
      }

      .content {
        flex: 1;

        .text {
          font-weight: 500;
          color: #1f2937;
          margin-bottom: 0.25rem;
        }

        .stats {
          display: flex;
          gap: 1rem;
          font-size: 0.8rem;
          color: #6b7280;
        }
      }
    }
  }
`;

const SocialMediaSystem = () => {
  const [activePlatform, setActivePlatform] = useState('all');
  const [selectedPlatforms, setSelectedPlatforms] = useState(['x', 'linkedin']);
  const [postData, setPostData] = useState({
    content: '',
    image: '',
    hashtags: '',
    schedule: 'now'
  });

  const platforms = [
    { id: 'x', name: 'X', icon: <FaXTwitter />, color: '#000000' },
    { id: 'linkedin', name: 'LinkedIn', icon: <FiLinkedin />, color: '#0077b5' },
    { id: 'facebook', name: 'Facebook', icon: <FiFacebook />, color: '#1877f2' },
    { id: 'instagram', name: 'Instagram', icon: <FiInstagram />, color: '#e4405f' },
    { id: 'youtube', name: 'YouTube', icon: <FiYoutube />, color: '#ff0000' }
  ];

  const analytics = {
    totalReach: 45678,
    totalEngagement: 2345,
    totalPosts: 89,
    avgEngagement: 5.2
  };

  const recentPosts = [
    {
      id: 1,
      platform: 'x',
      content: 'Just generated 500+ leads in 1 hour with Automation Solutions! 🚀',
      reach: 1247,
      engagement: 89
    },
    {
      id: 2,
      platform: 'linkedin',
      content: 'Case study: How we helped a client generate $25k revenue...',
      reach: 2341,
      engagement: 156
    },
    {
      id: 3,
      platform: 'facebook',
      content: 'New feature alert: AI-powered email subject line generator!',
      reach: 892,
      engagement: 67
    }
  ];

  const handlePlatformToggle = (platformId) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(p => p !== platformId)
        : [...prev, platformId]
    );
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    console.log('Posting to:', selectedPlatforms, postData);
  };

  const handleInputChange = (e) => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <SocialMediaContainer>
      <Header>
        <h2>
          <FiZap />
          Social Media Campaign Manager
        </h2>
        <div className="stats">
          <div className="stat">
            <FiUsers /> {analytics.totalReach.toLocaleString()} Reach
          </div>
          <div className="stat">
            <FiTrendingUp /> {analytics.totalEngagement.toLocaleString()} Engagement
          </div>
            <div className="stat">
              <FiBarChart /> {analytics.avgEngagement}% Avg Rate
            </div>
        </div>
      </Header>

      <PlatformTabs>
        {platforms.map(platform => (
          <Tab
            key={platform.id}
            active={activePlatform === platform.id}
            onClick={() => setActivePlatform(platform.id)}
          >
            {platform.icon}
            {platform.name}
          </Tab>
        ))}
      </PlatformTabs>

      <ContentGrid>
        <PostCreator>
          <h3>Create New Post</h3>
          <form onSubmit={handlePostSubmit}>
            <div className="platform-selector">
              {platforms.map(platform => (
                <div
                  key={platform.id}
                  className={`platform ${selectedPlatforms.includes(platform.id) ? 'selected' : ''}`}
                  onClick={() => handlePlatformToggle(platform.id)}
                  style={{ borderColor: selectedPlatforms.includes(platform.id) ? platform.color : undefined }}
                >
                  {platform.icon}
                  {platform.name}
                </div>
              ))}
            </div>

            <div className="form-group">
              <label htmlFor="content">Post Content</label>
              <textarea
                id="content"
                name="content"
                value={postData.content}
                onChange={handleInputChange}
                placeholder="What's happening with your automation business?"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="hashtags">Hashtags</label>
              <input
                id="hashtags"
                name="hashtags"
                value={postData.hashtags}
                onChange={handleInputChange}
                placeholder="#automation #business #leads"
              />
            </div>

            <div className="form-group">
              <label htmlFor="schedule">Schedule</label>
              <select
                id="schedule"
                name="schedule"
                value={postData.schedule}
                onChange={handleInputChange}
              >
                <option value="now">Post Now</option>
                <option value="1hour">In 1 Hour</option>
                <option value="tomorrow">Tomorrow</option>
                <option value="custom">Custom Time</option>
              </select>
            </div>

            <div className="actions">
              <button type="submit" className="primary">
                <FiSend />
                Post Now
              </button>
              <button type="button" className="secondary">
                <FiCalendar />
                Schedule
              </button>
            </div>
          </form>
        </PostCreator>

        <AnalyticsPanel>
          <h3>Analytics Overview</h3>
          
          <div className="metrics">
            <div className="metric">
              <div className="value">{analytics.totalReach.toLocaleString()}</div>
              <div className="label">Total Reach</div>
            </div>
            <div className="metric">
              <div className="value">{analytics.totalEngagement.toLocaleString()}</div>
              <div className="label">Engagement</div>
            </div>
            <div className="metric">
              <div className="value">{analytics.totalPosts}</div>
              <div className="label">Posts</div>
            </div>
            <div className="metric">
              <div className="value">{analytics.avgEngagement}%</div>
              <div className="label">Avg Rate</div>
            </div>
          </div>

          <div className="recent-posts">
            <h4>Recent Posts</h4>
            {recentPosts.map(post => (
              <div key={post.id} className="post">
                <div 
                  className="platform-icon"
                  style={{ 
                    backgroundColor: platforms.find(p => p.id === post.platform)?.color 
                  }}
                >
                  {platforms.find(p => p.id === post.platform)?.icon}
                </div>
                <div className="content">
                  <div className="text">{post.content}</div>
                  <div className="stats">
                    <span><FiEye /> {post.reach}</span>
                    <span><FiHeart /> {post.engagement}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AnalyticsPanel>
      </ContentGrid>
    </SocialMediaContainer>
  );
};

export default SocialMediaSystem;
