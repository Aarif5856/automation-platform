import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiClock, FiX, FiCheck, FiZap, FiDollarSign, FiUsers } from 'react-icons/fi';
import { brandColors, typography, borderRadius, shadows } from './BrandSystem';

const OfferBanner = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, ${brandColors.accent[500]}, ${brandColors.accent[600]});
  color: white;
  padding: 12px 20px;
  z-index: 9998;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-weight: ${typography.fontWeight.semibold};
  box-shadow: ${shadows.lg};

  .close-btn {
    position: absolute;
    right: 20px;
    background: none;
    border: none;
    color: white;
    font-size: 18px;
    cursor: pointer;
    padding: 4px;
    border-radius: ${borderRadius.sm};
    transition: background 0.3s;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  }

  .offer-text {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: ${typography.fontSize.sm};

    .icon {
      font-size: 16px;
    }
  }

  .countdown {
    display: flex;
    align-items: center;
    gap: 4px;
    font-family: ${typography.fontFamily.mono};
    font-size: ${typography.fontSize.sm};
    background: rgba(255, 255, 255, 0.2);
    padding: 4px 8px;
    border-radius: ${borderRadius.sm};
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
    padding: 16px 20px;

    .close-btn {
      position: static;
      order: 2;
    }
  }
`;

const OfferModal = styled(motion.div)`
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

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: ${borderRadius['2xl']};
  padding: 40px;
  max-width: 500px;
  width: 100%;
  text-align: center;
  position: relative;
  box-shadow: ${shadows['2xl']};

  .close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    background: none;
    border: none;
    color: ${brandColors.neutral[400]};
    font-size: 24px;
    cursor: pointer;
    padding: 4px;
    border-radius: ${borderRadius.sm};
    transition: all 0.3s;

    &:hover {
      color: ${brandColors.neutral[600]};
      background: ${brandColors.neutral[100]};
    }
  }

  .offer-badge {
    display: inline-block;
    background: linear-gradient(135deg, ${brandColors.accent[500]}, ${brandColors.accent[600]});
    color: white;
    padding: 8px 16px;
    border-radius: ${borderRadius.full};
    font-size: ${typography.fontSize.sm};
    font-weight: ${typography.fontWeight.bold};
    margin-bottom: 20px;
  }

  h2 {
    font-size: ${typography.fontSize['3xl']};
    font-weight: ${typography.fontWeight.bold};
    color: ${brandColors.neutral[900]};
    margin-bottom: 16px;
  }

  .discount {
    font-size: ${typography.fontSize['4xl']};
    font-weight: ${typography.fontWeight.black};
    color: ${brandColors.accent[600]};
    margin-bottom: 8px;
  }

  .original-price {
    font-size: ${typography.fontSize.lg};
    color: ${brandColors.neutral[500]};
    text-decoration: line-through;
    margin-bottom: 20px;
  }

  .new-price {
    font-size: ${typography.fontSize['2xl']};
    font-weight: ${typography.fontWeight.bold};
    color: ${brandColors.primary[600]};
    margin-bottom: 20px;
  }

  .features {
    text-align: left;
    margin: 24px 0;
    
    .feature {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
      color: ${brandColors.neutral[700]};

      .icon {
        color: ${brandColors.success[500]};
        font-size: 18px;
      }
    }
  }

  .cta-button {
    background: linear-gradient(135deg, ${brandColors.primary[500]}, ${brandColors.secondary[500]});
    color: white;
    border: none;
    padding: 16px 32px;
    border-radius: ${borderRadius.lg};
    font-size: ${typography.fontSize.lg};
    font-weight: ${typography.fontWeight.bold};
    cursor: pointer;
    width: 100%;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    &:hover {
      transform: translateY(-2px);
      box-shadow: ${shadows.xl};
    }
  }

  .urgency-text {
    color: ${brandColors.accent[600]};
    font-size: ${typography.fontSize.sm};
    font-weight: ${typography.fontWeight.semibold};
    margin-top: 16px;
  }
`;

const LimitedTimeOffer = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Check if user has already seen the offer
  useEffect(() => {
    const hasSeenOffer = localStorage.getItem('hasSeenLimitedOffer');
    const offerEndTime = localStorage.getItem('offerEndTime');
    
    if (!hasSeenOffer || !offerEndTime) {
      // Set offer end time (24 hours from now)
      const endTime = new Date().getTime() + (24 * 60 * 60 * 1000);
      localStorage.setItem('offerEndTime', endTime.toString());
      setShowBanner(true);
    } else {
      const now = new Date().getTime();
      const endTime = parseInt(offerEndTime);
      
      if (now < endTime) {
        setShowBanner(true);
      }
    }
  }, []);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      const offerEndTime = localStorage.getItem('offerEndTime');
      if (!offerEndTime) return;

      const now = new Date().getTime();
      const endTime = parseInt(offerEndTime);
      const difference = endTime - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setShowBanner(false);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCloseBanner = () => {
    setShowBanner(false);
    localStorage.setItem('hasSeenLimitedOffer', 'true');
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleClaimOffer = () => {
    // Track conversion
    if (window.analytics) {
      window.analytics.trackConversion('limited_offer_claim', 197, 'USD');
    }
    
    // Redirect to checkout with offer applied
    window.location.href = '/checkout?offer=early-bird-50';
  };

  const formatTime = (value) => value.toString().padStart(2, '0');

  if (!showBanner) return null;

  return (
    <>
      <OfferBanner
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="offer-text">
          <FiZap className="icon" />
          <span>🎉 EARLY BIRD SPECIAL: 50% OFF Pro Plan!</span>
        </div>
        <div className="countdown">
          <FiClock className="icon" />
          <span>
            {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
          </span>
        </div>
        <button className="close-btn" onClick={handleCloseBanner}>
          <FiX />
        </button>
      </OfferBanner>

      <AnimatePresence>
        {showModal && (
          <OfferModal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <ModalContent
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-btn" onClick={handleCloseModal}>
                <FiX />
              </button>

              <div className="offer-badge">LIMITED TIME OFFER</div>
              
              <h2>Early Bird Special!</h2>
              
              <div className="discount">50% OFF</div>
              <div className="original-price">$197/month</div>
              <div className="new-price">$98.50/month</div>

              <div className="features">
                <div className="feature">
                  <FiCheck className="icon" />
                  <span>All Pro Plan features included</span>
                </div>
                <div className="feature">
                  <FiUsers className="icon" />
                  <span>Priority support & onboarding</span>
                </div>
                <div className="feature">
                  <FiZap className="icon" />
                  <span>Advanced automation tools</span>
                </div>
                <div className="feature">
                  <FiDollarSign className="icon" />
                  <span>30-day money-back guarantee</span>
                </div>
              </div>

              <button className="cta-button" onClick={handleClaimOffer}>
                <FiZap />
                Claim 50% Discount Now
              </button>

              <div className="urgency-text">
                ⏰ Offer expires in {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
              </div>
            </ModalContent>
          </OfferModal>
        )}
      </AnimatePresence>
    </>
  );
};

export default LimitedTimeOffer;
