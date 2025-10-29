import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiCreditCard, FiLock, FiCheck, FiArrowLeft, FiDollarSign, FiZap } from 'react-icons/fi';
import PayPalPayment from '../components/PayPalPayment';
import CryptoPayment from '../components/CryptoPayment';

const CheckoutContainer = styled.div`
  padding: 120px 0 80px;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
  min-height: 100vh;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 60%, rgba(16, 185, 129, 0.05) 0%, transparent 50%);
    opacity: 0.8;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse"><path d="M 50 0 L 0 0 0 50" fill="none" stroke="%23ffffff" stroke-width="0.5" opacity="0.05"/></pattern></defs><rect width="100%" height="100%" fill="url(%23grid)"/></svg>');
    opacity: 0.3;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 1;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 80px;

  h1 {
    font-size: 3.5rem;
    font-weight: 900;
    background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 24px;

    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }

  p {
    color: #cbd5e1;
    font-size: 1.3rem;
    font-weight: 400;
    max-width: 600px;
    margin: 0 auto;
  }
`;

const CheckoutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 450px;
  gap: 80px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 60px;
  }
`;

const CheckoutForm = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 24px;
  padding: 50px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
    border-radius: 24px;
  }

  .content {
    position: relative;
    z-index: 1;
  }
`;

const FormSection = styled.div`
  margin-bottom: 50px;

  h2 {
    font-size: 1.8rem;
    font-weight: 700;
    color: white;
    margin-bottom: 32px;
    display: flex;
    align-items: center;
    gap: 16px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .icon {
    color: #3b82f6;
    font-size: 24px;
    filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.5));
  }
`;

const FormGroup = styled.div`
  margin-bottom: 32px;
  position: relative;

  label {
    display: block;
    font-weight: 600;
    color: #e2e8f0;
    margin-bottom: 12px;
    font-size: 1.1rem;
  }

  input, select {
    width: 100%;
    padding: 20px;
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 16px;
    font-size: 16px;
    color: white;
    transition: all 0.3s;
    backdrop-filter: blur(10px);

    &:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 
        0 0 0 4px rgba(59, 130, 246, 0.2),
        0 0 20px rgba(59, 130, 246, 0.3);
      background: rgba(255, 255, 255, 0.15);
    }

    &::placeholder {
      color: #94a3b8;
    }

    &:hover {
      border-color: rgba(255, 255, 255, 0.4);
      background: rgba(255, 255, 255, 0.12);
    }
  }

  select {
    option {
      background: #1e293b;
      color: white;
      padding: 12px;
      font-size: 16px;
      
      &:hover {
        background: #334155;
      }
    }
  }

  .row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
`;

const PaymentMethod = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
`;

const PaymentOption = styled.div`
  padding: 16px;
  border: 2px solid ${props => props.selected ? '#3b82f6' : '#e2e8f0'};
  border-radius: 12px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  background: ${props => props.selected ? '#f0f9ff' : 'white'};

  &:hover {
    border-color: #3b82f6;
  }

  .icon {
    font-size: 24px;
    margin-bottom: 8px;
    color: #3b82f6;
  }

  .name {
    font-weight: 600;
    color: #374151;
    font-size: 0.9rem;
  }
`;


const OrderSummary = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 24px;
  padding: 50px;
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  height: fit-content;
  position: sticky;
  top: 120px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
    border-radius: 24px;
  }

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(from 0deg, transparent, rgba(59, 130, 246, 0.1), transparent);
    animation: rotate 10s linear infinite;
    opacity: 0.3;
  }

  @keyframes rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .content {
    position: relative;
    z-index: 1;
  }

  h2 {
    font-size: 1.8rem;
    font-weight: 700;
    color: white;
    margin-bottom: 32px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    gap: 12px;
  }
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0;
    height: 1px;
    background: linear-gradient(90deg, #3b82f6, #8b5cf6);
    transition: width 0.3s ease;
  }

  &:hover::before {
    width: 100%;
  }

  .name {
    font-weight: 600;
    color: #e2e8f0;
    font-size: 1.1rem;
  }

  .price {
    color: #10b981;
    font-weight: 700;
    font-size: 1.1rem;
    text-shadow: 0 0 10px rgba(16, 185, 129, 0.3);
  }
`;

const OrderTotal = styled.div`
  margin-top: 32px;
  padding-top: 32px;
  border-top: 2px solid rgba(255, 255, 255, 0.2);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #3b82f6, #8b5cf6, #10b981);
    border-radius: 1px;
  }

  .total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.5rem;
    font-weight: 800;
    color: white;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }
`;

