import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiArrowRight, FiArrowLeft, FiSettings, FiUsers, FiMail, FiBarChart } from 'react-icons/fi';

const WizardContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
`;

const WizardCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 40px;
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: #e5e7eb;
  border-radius: 3px;
  margin-bottom: 30px;
  overflow: hidden;
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  border-radius: 3px;
`;

const StepIndicator = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  gap: 20px;
`;

const Step = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  background: ${props => props.active ? '#3b82f6' : props.completed ? '#10b981' : '#e5e7eb'};
  color: ${props => props.active || props.completed ? 'white' : '#6b7280'};
  transition: all 0.3s ease;
`;

const StepTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 16px;
  text-align: center;
`;

const StepDescription = styled.p`
  color: #6b7280;
  text-align: center;
  margin-bottom: 30px;
  line-height: 1.6;
`;

const FormGroup = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 16px;
  background: white;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 16px;
  min-height: 100px;
  resize: vertical;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 30px;
`;

const Button = styled.button`
  flex: 1;
  padding: 14px 24px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &.primary {
    background: #3b82f6;
    color: white;

    &:hover {
      background: #2563eb;
    }

    &:disabled {
      background: #9ca3af;
      cursor: not-allowed;
    }
  }

  &.secondary {
    background: #f3f4f6;
    color: #374151;

    &:hover {
      background: #e5e7eb;
    }
  }
`;

const FeatureCard = styled.div`
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #3b82f6;
    background: #f8fafc;
  }

  &.selected {
    border-color: #3b82f6;
    background: #eff6ff;
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const FeatureDescription = styled.p`
  color: #6b7280;
  font-size: 14px;
  line-height: 1.5;
