import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiCopy, FiCheck, FiAlertCircle, FiClock, FiZap } from 'react-icons/fi';

const CryptoContainer = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 24px;
  margin-top: 20px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%);
    border-radius: 16px;
  }

  .content {
    position: relative;
    z-index: 1;
  }

  h3 {
    color: #e2e8f0;
    margin-bottom: 16px;
    font-size: 1.2rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .crypto-info {
    background: rgba(16, 185, 129, 0.1);
    border: 1px solid rgba(16, 185, 129, 0.3);
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 20px;
    color: #cbd5e1;
    font-size: 0.9rem;
    line-height: 1.5;
  }

  .address-container {
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 16px;
    margin: 16px 0;
    position: relative;
  }

  .address {
    font-family: 'Courier New', monospace;
    font-size: 0.9rem;
    color: #10b981;
    word-break: break-all;
    margin-bottom: 12px;
    font-weight: 600;
  }

  .copy-button {
    background: linear-gradient(135deg, #10b981, #059669);
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: all 0.3s;
    margin-bottom: 16px;

    &:hover {
      background: linear-gradient(135deg, #059669, #047857);
      transform: translateY(-1px);
    }

    &:active {
      transform: translateY(0);
    }
  }

  .amount-display {
    background: rgba(16, 185, 129, 0.1);
    border: 1px solid rgba(16, 185, 129, 0.3);
    border-radius: 12px;
    padding: 16px;
    text-align: center;
    margin: 16px 0;
    color: #10b981;
    font-weight: 700;
    font-size: 1.1rem;
  }

  .status-message {
    border-radius: 12px;
    padding: 16px;
    margin-top: 16px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .status-waiting {
    background: rgba(251, 191, 36, 0.1);
    border: 1px solid rgba(251, 191, 36, 0.3);
    color: #f59e0b;
  }

  .status-success {
    background: rgba(16, 185, 129, 0.1);
    border: 1px solid rgba(16, 185, 129, 0.3);
    color: #10b981;
  }

  .status-error {
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.3);
    color: #ef4444;
  }

  .timer {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    padding: 12px;
    text-align: center;
    margin: 16px 0;
    color: #cbd5e1;
    font-size: 0.9rem;
  }

  .instructions {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: 16px;
    margin: 16px 0;
    color: #94a3b8;
    font-size: 0.85rem;
    line-height: 1.4;

    p {
      margin: 4px 0;
    }
  }
`;

const CryptoPayment = ({ amount, onSuccess, onError, orderItems }) => {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const [paymentStatus, setPaymentStatus] = useState('waiting'); // waiting, success, error
  const [verificationAttempts, setVerificationAttempts] = useState(0);

  // Generate a unique payment ID
  const paymentId = `CRYPTO_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  // Crypto payment details
  const cryptoPayment = {
    address: 'TE1G6K5gEGxYf3pvf23cGnDRAbY9f2JZws', // Tron USDT address
    amount: amount,
    currency: 'USDT',
    network: 'TRC20',
    paymentId: paymentId
  };

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0 && paymentStatus === 'waiting') {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && paymentStatus === 'waiting') {
      setPaymentStatus('error');
      if (onError) {
        onError({ message: 'Payment timeout - please try again' });
      }
    }
  }, [timeLeft, paymentStatus, onError]);

  // Simulate payment verification (in real app, this would check blockchain)
  useEffect(() => {
    if (paymentStatus === 'waiting') {
      const checkInterval = setInterval(() => {
        setVerificationAttempts(prev => prev + 1);
        
        // For demo purposes, simulate payment detection after 5-8 attempts (50-80 seconds)
        // In production, this would check actual blockchain transactions
        if (verificationAttempts >= 5 && Math.random() > 0.8) {
          setPaymentStatus('success');
          clearInterval(checkInterval);
          
          if (onSuccess) {
            onSuccess({
              paymentId: paymentId,
              method: 'crypto',
              amount: amount,
              currency: 'USDT',
              status: 'completed',
              timestamp: new Date().toISOString(),
              txHash: `0x${Math.random().toString(16).substr(2, 64)}` // Simulated transaction hash
            });
          }
        }
      }, 10000); // Check every 10 seconds

      return () => clearInterval(checkInterval);
    }
  }, [paymentStatus, verificationAttempts, onSuccess, paymentId, amount]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(cryptoPayment.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <CryptoContainer>
      <div className="content">
        <h3>
          <FiZap />
          Crypto Payment (USDT)
        </h3>
        
        <div className="crypto-info">
          <strong>Secure & Fast:</strong> Pay with USDT (Tron network) for instant processing. 
          Your payment will be verified automatically on the blockchain.
        </div>

        <div className="amount-display">
          Send exactly <strong>{cryptoPayment.amount} {cryptoPayment.currency}</strong>
        </div>

        <div className="address-container">
          <div className="address">
            {cryptoPayment.address}
          </div>
          <button 
            className="copy-button"
            onClick={copyToClipboard}
          >
            {copied ? <FiCheck /> : <FiCopy />}
            {copied ? 'Copied!' : 'Copy Address'}
          </button>
        </div>

        <div className="timer">
          <FiClock style={{ marginRight: '8px' }} />
          Payment expires in: {formatTime(timeLeft)}
        </div>

        {paymentStatus === 'waiting' && (
          <div className="status-message status-waiting">
            <FiClock />
            Waiting for payment confirmation... ({verificationAttempts} checks)
          </div>
        )}

        {paymentStatus === 'success' && (
          <div className="status-message status-success">
            <FiCheck />
            Payment confirmed! Redirecting to success page...
          </div>
        )}

        {paymentStatus === 'error' && (
          <div className="status-message status-error">
            <FiAlertCircle />
            Payment timeout or verification failed. Please try again.
          </div>
        )}

        <div className="instructions">
          <p><strong>Important Instructions:</strong></p>
          <p>• Only send {cryptoPayment.currency} to this address</p>
          <p>• Network: {cryptoPayment.network} (Tron)</p>
          <p>• Payment will be verified automatically</p>
          <p>• Do not send other cryptocurrencies</p>
          <p>• Payment ID: {paymentId}</p>
        </div>
      </div>
    </CryptoContainer>
  );
};

export default CryptoPayment;
