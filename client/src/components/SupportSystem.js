import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiMessageSquare, FiVideo, FiClock, FiUser, FiCheckCircle, FiSend, FiCalendar, FiHeadphones } from 'react-icons/fi';

const SupportContainer = styled.div`
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

const SupportGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
`;

const SupportCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
  text-align: center;
  position: relative;
  overflow: hidden;

  &.priority {
    border: 2px solid #f59e0b;
    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);

    &::before {
      content: 'PRIORITY';
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

  .icon {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 32px;
    margin: 0 auto 24px;
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 16px;
  }

  p {
    color: #64748b;
    line-height: 1.6;
    margin-bottom: 24px;
  }

  .features {
    text-align: left;
    margin-bottom: 24px;

    .feature {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
      color: #374151;
      font-size: 0.9rem;

      .check {
        color: #10b981;
        font-size: 16px;
      }
    }
  }

  .button {
    width: 100%;
    background: #3b82f6;
    color: white;
    border: none;
    padding: 16px 24px;
    border-radius: 12px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.3s;

    &:hover {
      background: #2563eb;
      transform: translateY(-2px);
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
  }
`;

const TicketForm = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
  margin-bottom: 40px;

  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 24px;
    text-align: center;
  }

  .form-group {
    margin-bottom: 24px;

    label {
      display: block;
      font-weight: 600;
      color: #374151;
      margin-bottom: 8px;
    }

    input, select, textarea {
      width: 100%;
      padding: 16px;
      border: 2px solid #e2e8f0;
      border-radius: 12px;
      font-size: 16px;
      transition: all 0.3s;

      &:focus {
        outline: none;
        border-color: #3b82f6;
      }

      &::placeholder {
        color: #9ca3af;
      }
    }

    textarea {
      min-height: 120px;
      resize: vertical;
    }

    .row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }
    }
  }

  .submit-btn {
    width: 100%;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    color: white;
    border: none;
    padding: 16px 32px;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.3s;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }
  }
`;

const SupportStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
  margin-top: 60px;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;

  .number {
    font-size: 2.5rem;
    font-weight: 800;
    color: #3b82f6;
    margin-bottom: 8px;
  }

  .label {
    color: #64748b;
    font-weight: 600;
  }
`;

const SupportSystem = () => {
  const [ticketForm, setTicketForm] = useState({
    name: '',
    email: '',
    priority: 'medium',
    category: 'technical',
    subject: '',
    description: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setTicketForm({
      ...ticketForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitTicket = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate ticket submission
    setTimeout(() => {
      alert('Support ticket submitted successfully! We\'ll get back to you within 24 hours.');
      setTicketForm({
        name: '',
        email: '',
        priority: 'medium',
        category: 'technical',
        subject: '',
        description: ''
      });
      setIsSubmitting(false);
    }, 2000);
  };

  const handleScheduleCall = () => {
    alert('Redirecting to calendar booking...');
  };

  const handleLiveChat = () => {
    alert('Opening live chat...');
  };

  return (
    <SupportContainer>
      <Container>
        <Header>
          <h2>Pro-Level Support</h2>
          <p>
            Get the help you need with our comprehensive support system. 
            AI-powered assistance, human experts, and priority support for Pro/Enterprise customers.
          </p>
        </Header>

        <SupportGrid>
          <SupportCard
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="icon">
              <FiMessageSquare />
            </div>
            <h3>AI Chatbot</h3>
            <p>
              Our AI assistant handles 80% of common queries instantly. 
              Available 24/7 with instant responses.
            </p>
            <div className="features">
              <div className="feature">
                <FiCheckCircle className="check" />
                Instant responses
              </div>
              <div className="feature">
                <FiCheckCircle className="check" />
                24/7 availability
              </div>
              <div className="feature">
                <FiCheckCircle className="check" />
                Escalates to humans when needed
              </div>
            </div>
            <button className="button" onClick={handleLiveChat}>
              <FiMessageSquare />
              Start Chat
            </button>
          </SupportCard>

          <SupportCard
            className="priority"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="icon">
              <FiVideo />
            </div>
            <h3>Zoom Onboarding</h3>
            <p>
              Free 1-on-1 setup calls with our automation experts. 
              Available for Pro and Enterprise customers.
            </p>
            <div className="features">
              <div className="feature">
                <FiCheckCircle className="check" />
                Personal setup assistance
              </div>
              <div className="feature">
                <FiCheckCircle className="check" />
                Custom strategy planning
              </div>
              <div className="feature">
                <FiCheckCircle className="check" />
                Best practices guidance
              </div>
            </div>
            <button className="button" onClick={handleScheduleCall}>
              <FiCalendar />
              Schedule Call
            </button>
          </SupportCard>

          <SupportCard
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="icon">
              <FiHeadphones />
            </div>
            <h3>Priority Support</h3>
            <p>
              Human support team with priority response times. 
              Pro customers get faster resolution.
            </p>
            <div className="features">
              <div className="feature">
                <FiCheckCircle className="check" />
                &lt;2 hour response (Pro)
              </div>
              <div className="feature">
                <FiCheckCircle className="check" />
                &lt;1 hour response (Enterprise)
              </div>
              <div className="feature">
                <FiCheckCircle className="check" />
                Dedicated support agent
              </div>
            </div>
            <button className="button secondary" onClick={() => document.getElementById('ticket-form').scrollIntoView()}>
              <FiMessageSquare />
              Submit Ticket
            </button>
          </SupportCard>
        </SupportGrid>

        <TicketForm
          id="ticket-form"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3>Submit Support Ticket</h3>
          <form onSubmit={handleSubmitTicket}>
            <div className="form-group">
              <div className="row">
                <div>
                  <label htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={ticketForm.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={ticketForm.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div>
                  <label htmlFor="priority">Priority</label>
                  <select
                    id="priority"
                    name="priority"
                    value={ticketForm.priority}
                    onChange={handleInputChange}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="category">Category</label>
                  <select
                    id="category"
                    name="category"
                    value={ticketForm.category}
                    onChange={handleInputChange}
                  >
                    <option value="technical">Technical Issue</option>
                    <option value="billing">Billing Question</option>
                    <option value="feature">Feature Request</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject *</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={ticketForm.subject}
                onChange={handleInputChange}
                placeholder="Brief description of your issue"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={ticketForm.description}
                onChange={handleInputChange}
                placeholder="Please provide detailed information about your issue..."
                required
              />
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              <FiSend />
              {isSubmitting ? 'Submitting...' : 'Submit Ticket'}
            </button>
          </form>
        </TicketForm>

        <SupportStats>
          <StatCard>
            <div className="number">80%</div>
            <div className="label">Queries Resolved by AI</div>
          </StatCard>
          <StatCard>
            <div className="number">&lt;2h</div>
            <div className="label">Average Response Time</div>
          </StatCard>
          <StatCard>
            <div className="number">24/7</div>
            <div className="label">Support Availability</div>
          </StatCard>
          <StatCard>
            <div className="number">98%</div>
            <div className="label">Customer Satisfaction</div>
          </StatCard>
        </SupportStats>
      </Container>
    </SupportContainer>
  );
};

export default SupportSystem;
