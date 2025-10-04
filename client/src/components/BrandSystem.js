import React from 'react';
import styled from 'styled-components';

// Brand Colors
export const brandColors = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6', // Main brand blue
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  secondary: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#8b5cf6', // Main brand purple
    600: '#7c3aed',
    700: '#6d28d9',
    800: '#5b21b6',
    900: '#4c1d95',
  },
  accent: {
    50: '#fefce8',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24', // Gold accent
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  neutral: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  }
};

// Typography System
export const typography = {
  fontFamily: {
    primary: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    secondary: '"Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: '"JetBrains Mono", "Fira Code", Consolas, monospace'
  },
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '3.75rem', // 60px
    '7xl': '4.5rem',  // 72px
    '8xl': '6rem',    // 96px
    '9xl': '8rem',    // 128px
  },
  fontWeight: {
    thin: 100,
    extralight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  }
};

// Spacing System
export const spacing = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
  32: '8rem',     // 128px
  40: '10rem',    // 160px
  48: '12rem',    // 192px
  56: '14rem',    // 224px
  64: '16rem',    // 256px
};

// Border Radius System
export const borderRadius = {
  none: '0',
  sm: '0.125rem',   // 2px
  base: '0.25rem',  // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  '3xl': '1.5rem',  // 24px
  full: '9999px',
};

// Shadow System
export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  none: 'none',
};

// Brand Logo Component
const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: ${typography.fontFamily.secondary};
  font-weight: ${typography.fontWeight.bold};
  font-size: ${typography.fontSize['2xl']};
  color: ${brandColors.primary[600]};
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  .logo-icon {
    width: 32px;
    height: 32px;
    background: linear-gradient(135deg, ${brandColors.primary[500]}, ${brandColors.secondary[500]});
    border-radius: ${borderRadius.lg};
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 18px;
    font-weight: ${typography.fontWeight.bold};
  }

  .logo-text {
    background: linear-gradient(135deg, ${brandColors.primary[600]}, ${brandColors.secondary[600]});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

export const BrandLogo = ({ size = 'md', showText = true }) => {
  const sizes = {
    sm: { icon: '20px', text: 'text-lg' },
    md: { icon: '32px', text: 'text-2xl' },
    lg: { icon: '48px', text: 'text-4xl' },
    xl: { icon: '64px', text: 'text-6xl' }
  };

  return (
    <LogoContainer style={{ fontSize: sizes[size]?.text }}>
      <div className="logo-icon" style={{ width: sizes[size]?.icon, height: sizes[size]?.icon }}>
        🤖
      </div>
      {showText && <span className="logo-text">AutomatePro</span>}
    </LogoContainer>
  );
};

// Brand Guidelines Component
const GuidelinesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  background: white;
  border-radius: ${borderRadius['2xl']};
  box-shadow: ${shadows.lg};
`;

const ColorPalette = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
`;

const ColorGroup = styled.div`
  h3 {
    font-size: ${typography.fontSize.lg};
    font-weight: ${typography.fontWeight.semibold};
    color: ${brandColors.neutral[800]};
    margin-bottom: 16px;
  }
`;

const ColorSwatch = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
  padding: 8px;
  border-radius: ${borderRadius.md};
  background: ${props => props.bg};
  color: ${props => props.textColor || brandColors.neutral[700]};
  font-family: ${typography.fontFamily.mono};
  font-size: ${typography.fontSize.sm};
`;

export const BrandGuidelines = () => {
  return (
    <GuidelinesContainer>
      <h2 style={{ 
        fontSize: typography.fontSize['4xl'], 
        fontWeight: typography.fontWeight.bold,
        color: brandColors.neutral[900],
        marginBottom: '32px',
        textAlign: 'center'
      }}>
        AutomatePro Brand Guidelines
      </h2>

      <ColorPalette>
        <ColorGroup>
          <h3>Primary Colors</h3>
          {Object.entries(brandColors.primary).map(([key, value]) => (
            <ColorSwatch key={key} bg={value} textColor={parseInt(key) > 400 ? 'white' : brandColors.neutral[700]}>
              <div style={{ width: '20px', height: '20px', backgroundColor: value, borderRadius: '4px' }}></div>
              {key}: {value}
            </ColorSwatch>
          ))}
        </ColorGroup>

        <ColorGroup>
          <h3>Secondary Colors</h3>
          {Object.entries(brandColors.secondary).map(([key, value]) => (
            <ColorSwatch key={key} bg={value} textColor={parseInt(key) > 400 ? 'white' : brandColors.neutral[700]}>
              <div style={{ width: '20px', height: '20px', backgroundColor: value, borderRadius: '4px' }}></div>
              {key}: {value}
            </ColorSwatch>
          ))}
        </ColorGroup>

        <ColorGroup>
          <h3>Accent Colors</h3>
          {Object.entries(brandColors.accent).map(([key, value]) => (
            <ColorSwatch key={key} bg={value} textColor={parseInt(key) > 400 ? 'white' : brandColors.neutral[700]}>
              <div style={{ width: '20px', height: '20px', backgroundColor: value, borderRadius: '4px' }}></div>
              {key}: {value}
            </ColorSwatch>
          ))}
        </ColorGroup>
      </ColorPalette>

      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ 
          fontSize: typography.fontSize['2xl'], 
          fontWeight: typography.fontWeight.semibold,
          color: brandColors.neutral[800],
          marginBottom: '16px'
        }}>
          Typography
        </h3>
        <div style={{ 
          fontFamily: typography.fontFamily.primary,
          fontSize: typography.fontSize.lg,
          lineHeight: typography.lineHeight.relaxed,
          color: brandColors.neutral[600]
        }}>
          <p><strong>Primary Font:</strong> Inter - Clean, modern, highly readable</p>
          <p><strong>Secondary Font:</strong> Poppins - Friendly, approachable, great for headings</p>
          <p><strong>Monospace Font:</strong> JetBrains Mono - Perfect for code and technical content</p>
        </div>
      </div>

      <div>
        <h3 style={{ 
          fontSize: typography.fontSize['2xl'], 
          fontWeight: typography.fontWeight.semibold,
          color: brandColors.neutral[800],
          marginBottom: '16px'
        }}>
          Logo Usage
        </h3>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
          <BrandLogo size="sm" />
          <BrandLogo size="md" />
          <BrandLogo size="lg" />
          <BrandLogo size="xl" />
        </div>
      </div>
    </GuidelinesContainer>
  );
};

export default {
  colors: brandColors,
  typography,
  spacing,
  borderRadius,
  shadows,
  BrandLogo,
  BrandGuidelines
};
