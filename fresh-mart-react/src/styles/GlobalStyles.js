import styled, { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
  :root {
    --teal: #14B8A6;
    --blue: #3B82F6;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: ${theme.typography.fontFamily.primary};
    background: linear-gradient(135deg, #F0FDF4 0%, #ECFDF5 100%);
    color: ${theme.colors.black};
    line-height: 1.6;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    text-decoration: none;
    color: inherit;
    transition: ${theme.transitions.normal};
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
    font-family: inherit;
    transition: ${theme.transitions.normal};
  }

  input, textarea {
    font-family: inherit;
    outline: none;
    border: none;
  }

  ul, ol {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.grayLight};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.primary};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.primaryDark};
  }
`;

export const Container = styled.div`
  max-width: 75rem;
  margin: 0 auto;
  padding: 0 1.25rem;
  width: 100%;

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 0 1rem;
  }
`;

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 30px;
  background: ${props => props.$variant === 'outline' ? 'transparent' : theme.colors.white};
  color: ${props => props.$variant === 'outline' ? theme.colors.white : theme.colors.primary};
  border: ${props => props.$variant === 'outline' ? `2px solid ${theme.colors.white}` : 'none'};
  border-radius: 50px;
  font-weight: ${theme.typography.fontWeight.bold};
  font-size: ${theme.typography.fontSize.base};
  box-shadow: ${theme.shadows.md};
  transition: ${theme.transitions.normal};

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${theme.shadows.xl};
    ${props => props.$variant === 'outline' && `
      background: ${theme.colors.white};
      color: ${theme.colors.primary};
    `}
  }

  &:active {
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

export const Card = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.md};
  box-shadow: ${theme.shadows.sm};
  transition: ${theme.transitions.normal};
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.lg};
  }
`;

export const Section = styled.section`
  margin: 40px 0;

  @media (max-width: ${theme.breakpoints.md}) {
    margin: 30px 0;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    margin: 20px 0;
  }
`;

export const SectionTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;

  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }

  h2 {
    font-size: ${theme.typography.fontSize['3xl']};
    color: ${theme.colors.primary};
    position: relative;
    display: inline-block;
    font-weight: ${theme.typography.fontWeight.bold};

    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 50px;
      height: 4px;
      background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.accent} 100%);
      border-radius: 2px;
    }

    @media (max-width: ${theme.breakpoints.sm}) {
      font-size: ${theme.typography.fontSize['2xl']};
    }
  }
`;

export const ViewAllLink = styled.a`
  color: ${theme.colors.accent};
  font-weight: ${theme.typography.fontWeight.bold};
  display: flex;
  align-items: center;
  gap: 5px;
  transition: ${theme.transitions.normal};

  &:hover {
    transform: translateX(5px);
    color: ${theme.colors.accentDark};
  }
`;

export const Grid = styled.div`
  display: grid;
  gap: ${props => props.gap || '1.25rem'};
  grid-template-columns: ${props => {
    switch (props.cols) {
      case 2: return 'repeat(2, 1fr)';
      case 3: return 'repeat(3, 1fr)';
      case 4: return 'repeat(4, 1fr)';
      case 5: return 'repeat(5, 1fr)';
      default: return 'repeat(auto-fill, minmax(15.625rem, 1fr))';
    }
  }};

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: repeat(auto-fill, minmax(12.5rem, 1fr));
  }

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr 1fr;
    gap: 0.9375rem;
  }

  @media (max-width: 25rem) {
    grid-template-columns: 1fr;
    gap: 0.9375rem;
  }
`;