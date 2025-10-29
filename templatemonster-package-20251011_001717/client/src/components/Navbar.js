import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import styled from 'styled-components';
import { FiMenu, FiX, FiShoppingCart, FiUser, FiLogOut } from 'react-icons/fi';

const Nav = styled.nav`
  background: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
`;

const Logo = styled(Link)`
  font-size: 24px;
  font-weight: 800;
  color: #3b82f6;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;

  .logo-container {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .logo-icon {
    position: relative;
    width: 45px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }

  .logo-ap {
    font-size: 18px;
    font-weight: 900;
    color: white;
    letter-spacing: -1px;
    z-index: 3;
    position: relative;
  }

  .logo-lightning {
    position: absolute;
    font-size: 16px;
    color: #fbbf24;
    z-index: 2;
    top: 8px;
    right: 8px;
    transform: rotate(-15deg);
  }

  .logo-gear {
    position: absolute;
    font-size: 20px;
    color: rgba(255, 255, 255, 0.3);
    z-index: 1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .logo-text {
    display: flex;
    flex-direction: column;
    line-height: 1;
  }

  .logo-automate {
    font-size: 16px;
    font-weight: 800;
    color: #1e40af;
    letter-spacing: 1px;
  }

  .logo-pro {
    font-size: 14px;
    font-weight: 600;
    color: #3b82f6;
    letter-spacing: 2px;
    margin-top: -2px;
  }

  &:hover {
    .logo-icon {
      transform: scale(1.05);
      transition: transform 0.2s ease;
    }
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;

  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    padding: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
`;

const NavLink = styled(Link)`
  color: #374151;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;

  &:hover {
    color: #3b82f6;
  }
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const CartButton = styled.button`
  position: relative;
  background: none;
  border: none;
  color: #374151;
  font-size: 20px;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const CartBadge = styled.span`
  position: absolute;
  top: -2px;
  right: -2px;
  background: #ef4444;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
`;

const Button = styled.button`
  background: ${props => props.variant === 'primary' ? '#3b82f6' : 'transparent'};
  color: ${props => props.variant === 'primary' ? 'white' : '#3b82f6'};
  border: ${props => props.variant === 'primary' ? 'none' : '2px solid #3b82f6'};
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.variant === 'primary' ? '#2563eb' : '#3b82f6'};
    color: white;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 24px;
  color: #374151;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const UserMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const UserDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 8px 0;
  min-width: 150px;
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const DropdownItem = styled.button`
  width: 100%;
  padding: 12px 16px;
  background: none;
  border: none;
  text-align: left;
  color: #374151;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsUserMenuOpen(false);
  };

  return (
    <Nav>
      <NavContainer>
        <Logo to="/">
          <div className="logo-container">
            <div className="logo-icon">
              <div className="logo-ap">AP</div>
              <div className="logo-lightning">⚡</div>
              <div className="logo-gear">⚙</div>
            </div>
            <div className="logo-text">
              <span className="logo-automate">AUTOMATE</span>
              <span className="logo-pro">PRO</span>
            </div>
          </div>
        </Logo>

        <NavLinks isOpen={isMenuOpen}>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/pricing">Pricing</NavLink>
          <NavLink to="/support">Support</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </NavLinks>

        <NavActions>
          <CartButton onClick={() => navigate('/checkout')}>
            <FiShoppingCart />
            {getTotalItems() > 0 && (
              <CartBadge>{getTotalItems()}</CartBadge>
            )}
          </CartButton>

          {isAuthenticated ? (
            <UserMenu>
              <Button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
                <FiUser />
                {user?.name}
              </Button>
              <UserDropdown isOpen={isUserMenuOpen}>
                <DropdownItem onClick={() => navigate('/dashboard')}>
                  <FiUser />
                  Dashboard
                </DropdownItem>
                <DropdownItem onClick={handleLogout}>
                  <FiLogOut />
                  Logout
                </DropdownItem>
              </UserDropdown>
            </UserMenu>
          ) : (
            <>
              <Button onClick={() => navigate('/login')}>Login</Button>
              <Button variant="primary" onClick={() => navigate('/register')}>
                Get Started
              </Button>
            </>
          )}

          <MobileMenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </MobileMenuButton>
        </NavActions>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;
