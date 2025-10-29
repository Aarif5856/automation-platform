import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiPlay, FiClock, FiUser, FiZap, FiCheckCircle, FiDownload } from 'react-icons/fi';

const TutorialsContainer = styled.div`
  padding: 60px 0;
  background: #f8fafc;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 60px;

  h2 {
    font-size: 2.5rem;
    font-weight: 800;
    color: #1f2937;
    margin-bottom: 16px;
  }

  p {
    color: #64748b;
    font-size: 1.1rem;
    max-width: 600px;
    margin: 0 auto;
  }
`;

const PlanSelector = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 40px;
  flex-wrap: wrap;

  .plan-btn {
    padding: 12px 24px;
    border: 2px solid #e2e8f0;
    background: white;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s;
    font-weight: 600;
    color: #64748b;

    &.active {
      border-color: #3b82f6;
      background: #3b82f6;
      color: white;
    }

    &:hover {
      border-color: #3b82f6;
      color: #3b82f6;
    }
  }
`;

const TutorialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
`;

const TutorialCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
  position: relative;
  overflow: hidden;

  &.premium {
    border: 2px solid #f59e0b;
    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);

    &::before {
      content: 'PRO';
      position: absolute;
      top: 20px;
      right: 20px;
      background: #f59e0b;
      color: white;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 700;
    }
  }

  &.enterprise {
    border: 2px solid #8b5cf6;
    background: linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%);

    &::before {
      content: 'ENTERPRISE';
      position: absolute;
      top: 20px;
      right: 20px;
      background: #8b5cf6;
      color: white;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 700;
    }
  }
`;

const VideoThumbnail = styled.div`
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 48px;
  margin-bottom: 20px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    transform: scale(1.02);
  }

  .play-overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.7);
    border-radius: 50%;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
  }

  .duration {
    position: absolute;
    bottom: 12px;
    right: 12px;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
  }
`;

const TutorialInfo = styled.div`
  h3 {
    font-size: 1.25rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 8px;
  }

  p {
    color: #64748b;
    font-size: 0.9rem;
    line-height: 1.5;
    margin-bottom: 16px;
  }
`;

const TutorialMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
  font-size: 0.8rem;
  color: #64748b;

  .meta-item {
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;

const TutorialActions = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;

  .watch-btn {
    flex: 1;
    background: #3b82f6;
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.3s;

    &:hover {
      background: #2563eb;
      transform: translateY(-1px);
    }
  }

  .download-btn {
    background: transparent;
    color: #3b82f6;
    border: 1px solid #3b82f6;
    padding: 12px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background: #3b82f6;
      color: white;
    }
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: #e2e8f0;
  border-radius: 2px;
  margin-bottom: 16px;
  overflow: hidden;

  .progress {
    height: 100%;
    background: linear-gradient(90deg, #3b82f6, #8b5cf6);
    border-radius: 2px;
    transition: width 0.3s;
  }
`;

