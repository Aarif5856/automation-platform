import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import SupportSystem from '../components/SupportSystem';
import VideoTutorials from '../components/VideoTutorials';
import AIChatbot from '../components/AIChatbot';

const SupportPageContainer = styled.div`
  min-height: 100vh;
  background: #f8fafc;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, 
      rgba(59, 130, 246, 0.05) 0%, 
      rgba(139, 92, 246, 0.05) 25%, 
      rgba(236, 72, 153, 0.05) 50%, 
      rgba(59, 130, 246, 0.05) 75%, 
      rgba(139, 92, 246, 0.05) 100%);
    animation: glow-rotate 20s linear infinite;
    pointer-events: none;
    z-index: 0;
  }
`;

const Hero = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 120px 0 80px;
  text-align: center;
  color: white;
  position: relative;
  z-index: 1;

  h1 {
    font-size: 3rem;
    font-weight: 800;
    margin-bottom: 24px;

    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }

  p {
    font-size: 1.25rem;
    opacity: 0.9;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    padding: 80px 0 60px;
  }
`;

const Support = () => {
  return (
    <SupportPageContainer>
      <Hero>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Pro-Level Support</h1>
          <p>
            Get the help you need with our comprehensive support system. 
            AI-powered assistance, human experts, and priority support for Pro/Enterprise customers.
          </p>
        </motion.div>
      </Hero>

      <SupportSystem />
      <VideoTutorials />
      <AIChatbot />
    </SupportPageContainer>
  );
};

export default Support;
