import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import styled from 'styled-components';
import { FiCheck, FiAlertCircle } from 'react-icons/fi';

const PayPalContainer = styled.div`
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
    background: linear-gradient(135deg, rgba(0, 123, 191, 0.1) 0%, rgba(0, 123, 191, 0.05) 100%);
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

  .paypal-info {
    background: rgba(0, 123, 191, 0.1);
    border: 1px solid rgba(0, 123, 191, 0.3);
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 20px;
    color: #cbd5e1;
    font-size: 0.9rem;
    line-height: 1.5;
  }

  .success-message {
    background: rgba(16, 185, 129, 0.1);
    border: 1px solid rgba(16, 185, 129, 0.3);
    border-radius: 12px;
    padding: 16px;
    margin-top: 16px;
    color: #10b981;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .error-message {
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.3);
    border-radius: 12px;
    padding: 16px;
    margin-top: 16px;
    color: #ef4444;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

const PayPalPayment = ({ amount, onSuccess, onError, orderItems }) => {
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const paypalOptions = {
    "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID || "sb", // Use sandbox for testing
    currency: "USD",
    intent: "capture",
    components: "buttons",
    "enable-funding": "paypal,venmo,card",
    "disable-funding": "",
    "data-sdk-integration-source": "integrationbuilder_ac"
  };

  const createOrder = (data, actions) => {
    setIsProcessing(true);
    setPaymentStatus(null);

    return actions.order.create({
      purchase_units: [{
        amount: {
          currency_code: "USD",
          value: amount.toString()
        },
        description: `Automation Pro - ${orderItems.map(item => item.name).join(', ')}`
      }],
      application_context: {
        shipping_preference: "NO_SHIPPING"
      }
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      console.log('Payment completed:', details);
      setPaymentStatus('success');
      setIsProcessing(false);
      
      // Send success notification
      if (onSuccess) {
        onSuccess({
          paymentId: details.id,
          status: details.status,
          payer: details.payer,
          amount: amount,
          timestamp: new Date().toISOString()
        });
      }
    });
  };

  const onPayPalError = (err) => {
    console.error('PayPal error:', err);
    setPaymentStatus('error');
    setIsProcessing(false);
    
    if (onError) {
      onError(err);
    }
  };

  const onCancel = (data) => {
    console.log('Payment cancelled:', data);
    setPaymentStatus('cancelled');
    setIsProcessing(false);
  };

  return (
    <PayPalContainer>
      <div className="content">
        <h3>
          <FiCheck />
          PayPal Payment
        </h3>
        
        <div className="paypal-info">
          <strong>Secure Payment:</strong> Your payment is processed securely by PayPal. 
          You can pay with your PayPal account, credit card, or debit card.
        </div>

        {paymentStatus === 'success' && (
          <div className="success-message">
            <FiCheck />
            Payment successful! Redirecting to confirmation...
          </div>
        )}

        {paymentStatus === 'error' && (
          <div className="error-message">
            <FiAlertCircle />
            Payment failed. Please try again or use a different payment method.
          </div>
        )}

        {paymentStatus === 'cancelled' && (
          <div className="error-message">
            <FiAlertCircle />
            Payment was cancelled. You can try again or choose a different payment method.
          </div>
        )}

        {!paymentStatus && (
          <PayPalScriptProvider options={paypalOptions}>
            <PayPalButtons
              createOrder={createOrder}
              onApprove={onApprove}
              onError={onPayPalError}
              onCancel={onCancel}
              style={{
                layout: "vertical",
                color: "blue",
                shape: "rect",
                label: "paypal"
              }}
            />
          </PayPalScriptProvider>
        )}

        {isProcessing && (
          <div style={{ 
            textAlign: 'center', 
            color: '#cbd5e1', 
            marginTop: '16px',
            fontSize: '0.9rem'
          }}>
            Processing payment...
          </div>
        )}
      </div>
    </PayPalContainer>
  );
};

export default PayPalPayment;