const VideoTutorials = () => {
  const [selectedPlan, setSelectedPlan] = useState('all');

  const tutorials = [
    {
      id: 1,
      title: 'Getting Started with Automation',
      description: 'Learn the basics of our automation platform and how to set up your first campaign.',
      duration: '12:30',
      difficulty: 'Beginner',
      plan: 'all',
      completed: true,
      progress: 100
    },
    {
      id: 2,
      title: 'LinkedIn Lead Generation Setup',
      description: 'Master the art of LinkedIn automation with our step-by-step guide.',
      duration: '18:45',
      difficulty: 'Intermediate',
      plan: 'pro',
      completed: false,
      progress: 65
    },
    {
      id: 3,
      title: 'Email Campaign Optimization',
      description: 'Advanced techniques for maximizing email deliverability and open rates.',
      duration: '25:20',
      difficulty: 'Advanced',
      plan: 'pro',
      completed: false,
      progress: 0
    },
    {
      id: 4,
      title: 'Website Scraping Mastery',
      description: 'Learn to extract valuable data from any website with our scraping tools.',
      duration: '22:15',
      difficulty: 'Intermediate',
      plan: 'enterprise',
      completed: false,
      progress: 0
    },
    {
      id: 5,
      title: 'Analytics Dashboard Deep Dive',
      description: 'Understand your data and optimize your campaigns for maximum ROI.',
      duration: '16:30',
      difficulty: 'Intermediate',
      plan: 'pro',
      completed: false,
      progress: 30
    },
    {
      id: 6,
      title: 'White-Label Setup & Branding',
      description: 'Customize the platform with your own branding and resell to clients.',
      duration: '35:45',
      difficulty: 'Advanced',
      plan: 'enterprise',
      completed: false,
      progress: 0
    },
    {
      id: 7,
      title: 'API Integration Guide',
      description: 'Connect our platform with your existing tools and workflows.',
      duration: '28:10',
      difficulty: 'Advanced',
      plan: 'enterprise',
      completed: false,
      progress: 0
    },
    {
      id: 8,
      title: 'Troubleshooting Common Issues',
      description: 'Quick fixes for the most common problems you might encounter.',
      duration: '14:25',
      difficulty: 'Beginner',
      plan: 'all',
      completed: true,
      progress: 100
    }
  ];

  const filteredTutorials = selectedPlan === 'all' 
    ? tutorials 
    : tutorials.filter(tutorial => tutorial.plan === selectedPlan || tutorial.plan === 'all');

  const handleWatchTutorial = (tutorialId) => {
    // In a real app, this would open the video player
    alert(`Opening tutorial: ${tutorials.find(t => t.id === tutorialId)?.title}`);
  };

  const handleDownloadTutorial = (tutorialId) => {
    // In a real app, this would download the tutorial materials
    alert(`Downloading materials for: ${tutorials.find(t => t.id === tutorialId)?.title}`);
  };

  return (
    <TutorialsContainer>
      <Container>
        <Header>
          <h2>Video Tutorials</h2>
          <p>
            Personalized learning paths based on your plan. Master automation with our 
            comprehensive video library and step-by-step guides.
          </p>
        </Header>

        <PlanSelector>
          <button
            className={`plan-btn ${selectedPlan === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedPlan('all')}
          >
            All Tutorials
          </button>
          <button
            className={`plan-btn ${selectedPlan === 'pro' ? 'active' : ''}`}
            onClick={() => setSelectedPlan('pro')}
          >
            Pro Plan
          </button>
          <button
            className={`plan-btn ${selectedPlan === 'enterprise' ? 'active' : ''}`}
            onClick={() => setSelectedPlan('enterprise')}
          >
            Enterprise
          </button>
        </PlanSelector>

        <TutorialsGrid>
          {filteredTutorials.map((tutorial, index) => (
            <TutorialCard
              key={tutorial.id}
              className={tutorial.plan}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <VideoThumbnail onClick={() => handleWatchTutorial(tutorial.id)}>
                <div className="play-overlay">
                  <FiPlay />
                </div>
                <div className="duration">{tutorial.duration}</div>
              </VideoThumbnail>

              <TutorialInfo>
                <h3>{tutorial.title}</h3>
                <p>{tutorial.description}</p>
              </TutorialInfo>

              <TutorialMeta>
                <div className="meta-item">
                  <FiClock />
                  {tutorial.duration}
                </div>
                <div className="meta-item">
                  <FiUser />
                  {tutorial.difficulty}
                </div>
                <div className="meta-item">
                  <FiZap />
                  {tutorial.plan === 'all' ? 'All Plans' : tutorial.plan.toUpperCase()}
                </div>
              </TutorialMeta>

              {tutorial.progress > 0 && (
                <ProgressBar>
                  <div 
                    className="progress" 
                    style={{ width: `${tutorial.progress}%` }}
                  />
                </ProgressBar>
              )}

              <TutorialActions>
                <button
                  className="watch-btn"
                  onClick={() => handleWatchTutorial(tutorial.id)}
                >
                  {tutorial.completed ? (
                    <>
                      <FiCheckCircle />
                      Watch Again
                    </>
                  ) : (
                    <>
                      <FiPlay />
                      {tutorial.progress > 0 ? 'Continue' : 'Start'}
                    </>
                  )}
                </button>
                <button
                  className="download-btn"
                  onClick={() => handleDownloadTutorial(tutorial.id)}
                  title="Download materials"
                >
                  <FiDownload />
                </button>
              </TutorialActions>
            </TutorialCard>
          ))}
        </TutorialsGrid>
      </Container>
    </TutorialsContainer>
  );
};

export default VideoTutorials;
