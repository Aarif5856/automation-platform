import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageCircle, FiSend, FiX, FiUser, FiZap } from 'react-icons/fi';

const ChatbotContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
`;

const ChatButton = styled(motion.button)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(59, 130, 246, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 25px rgba(59, 130, 246, 0.6);
  }

  .notification {
    position: absolute;
    top: -5px;
    right: -5px;
    background: #ef4444;
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }
`;

const ChatWindow = styled(motion.div)`
  position: absolute;
  bottom: 80px;
  right: 0;
  width: 350px;
  height: 500px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 480px) {
    width: 300px;
    height: 400px;
  }
`;

const ChatHeader = styled.div`
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .bot-info {
    display: flex;
    align-items: center;
    gap: 12px;

    .bot-avatar {
      width: 40px;
      height: 40px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
    }

    .bot-details {
      h3 {
        margin: 0;
        font-size: 16px;
        font-weight: 600;
      }

      p {
        margin: 0;
        font-size: 12px;
        opacity: 0.8;
      }
    }
  }

  .close-btn {
    background: none;
    border: none;
    color: white;
    font-size: 20px;
    cursor: pointer;
    padding: 5px;
    border-radius: 50%;
    transition: background 0.3s;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  }
`;

const ChatMessages = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f5f9;
  }

  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 2px;
  }
`;

const Message = styled(motion.div)`
  display: flex;
  gap: 12px;
  align-items: flex-start;

  &.user {
    flex-direction: row-reverse;

    .message-content {
      background: #3b82f6;
      color: white;
    }
  }

  &.bot {
    .message-content {
      background: #f8fafc;
      color: #374151;
      border: 1px solid #e2e8f0;
    }
  }
`;

const MessageAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  flex-shrink: 0;

  &.user {
    background: #3b82f6;
    color: white;
  }

  &.bot {
    background: #f0f9ff;
    color: #3b82f6;
  }
`;

const MessageContent = styled.div`
  max-width: 80%;
  padding: 12px 16px;
  border-radius: 18px;
  font-size: 14px;
  line-height: 1.4;
  word-wrap: break-word;

  .quick-actions {
    margin-top: 12px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .quick-action {
    background: rgba(59, 130, 246, 0.1);
    color: #3b82f6;
    border: 1px solid rgba(59, 130, 246, 0.2);
    padding: 6px 12px;
    border-radius: 12px;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background: #3b82f6;
      color: white;
    }
  }
`;

const ChatInput = styled.div`
  padding: 20px;
  border-top: 1px solid #e2e8f0;
  display: flex;
  gap: 12px;
  align-items: center;

  input {
    flex: 1;
    padding: 12px 16px;
    border: 1px solid #e2e8f0;
    border-radius: 25px;
    font-size: 14px;
    outline: none;
    transition: border-color 0.3s;

    &:focus {
      border-color: #3b82f6;
    }

    &::placeholder {
      color: #9ca3af;
    }
  }

  .send-btn {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #3b82f6;
    border: none;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;

    &:hover {
      background: #2563eb;
      transform: scale(1.05);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
    }
  }
`;

const TypingIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #64748b;
  font-size: 12px;
  font-style: italic;

  .dots {
    display: flex;
    gap: 2px;

    .dot {
      width: 4px;
      height: 4px;
      background: #64748b;
      border-radius: 50%;
      animation: typing 1.4s infinite ease-in-out;

      &:nth-child(1) { animation-delay: 0s; }
      &:nth-child(2) { animation-delay: 0.2s; }
      &:nth-child(3) { animation-delay: 0.4s; }
    }
  }

  @keyframes typing {
    0%, 60%, 100% { transform: translateY(0); }
    30% { transform: translateY(-10px); }
  }
