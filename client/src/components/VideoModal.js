import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiPlay, FiExternalLink } from 'react-icons/fi';

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
`;

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: 20px;
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  overflow: hidden;
  position: relative;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    height: 300px;
  }
`;

const VideoPlayer = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1e3a8a, #3b82f6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  padding: 40px;

  .play-icon {
    width: 80px;
    height: 80px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    margin-bottom: 24px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: scale(1.1);
    }
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 16px;
  }

  p {
    font-size: 1rem;
    opacity: 0.9;
    margin-bottom: 24px;
    max-width: 400px;
  }

  .demo-buttons {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .demo-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    background: rgba(255, 255, 255, 0.2);
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 12px;
    color: white;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s;
    cursor: pointer;

    &:hover {
      background: rgba(255, 255, 255, 0.3);
      border-color: rgba(255, 255, 255, 0.5);
      transform: translateY(-2px);
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 50%;
  color: white;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  z-index: 10;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
    transform: scale(1.1);
  }
`;

const VideoInfo = styled.div`
  padding: 30px;
  background: #f8fafc;

  h4 {
    font-size: 1.25rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 12px;
  }

  p {
    color: #64748b;
    line-height: 1.6;
    margin-bottom: 20px;
  }

  .features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    margin-top: 20px;

    .feature {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #374151;
      font-size: 0.9rem;

      .icon {
        color: #10b981;
        font-size: 16px;
      }
    }
  }
`;

const VideoModal = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handlePlayDemo = () => {
    setIsPlaying(true);
    // In a real implementation, this would start the actual video
    // For now, we'll show a placeholder
  };

  const handleYouTubeDemo = () => {
    // Open YouTube demo in new tab - Replace with your actual demo video
    window.open('https://www.youtube.com/watch?v=your-demo-video-id', '_blank');
  };

  const handleGetStarted = () => {
    onClose();
    // Navigate to pricing or signup
    window.location.href = '/pricing';
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <ModalOverlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <ModalContent
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <CloseButton onClick={onClose}>
            <FiX />
          </CloseButton>

          <VideoContainer>
            {!isPlaying ? (
              <VideoPlayer>
                <div className="play-icon" onClick={handlePlayDemo}>
                  <FiPlay />
                </div>
                <h3>See AutomatePro in Action</h3>
                <p>
                  Watch how our automation system can transform your business 
                  and help you generate $30K+ monthly revenue.
                </p>
                <div className="demo-buttons">
                  <button className="demo-btn" onClick={handlePlayDemo}>
                    <FiPlay />
                    Play Demo
                  </button>
                  <a 
                    className="demo-btn" 
                    href="https://www.youtube.com/watch?v=your-demo-video-id" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <FiExternalLink />
                    Watch on YouTube
                  </a>
                </div>
              </VideoPlayer>
            ) : (
              <VideoPlayer>
                <div className="play-icon" onClick={() => setIsPlaying(false)}>
                  <FiPlay />
                </div>
                <h3>Demo Video Playing</h3>
                <p>
                  This is where your actual demo video would play. 
                  You can replace this with a real video file or embed.
                </p>
                <div className="demo-buttons">
                  <button className="demo-btn" onClick={handleGetStarted}>
                    Get Started Now
                  </button>
                  <a 
                    className="demo-btn" 
                    href="https://www.youtube.com/watch?v=your-demo-video-id" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <FiExternalLink />
                    Full Demo on YouTube
                  </a>
                </div>
              </VideoPlayer>
            )}
          </VideoContainer>

          <VideoInfo>
            <h4>What You'll Learn in This Demo</h4>
            <p>
              Our comprehensive demo shows you exactly how to set up and use 
              our automation tools to scale your business.
            </p>
            <div className="features">
              <div className="feature">
                <span className="icon">✓</span>
                Lead generation setup
              </div>
              <div className="feature">
                <span className="icon">✓</span>
                Email automation
              </div>
              <div className="feature">
                <span className="icon">✓</span>
                Social media automation
              </div>
              <div className="feature">
                <span className="icon">✓</span>
                Analytics dashboard
              </div>
              <div className="feature">
                <span className="icon">✓</span>
                ROI tracking
              </div>
              <div className="feature">
                <span className="icon">✓</span>
                Customer success stories
              </div>
            </div>
          </VideoInfo>
        </ModalContent>
      </ModalOverlay>
    </AnimatePresence>
  );
};

export default VideoModal;