`;

const OnboardingWizard = ({ isOpen, onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    industry: '',
    targetAudience: '',
    goals: [],
    budget: '',
    timeline: '',
    experience: '',
    preferences: {}
  });

  const steps = [
    {
      title: "Welcome to The Automation Solutions",
      description: "Let's set up your automation business in just a few steps",
      icon: <FiSettings />
    },
    {
      title: "Tell us about your business",
      description: "Help us understand your business needs",
      icon: <FiUsers />
    },
    {
      title: "Choose your automation goals",
      description: "Select what you want to automate",
      icon: <FiMail />
    },
    {
      title: "Set up your preferences",
      description: "Configure your automation settings",
      icon: <FiBarChart />
    },
    {
      title: "You're all set!",
      description: "Your automation business is ready to go",
      icon: <FiCheck />
    }
  ];

  const businessTypes = [
    { value: 'agency', label: 'Marketing Agency' },
    { value: 'consultant', label: 'Business Consultant' },
    { value: 'freelancer', label: 'Freelancer' },
    { value: 'startup', label: 'Startup' },
    { value: 'enterprise', label: 'Enterprise' }
  ];

  const industries = [
    { value: 'technology', label: 'Technology' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'finance', label: 'Finance' },
    { value: 'real-estate', label: 'Real Estate' },
    { value: 'ecommerce', label: 'E-commerce' },
    { value: 'education', label: 'Education' },
    { value: 'other', label: 'Other' }
  ];

  const automationGoals = [
    {
      id: 'lead-generation',
      title: 'Lead Generation',
      description: 'Find and extract potential customers from LinkedIn and other sources',
      icon: <FiUsers />
    },
    {
      id: 'email-marketing',
      title: 'Email Marketing',
      description: 'Send automated email campaigns and follow-up sequences',
      icon: <FiMail />
    },
    {
      id: 'web-scraping',
      title: 'Web Scraping',
      description: 'Extract data from websites for research and analysis',
      icon: <FiSettings />
    },
    {
      id: 'social-media',
      title: 'Social Media Automation',
      description: 'Automate social media posting and engagement',
      icon: <FiBarChart />
    }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGoalToggle = (goalId) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goalId)
        ? prev.goals.filter(id => id !== goalId)
        : [...prev.goals, goalId]
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    onComplete(formData);
    onClose();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🚀</div>
              <h3 style={{ color: '#1f2937', marginBottom: '16px' }}>
                Ready to automate your business?
              </h3>
              <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                We'll help you set up powerful automation tools that can generate 
                $30K+ monthly revenue. This will only take 5 minutes!
              </p>
            </div>
          </div>
        );

      case 1:
        return (
          <div>
            <FormGroup>
              <Label>Business Name</Label>
              <Input
                type="text"
                value={formData.businessName}
                onChange={(e) => handleInputChange('businessName', e.target.value)}
                placeholder="Enter your business name"
              />
            </FormGroup>

            <FormGroup>
              <Label>Business Type</Label>
              <Select
                value={formData.businessType}
                onChange={(e) => handleInputChange('businessType', e.target.value)}
              >
                <option value="">Select your business type</option>
                {businessTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>Industry</Label>
              <Select
                value={formData.industry}
                onChange={(e) => handleInputChange('industry', e.target.value)}
              >
                <option value="">Select your industry</option>
                {industries.map(industry => (
                  <option key={industry.value} value={industry.value}>
                    {industry.label}
                  </option>
                ))}
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>Target Audience</Label>
              <TextArea
                value={formData.targetAudience}
                onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                placeholder="Describe your ideal customers (e.g., CEOs of tech startups, Marketing directors at mid-size companies)"
              />
            </FormGroup>
          </div>
        );

      case 2:
        return (
          <div>
            <p style={{ marginBottom: '24px', color: '#6b7280' }}>
              Select the automation goals that interest you most:
            </p>
            {automationGoals.map(goal => (
              <FeatureCard
                key={goal.id}
                className={formData.goals.includes(goal.id) ? 'selected' : ''}
                onClick={() => handleGoalToggle(goal.id)}
              >
                <FeatureTitle>
                  {goal.icon}
                  {goal.title}
                </FeatureTitle>
                <FeatureDescription>{goal.description}</FeatureDescription>
              </FeatureCard>
            ))}
          </div>
        );

      case 3:
        return (
          <div>
            <FormGroup>
              <Label>Monthly Budget for Automation</Label>
              <Select
                value={formData.budget}
                onChange={(e) => handleInputChange('budget', e.target.value)}
              >
                <option value="">Select your budget range</option>
                <option value="0-500">$0 - $500</option>
                <option value="500-1000">$500 - $1,000</option>
                <option value="1000-5000">$1,000 - $5,000</option>
                <option value="5000+">$5,000+</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>Timeline to Start</Label>
              <Select
                value={formData.timeline}
                onChange={(e) => handleInputChange('timeline', e.target.value)}
              >
                <option value="">When do you want to start?</option>
                <option value="immediately">Immediately</option>
                <option value="1-week">Within 1 week</option>
                <option value="1-month">Within 1 month</option>
                <option value="3-months">Within 3 months</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>Automation Experience</Label>
              <Select
                value={formData.experience}
                onChange={(e) => handleInputChange('experience', e.target.value)}
              >
                <option value="">Select your experience level</option>
                <option value="beginner">Beginner - New to automation</option>
                <option value="intermediate">Intermediate - Some experience</option>
                <option value="advanced">Advanced - Experienced user</option>
              </Select>
            </FormGroup>
          </div>
        );

      case 4:
        return (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🎉</div>
            <h3 style={{ color: '#1f2937', marginBottom: '16px' }}>
              Congratulations! You're all set up!
            </h3>
            <p style={{ color: '#6b7280', lineHeight: '1.6', marginBottom: '30px' }}>
              Your automation business is ready to start generating revenue. 
              We've configured everything based on your preferences.
            </p>
            <div style={{ background: '#f0f9ff', padding: '20px', borderRadius: '12px', marginBottom: '30px' }}>
              <h4 style={{ color: '#1e40af', marginBottom: '12px' }}>Next Steps:</h4>
              <ul style={{ color: '#1e40af', textAlign: 'left', lineHeight: '1.6' }}>
                <li>Configure your LinkedIn credentials</li>
                <li>Set up your email SMTP settings</li>
                <li>Start your first automation campaign</li>
                <li>Monitor your results in the dashboard</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <WizardContainer>
      <WizardCard
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <ProgressBar>
          <ProgressFill
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </ProgressBar>

        <StepIndicator>
          {steps.map((_, index) => (
            <Step
              key={index}
              active={index === currentStep}
              completed={index < currentStep}
            >
              {index < currentStep ? <FiCheck /> : index + 1}
            </Step>
          ))}
        </StepIndicator>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <StepTitle>{steps[currentStep].title}</StepTitle>
            <StepDescription>{steps[currentStep].description}</StepDescription>
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>

        <ButtonGroup>
          {currentStep > 0 && (
            <Button className="secondary" onClick={prevStep}>
              <FiArrowLeft />
              Previous
            </Button>
          )}
          
          {currentStep < steps.length - 1 ? (
            <Button 
              className="primary" 
              onClick={nextStep}
              disabled={currentStep === 1 && (!formData.businessName || !formData.businessType)}
            >
              Next
              <FiArrowRight />
            </Button>
          ) : (
            <Button className="primary" onClick={handleComplete}>
              <FiCheck />
              Complete Setup
            </Button>
          )}
        </ButtonGroup>
      </WizardCard>
    </WizardContainer>
  );
};

export default OnboardingWizard;