`;

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef(null);

  // Pre-defined responses for common queries
  const botResponses = {
    greeting: [
      "Hello! I'm your AI assistant. How can I help you today?",
      "Hi there! I'm here to help with any questions about our automation services.",
      "Welcome! I can help you with pricing, features, or technical support."
    ],
    pricing: [
      "We have three main plans: Starter ($97/month), Pro ($197/month), and Enterprise ($497/month). Each includes different automation tools and support levels.",
      "Our pricing starts at $97/month for the Starter plan, which includes basic automation tools. The Pro plan at $197/month adds advanced features, and Enterprise at $497/month includes everything plus priority support.",
      "You can view our complete pricing on the Pricing page. All plans include a 30-day money-back guarantee!"
    ],
    features: [
      "Our automation tools include LinkedIn lead generation, email campaigns, website scraping, and analytics dashboards.",
      "We offer AI-powered profile filtering, automated messaging, warm-up engines, and multi-channel campaigns.",
      "Each plan includes different features - check out our Services page for a detailed breakdown of what's included."
    ],
    support: [
      "I'm here to help! For technical issues, I can assist with most common problems. For complex issues, I can escalate to our human support team.",
      "Pro and Enterprise customers get priority support with human agents and Zoom onboarding calls. I handle about 80% of queries automatically!",
      "Need immediate help? I can connect you with our support team or schedule a call with our automation experts."
    ],
    technical: [
      "For technical setup, I recommend starting with our video tutorials. They're personalized based on your plan and experience level.",
      "Most technical issues can be resolved by checking our knowledge base or watching the setup videos. I can guide you through the process step by step.",
      "If you're stuck on something technical, I can walk you through it or connect you with our technical support team."
    ],
    default: [
      "I understand you're asking about that. Let me help you find the right information.",
      "That's a great question! I can provide some general guidance, but for specific details, I'd recommend checking our documentation or contacting support.",
      "I'm here to help! While I can assist with most common questions, our human support team can provide more detailed assistance if needed."
    ]
  };

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 1,
          type: 'bot',
          content: "Hello! I'm your AI assistant. How can I help you with our automation services today?",
          timestamp: new Date()
        }
      ]);
    }
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle quick actions
  const handleQuickAction = (action) => {
    setInputValue(action);
    handleSendMessage();
  };

  // Send message function
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response = generateBotResponse(inputValue.toLowerCase());
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  };

  // Generate bot response based on user input
  const generateBotResponse = (input) => {
    const responses = botResponses;
    
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return responses.greeting[Math.floor(Math.random() * responses.greeting.length)];
    }
    
    if (input.includes('price') || input.includes('cost') || input.includes('plan')) {
      return responses.pricing[Math.floor(Math.random() * responses.pricing.length)];
    }
    
    if (input.includes('feature') || input.includes('tool') || input.includes('automation')) {
      return responses.features[Math.floor(Math.random() * responses.features.length)];
    }
    
    if (input.includes('support') || input.includes('help') || input.includes('issue')) {
      return responses.support[Math.floor(Math.random() * responses.support.length)];
    }
    
    if (input.includes('technical') || input.includes('setup') || input.includes('tutorial')) {
      return responses.technical[Math.floor(Math.random() * responses.technical.length)];
    }
    
    return responses.default[Math.floor(Math.random() * responses.default.length)];
  };

  // Handle enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Toggle chat window
  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setUnreadCount(0);
    }
  };

  // Quick action buttons
  const quickActions = [
    "What are your pricing plans?",
    "What features do you offer?",
    "How do I get started?",
    "I need technical support"
  ];

  return (
    <ChatbotContainer>
      <ChatButton
        onClick={toggleChat}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FiMessageCircle />
        {unreadCount > 0 && (
          <div className="notification">{unreadCount}</div>
        )}
      </ChatButton>

      <AnimatePresence>
        {isOpen && (
          <ChatWindow
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <ChatHeader>
              <div className="bot-info">
                <div className="bot-avatar">
                  <FiZap />
                </div>
                <div className="bot-details">
                  <h3>AI Assistant</h3>
                  <p>Online • Ready to help</p>
                </div>
              </div>
              <button className="close-btn" onClick={toggleChat}>
                <FiX />
              </button>
            </ChatHeader>

            <ChatMessages>
              {messages.map((message) => (
                <Message
                  key={message.id}
                  className={message.type}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <MessageAvatar className={message.type}>
                    {message.type === 'user' ? <FiUser /> : <FiZap />}
                  </MessageAvatar>
                  <MessageContent>
                    {message.content}
                    {message.type === 'bot' && message.id === messages[messages.length - 1]?.id && (
                      <div className="quick-actions">
                        {quickActions.map((action, index) => (
                          <button
                            key={index}
                            className="quick-action"
                            onClick={() => handleQuickAction(action)}
                          >
                            {action}
                          </button>
                        ))}
                      </div>
                    )}
                  </MessageContent>
                </Message>
              ))}

              {isTyping && (
                <Message className="bot">
                  <MessageAvatar className="bot">
                    <FiZap />
                  </MessageAvatar>
                  <MessageContent>
                    <TypingIndicator>
                      AI is typing
                      <div className="dots">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                      </div>
                    </TypingIndicator>
                  </MessageContent>
                </Message>
              )}

              <div ref={messagesEndRef} />
            </ChatMessages>

            <ChatInput>
              <input
                type="text"
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isTyping}
              />
              <button
                className="send-btn"
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
              >
                <FiSend />
              </button>
            </ChatInput>
          </ChatWindow>
        )}
      </AnimatePresence>
    </ChatbotContainer>
  );
};

export default AIChatbot;