const SecurityNote = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #10b981;
  font-size: 0.9rem;
  margin-bottom: 24px;
  padding: 12px 16px;
  background: #f0fdf4;
  border-radius: 8px;
`;

const Button = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 50%, #8b5cf6 100%);
  color: white;
  border: none;
  padding: 20px 40px;
  border-radius: 16px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 
    0 8px 25px rgba(59, 130, 246, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.1);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 
      0 15px 35px rgba(59, 130, 246, 0.6),
      0 0 0 1px rgba(255, 255, 255, 0.2);
    background: linear-gradient(135deg, #2563eb 0%, #1e40af 50%, #7c3aed 100%);
  }

  &:hover::before {
    left: 100%;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: 0 4px 15px rgba(59, 130, 246, 0.2);
  }
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.1);
  color: #cbd5e1;
  border: 2px solid rgba(255, 255, 255, 0.2);
  padding: 16px 32px;
  border-radius: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  margin-bottom: 32px;
  backdrop-filter: blur(10px);

  &:hover {
    border-color: #3b82f6;
    color: #3b82f6;
    background: rgba(59, 130, 246, 0.1);
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
    transform: translateY(-2px);
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: #64748b;
  font-size: 1.1rem;
`;

const Checkout = () => {
  const navigate = useNavigate();
  const [isInitialized, setIsInitialized] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [orderItems, setOrderItems] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    paymentMethod: 'paypal'
  });


  // Initialize order items on component mount
  useEffect(() => {
    const initializeOrder = () => {
      try {
        // Get selected service or plan from localStorage
        const selectedService = JSON.parse(localStorage.getItem('selectedService') || 'null');
        const selectedPlan = JSON.parse(localStorage.getItem('selectedPlan') || 'null');
        
        let items = [];
        
        if (selectedService) {
          items.push({
            id: selectedService.id,
            name: selectedService.title,
            price: selectedService.price,
            description: selectedService.description
          });
        }
        
        if (selectedPlan) {
          items.push({
            id: selectedPlan.name.toLowerCase(),
            name: `${selectedPlan.name} Plan`,
            price: selectedPlan.price,
            description: selectedPlan.description
          });
        }
        
        // Default to Pro plan if no items selected
        if (items.length === 0) {
          items = [{
            id: 'pro',
            name: 'Pro Plan',
            price: 197,
            description: 'Most popular for growing businesses'
          }];
        }
        
        setOrderItems(items);
        setIsInitialized(true);
      } catch (error) {
        console.error('Error initializing order:', error);
        // Fallback to default plan
        setOrderItems([{
          id: 'pro',
          name: 'Pro Plan',
          price: 197,
          description: 'Most popular for growing businesses'
        }]);
        setIsInitialized(true);
      }
    };

    initializeOrder();
  }, []);

  const totalPrice = orderItems.reduce((sum, item) => sum + item.price, 0);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePaymentMethodChange = (method) => {
    setFormData({ ...formData, paymentMethod: method });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // For ALL payment methods, require actual payment completion
    // Payment should be handled by their respective components
    alert('Please complete the payment using the payment method you selected.');
    return;
  };

  const handlePayPalSuccess = (paymentData) => {
    console.log('PayPal payment successful:', paymentData);
    
    // Set payment as completed
    setPaymentCompleted(true);
    
    // Store payment data
    localStorage.setItem('paymentData', JSON.stringify({
      method: 'paypal',
      paymentId: paymentData.paymentId,
      status: paymentData.status,
      amount: paymentData.amount,
      timestamp: paymentData.timestamp
    }));
    
    // Clear selected items from localStorage
    localStorage.removeItem('selectedService');
    localStorage.removeItem('selectedPlan');
    
    // Redirect to success page
    navigate('/success');
  };

  const handlePayPalError = (error) => {
    console.error('PayPal payment error:', error);
    // You can add error handling here
  };

  const handleCryptoSuccess = (paymentData) => {
    console.log('Crypto payment successful:', paymentData);
    
    // Set payment as completed
    setPaymentCompleted(true);
    
    // Store payment data
    localStorage.setItem('paymentData', JSON.stringify({
      method: 'crypto',
      paymentId: paymentData.paymentId,
      status: paymentData.status,
      amount: paymentData.amount,
      currency: paymentData.currency,
      txHash: paymentData.txHash,
      timestamp: paymentData.timestamp
    }));
    
    // Clear selected items from localStorage
    localStorage.removeItem('selectedService');
    localStorage.removeItem('selectedPlan');
    
    // Redirect to success page
    navigate('/success');
  };

  const handleCryptoError = (error) => {
    console.error('Crypto payment error:', error);
    // You can add error handling here
  };

  const paymentMethods = [
    { id: 'paypal', name: 'PayPal', icon: <FiDollarSign /> },
    { id: 'crypto', name: 'Crypto (USDT)', icon: <FiZap /> }
  ];

  // Show loading spinner while initializing
  if (!isInitialized) {
    return (
      <CheckoutContainer>
        <Container>
          <LoadingSpinner>
            Loading checkout...
          </LoadingSpinner>
        </Container>
      </CheckoutContainer>
    );
  }

  return (
    <CheckoutContainer>
      <Container>
        <Header>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Complete Your Order
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            You're just one step away from transforming your business with automation
          </motion.p>
        </Header>

        <CheckoutGrid>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <BackButton onClick={() => navigate('/services')}>
              <FiArrowLeft />
              Back to Services
            </BackButton>

            <CheckoutForm
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="content">
                <form onSubmit={handleSubmit}>
                  <FormSection>
                    <h2>
                      <FiCreditCard className="icon" />
                      Billing Information
                    </h2>

                  <div className="row">
                    <FormGroup>
                      <label htmlFor="firstName">First Name *</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <label htmlFor="lastName">Last Name *</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </div>

                  <FormGroup>
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <label htmlFor="company">Company</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </FormGroup>

                  <FormGroup>
                    <label htmlFor="address">Address *</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>

                  <div className="row">
                    <FormGroup>
                      <label htmlFor="city">City *</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <label htmlFor="state">State *</label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </div>

                  <div className="row">
                    <FormGroup>
                      <label htmlFor="zipCode">ZIP Code *</label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <label htmlFor="country">Country *</label>
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                      >
                        <option value="US">🇺🇸 United States</option>
                        <option value="CA">🇨🇦 Canada</option>
                        <option value="UK">🇬🇧 United Kingdom</option>
                        <option value="AU">🇦🇺 Australia</option>
                        <option value="DE">🇩🇪 Germany</option>
                        <option value="FR">🇫🇷 France</option>
                        <option value="IT">🇮🇹 Italy</option>
                        <option value="ES">🇪🇸 Spain</option>
                        <option value="NL">🇳🇱 Netherlands</option>
                        <option value="BE">🇧🇪 Belgium</option>
                        <option value="CH">🇨🇭 Switzerland</option>
                        <option value="AT">🇦🇹 Austria</option>
                        <option value="SE">🇸🇪 Sweden</option>
                        <option value="NO">🇳🇴 Norway</option>
                        <option value="DK">🇩🇰 Denmark</option>
                        <option value="FI">🇫🇮 Finland</option>
                        <option value="IE">🇮🇪 Ireland</option>
                        <option value="PT">🇵🇹 Portugal</option>
                        <option value="PL">🇵🇱 Poland</option>
                        <option value="CZ">🇨🇿 Czech Republic</option>
                        <option value="HU">🇭🇺 Hungary</option>
                        <option value="RO">🇷🇴 Romania</option>
                        <option value="BG">🇧🇬 Bulgaria</option>
                        <option value="HR">🇭🇷 Croatia</option>
                        <option value="SI">🇸🇮 Slovenia</option>
                        <option value="SK">🇸🇰 Slovakia</option>
                        <option value="LT">🇱🇹 Lithuania</option>
                        <option value="LV">🇱🇻 Latvia</option>
                        <option value="EE">🇪🇪 Estonia</option>
                        <option value="JP">🇯🇵 Japan</option>
                        <option value="KR">🇰🇷 South Korea</option>
                        <option value="CN">🇨🇳 China</option>
                        <option value="IN">🇮🇳 India</option>
                        <option value="SG">🇸🇬 Singapore</option>
                        <option value="HK">🇭🇰 Hong Kong</option>
                        <option value="TW">🇹🇼 Taiwan</option>
                        <option value="TH">🇹🇭 Thailand</option>
                        <option value="MY">🇲🇾 Malaysia</option>
                        <option value="ID">🇮🇩 Indonesia</option>
                        <option value="PH">🇵🇭 Philippines</option>
                        <option value="VN">🇻🇳 Vietnam</option>
                        <option value="BR">🇧🇷 Brazil</option>
                        <option value="AR">🇦🇷 Argentina</option>
                        <option value="CL">🇨🇱 Chile</option>
                        <option value="CO">🇨🇴 Colombia</option>
                        <option value="MX">🇲🇽 Mexico</option>
                        <option value="PE">🇵🇪 Peru</option>
                        <option value="ZA">🇿🇦 South Africa</option>
                        <option value="NG">🇳🇬 Nigeria</option>
                        <option value="KE">🇰🇪 Kenya</option>
                        <option value="EG">🇪🇬 Egypt</option>
                        <option value="MA">🇲🇦 Morocco</option>
                        <option value="TN">🇹🇳 Tunisia</option>
                        <option value="DZ">🇩🇿 Algeria</option>
                        <option value="IL">🇮🇱 Israel</option>
                        <option value="AE">🇦🇪 United Arab Emirates</option>
                        <option value="SA">🇸🇦 Saudi Arabia</option>
                        <option value="TR">🇹🇷 Turkey</option>
                        <option value="RU">🇷🇺 Russia</option>
                        <option value="UA">🇺🇦 Ukraine</option>
                        <option value="BY">🇧🇾 Belarus</option>
                        <option value="KZ">🇰🇿 Kazakhstan</option>
                        <option value="UZ">🇺🇿 Uzbekistan</option>
                        <option value="QA">🇶🇦 Qatar</option>
                        <option value="LK">🇱🇰 Sri Lanka</option>
                        <option value="NZ">🇳🇿 New Zealand</option>
                        <option value="OTHER">🌍 Other</option>
                      </select>
                    </FormGroup>
                  </div>
                </FormSection>

                <FormSection>
                  <h2>
                    <FiLock className="icon" />
                    Payment Method
                  </h2>

                  <PaymentMethod>
                    {paymentMethods.map(method => (
                      <PaymentOption
                        key={method.id}
                        selected={formData.paymentMethod === method.id}
                        onClick={() => handlePaymentMethodChange(method.id)}
                      >
                        <div className="icon">{method.icon}</div>
                        <div className="name">{method.name}</div>
                      </PaymentOption>
                    ))}
                  </PaymentMethod>

                  {formData.paymentMethod === 'crypto' && (
                    <CryptoPayment
                      amount={totalPrice}
                      onSuccess={handleCryptoSuccess}
                      onError={handleCryptoError}
                      orderItems={orderItems}
                    />
                  )}

                  {formData.paymentMethod === 'paypal' && (
                    <PayPalPayment
                      amount={totalPrice}
                      onSuccess={handlePayPalSuccess}
                      onError={handlePayPalError}
                      orderItems={orderItems}
                    />
                  )}

                  {formData.paymentMethod === 'paypal' && (
                    <div style={{
                      background: 'rgba(0, 123, 191, 0.1)',
                      border: '1px solid rgba(0, 123, 191, 0.3)',
                      borderRadius: '12px',
                      padding: '16px',
                      margin: '16px 0',
                      color: '#0ea5e9',
                      fontSize: '0.9rem',
                      textAlign: 'center'
                    }}>
                      <strong>PayPal Payment Required:</strong> Click the PayPal button above to complete your payment securely.
                    </div>
                  )}


                  {formData.paymentMethod === 'crypto' && (
                    <div style={{
                      background: 'rgba(16, 185, 129, 0.1)',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      borderRadius: '12px',
                      padding: '16px',
                      margin: '16px 0',
                      color: '#10b981',
                      fontSize: '0.9rem',
                      textAlign: 'center'
                    }}>
                      <strong>Crypto Payment Required:</strong> Send the exact amount to the address above to complete your payment.
                    </div>
                  )}

                  <SecurityNote>
                    <FiLock />
                    Your payment information is secure and encrypted
                  </SecurityNote>
                </FormSection>

                <Button 
                  type="submit" 
                  disabled={true}
                  style={{
                    opacity: 0.6,
                    cursor: 'not-allowed',
                    background: '#6b7280'
                  }}
                >
                  <FiCheck />
                  {formData.paymentMethod === 'paypal' ? 'Complete Payment with PayPal Above' :
                   formData.paymentMethod === 'crypto' ? 'Complete Payment with Crypto Above' :
                   'Please Select a Payment Method'}
                </Button>
              </form>
              </div>
            </CheckoutForm>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <OrderSummary
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="content">
                <h2>
                  <FiDollarSign />
                  Order Summary
                </h2>

                {orderItems.map(item => (
                  <OrderItem key={item.id}>
                    <div className="name">{item.name}</div>
                    <div className="price">${item.price}</div>
                  </OrderItem>
                ))}

                <OrderTotal>
                  <div className="total">
                    <span>Total</span>
                    <span>${totalPrice}</span>
                  </div>
                </OrderTotal>
              </div>
            </OrderSummary>
          </motion.div>
        </CheckoutGrid>
      </Container>
    </CheckoutContainer>
  );
};

export default Checkout;