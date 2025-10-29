import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FiPlay, 
  FiDownload,
  FiShare2,
  FiEye,
  FiThumbsUp,
  FiMessageCircle
} from 'react-icons/fi';

const VideoSystemContainer = styled.div`
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

const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const VideoCard = styled(motion.div)`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  position: relative;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15);
  }

  .video-thumbnail {
    position: relative;
    height: 200px;
    background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    overflow: hidden;

    .play-button {
      width: 80px;
      height: 80px;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      color: #3b82f6;
      transition: all 0.3s ease;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);

      &:hover {
        transform: scale(1.1);
        background: white;
      }
    }

    .duration {
      position: absolute;
      bottom: 1rem;
      right: 1rem;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 4px;
      font-size: 0.8rem;
      font-weight: 600;
    }

    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1));
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    &:hover .overlay {
      opacity: 1;
    }
  }

  .video-info {
    padding: 1.5rem;

    h3 {
      color: #1f2937;
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0 0 0.5rem 0;
    }

    p {
      color: #6b7280;
      font-size: 0.9rem;
      margin: 0 0 1rem 0;
      line-height: 1.5;
    }

    .stats {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;

      .stat {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        color: #6b7280;
        font-size: 0.8rem;
        font-weight: 500;
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
      }
    }
  }
`;

const CreateVideoButton = styled(motion.button)`
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

const DemoVideoSystem = () => {
  const [videos, setVideos] = useState([
    {
      id: 1,
      title: 'Platform Overview Demo',
      description: 'Complete walkthrough of Automation Solutions features and capabilities',
      duration: '5:32',
      views: 1247,
      likes: 89,
      comments: 23,
      thumbnail: '/api/placeholder/400/200',
      category: 'Overview'
    },
    {
      id: 2,
      title: 'Lead Generation Tutorial',
      description: 'Step-by-step guide to generating high-quality leads',
      duration: '8:15',
      views: 892,
      likes: 67,
      comments: 18,
      thumbnail: '/api/placeholder/400/200',
      category: 'Tutorial'
    },
    {
      id: 3,
      title: 'Email Campaign Setup',
      description: 'How to create and launch effective email campaigns',
      duration: '6:48',
      views: 654,
      likes: 45,
      comments: 12,
      thumbnail: '/api/placeholder/400/200',
      category: 'Tutorial'
    },
    {
      id: 4,
      title: 'Success Story: $25k Revenue',
      description: 'Real customer case study showing impressive results',
      duration: '4:22',
      views: 2103,
      likes: 156,
      comments: 34,
      thumbnail: '/api/placeholder/400/200',
      category: 'Case Study'
    },
    {
      id: 5,
      title: 'Advanced Automation Features',
      description: 'Deep dive into advanced automation capabilities',
      duration: '12:30',
      views: 456,
      likes: 32,
      comments: 8,
      thumbnail: '/api/placeholder/400/200',
      category: 'Advanced'
    },
    {
      id: 6,
      title: 'Mobile App Demo',
      description: 'Complete mobile app walkthrough and features',
      duration: '3:45',
      views: 789,
      likes: 54,
      comments: 15,
      thumbnail: '/api/placeholder/400/200',
      category: 'Mobile'
    }
  ]);

  const handleVideoAction = (videoId, action) => {
    switch (action) {
      case 'play':
        console.log(`Playing video ${videoId}`);
        break;
      case 'download':
        console.log(`Downloading video ${videoId}`);
        break;
      case 'share':
        console.log(`Sharing video ${videoId}`);
        break;
      case 'like':
        setVideos(videos.map(v => 
          v.id === videoId ? { ...v, likes: v.likes + 1 } : v
        ));
        break;
      default:
        break;
    }
  };

  const createNewVideo = () => {
    console.log('Creating new video...');
  };

  return (
    <VideoSystemContainer>
      <Header>
        <h2>
          <FiPlay />
          Demo Video Library
        </h2>
        <p>Showcase your platform with professional demo videos</p>
      </Header>

      <VideoGrid>
        {videos.map((video, index) => (
          <VideoCard
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div 
              className="video-thumbnail"
              onClick={() => handleVideoAction(video.id, 'play')}
            >
              <div className="play-button">
                <FiPlay />
              </div>
              <div className="duration">{video.duration}</div>
              <div className="overlay"></div>
            </div>

            <div className="video-info">
              <h3>{video.title}</h3>
              <p>{video.description}</p>

              <div className="stats">
                <div className="stat">
                  <FiEye /> {video.views.toLocaleString()} views
                </div>
                <div className="stat">
                  <FiThumbsUp /> {video.likes} likes
                </div>
                <div className="stat">
                  <FiMessageCircle /> {video.comments} comments
                </div>
              </div>

              <div className="actions">
                <button 
                  className="primary"
                  onClick={() => handleVideoAction(video.id, 'play')}
                >
                  <FiPlay /> Play
                </button>
                
                <button 
                  className="secondary"
                  onClick={() => handleVideoAction(video.id, 'download')}
                >
                  <FiDownload /> Download
                </button>
                
                <button 
                  className="secondary"
                  onClick={() => handleVideoAction(video.id, 'share')}
                >
                  <FiShare2 /> Share
                </button>
                
                <button 
                  className="secondary"
                  onClick={() => handleVideoAction(video.id, 'like')}
                >
                  <FiThumbsUp /> Like
                </button>
              </div>
            </div>
          </VideoCard>
        ))}
      </VideoGrid>

      <CreateVideoButton
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={createNewVideo}
      >
        <FiPlay />
        Create New Demo Video
      </CreateVideoButton>
    </VideoSystemContainer>
  );
};

export default DemoVideoSystem;
