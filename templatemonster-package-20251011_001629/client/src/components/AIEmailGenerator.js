import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiZap, FiCopy, FiRefreshCw, FiCheck } from 'react-icons/fi';
import toast from 'react-hot-toast';

const GeneratorContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::after {
    opacity: 1;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;

  .icon {
    width: 50px;
    height: 50px;
    border-radius: 12px;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.5rem;
  }

  h3 {
    color: #1f2937;
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
  }
`;

const Form = styled.form`
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
`;

const InputGroup = styled.div`
  margin-bottom: 1rem;

  label {
    display: block;
    color: #374151;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  input, select, textarea {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.3s ease;
    background: white;

    &:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
  }

  textarea {
    resize: vertical;
    min-height: 80px;
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  .spinner {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const Results = styled.div`
  position: relative;
  z-index: 1;
`;

const SubjectLine = styled(motion.div)`
  background: #f8fafc;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #3b82f6;
    background: #f0f9ff;
  }

  .text {
    flex: 1;
    font-weight: 500;
    color: #1f2937;
  }

  .actions {
    display: flex;
    gap: 0.5rem;
  }

  .action-btn {
    width: 32px;
    height: 32px;
    border-radius: 6px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    color: #6b7280;

    &:hover {
      background: #e5e7eb;
      color: #374151;
    }

    &.copy {
      &:hover {
        background: #dbeafe;
        color: #3b82f6;
      }
    }
  }
`;

const AIEmailGenerator = () => {
  const [formData, setFormData] = useState({
    industry: '',
    product: '',
    targetAudience: '',
    tone: 'professional',
    goal: ''
  });
  const [subjectLines, setSubjectLines] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const generateSubjectLines = async (e) => {
    e.preventDefault();
    setIsGenerating(true);

    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // AI-generated subject lines based on input
    const generatedLines = [
      `🚀 Transform Your ${formData.industry} Business with ${formData.product}`,
      `The ${formData.industry} Secret That's Generating 10x More Revenue`,
      `Why 90% of ${formData.targetAudience} Are Missing This ${formData.product} Opportunity`,
      `From Struggling to Success: How ${formData.product} Changed Everything`,
      `The ${formData.industry} Game-Changer You've Been Waiting For`,
      `Stop Losing Money: The ${formData.product} Solution for ${formData.targetAudience}`,
      `Exclusive: The ${formData.industry} Strategy That Actually Works`,
      `How I Generated $50k Using ${formData.product} (And You Can Too)`
    ];

    setSubjectLines(generatedLines);
    setIsGenerating(false);
    toast.success('AI-generated subject lines ready!');
  };

  const copyToClipboard = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      toast.success('Subject line copied to clipboard!');
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      toast.error('Failed to copy subject line');
    }
  };

  const regenerateSubjectLines = () => {
    setSubjectLines([]);
    generateSubjectLines({ preventDefault: () => {} });
  };

  return (
    <GeneratorContainer>
      <Header>
        <div className="icon">
          <FiZap />
        </div>
        <h3>AI Email Subject Line Generator</h3>
      </Header>

      <Form onSubmit={generateSubjectLines}>
        <InputGroup>
          <label htmlFor="industry">Industry</label>
          <input
            type="text"
            id="industry"
            name="industry"
            value={formData.industry}
            onChange={handleInputChange}
            placeholder="e.g., SaaS, E-commerce, Real Estate"
            required
          />
        </InputGroup>

        <InputGroup>
          <label htmlFor="product">Product/Service</label>
          <input
            type="text"
            id="product"
            name="product"
            value={formData.product}
            onChange={handleInputChange}
            placeholder="e.g., CRM Software, Marketing Automation"
            required
          />
        </InputGroup>

        <InputGroup>
          <label htmlFor="targetAudience">Target Audience</label>
          <input
            type="text"
            id="targetAudience"
            name="targetAudience"
            value={formData.targetAudience}
            onChange={handleInputChange}
            placeholder="e.g., Small Business Owners, Marketing Managers"
            required
          />
        </InputGroup>

        <InputGroup>
          <label htmlFor="tone">Tone</label>
          <select
            id="tone"
            name="tone"
            value={formData.tone}
            onChange={handleInputChange}
          >
            <option value="professional">Professional</option>
            <option value="casual">Casual</option>
            <option value="urgent">Urgent</option>
            <option value="friendly">Friendly</option>
            <option value="authoritative">Authoritative</option>
          </select>
        </InputGroup>

        <InputGroup>
          <label htmlFor="goal">Campaign Goal</label>
          <textarea
            id="goal"
            name="goal"
            value={formData.goal}
            onChange={handleInputChange}
            placeholder="e.g., Increase sales, Generate leads, Build awareness"
          />
        </InputGroup>

        <Button type="submit" disabled={isGenerating}>
          {isGenerating ? (
            <>
              <FiRefreshCw className="spinner" />
              Generating...
            </>
          ) : (
            <>
              <FiZap />
              Generate Subject Lines
            </>
          )}
        </Button>
      </Form>

      {subjectLines.length > 0 && (
        <Results>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h4 style={{ color: '#1f2937', margin: 0 }}>Generated Subject Lines</h4>
            <Button onClick={regenerateSubjectLines} style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
              <FiRefreshCw />
              Regenerate
            </Button>
          </div>

          {subjectLines.map((line, index) => (
            <SubjectLine
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text">{line}</div>
              <div className="actions">
                <button
                  className={`action-btn copy ${copiedIndex === index ? 'copied' : ''}`}
                  onClick={() => copyToClipboard(line, index)}
                >
                  {copiedIndex === index ? <FiCheck /> : <FiCopy />}
                </button>
              </div>
            </SubjectLine>
          ))}
        </Results>
      )}
    </GeneratorContainer>
  );
};

export default AIEmailGenerator;

