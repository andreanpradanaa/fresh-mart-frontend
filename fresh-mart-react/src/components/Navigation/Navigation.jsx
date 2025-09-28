import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faAppleAlt, faWineBottle, faUtensils, faTshirt, faMobileAlt, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { theme } from '../../styles/theme';
import { Section } from '../../styles/GlobalStyles';

const NavigationContainer = styled.nav`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: ${theme.borderRadius.md};
  margin: 0 auto;
  box-shadow: ${theme.shadows.sm};
  position: relative;
  width: 100%;
  max-width: 75rem;
  padding: 0 1.25rem;
  box-sizing: border-box;
  border: 1px solid rgba(20, 184, 166, 0.1);

  @media (max-width: ${theme.breakpoints.md}) {
    border-radius: ${theme.borderRadius.sm};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 0 1rem;
  }
`;

const NavLinks = styled.ul`
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 0.9375rem 0;
  margin: 0;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
    padding: 0;
    max-height: ${props => props.$isOpen ? '25rem' : '0'};
    overflow: hidden;
    transition: max-height ${theme.transitions.slow};
    overflow-x: visible;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    flex-wrap: wrap;
    justify-content: flex-start;
  }
`;

const NavItem = styled.li`
  margin: 0 1.25rem;

  @media (max-width: ${theme.breakpoints.md}) {
    margin: 0;
    border-bottom: 0.0625rem solid ${theme.colors.grayLight};
  }
`;

const NavLink = styled.a`
  text-decoration: none;
  color: ${theme.colors.grayDark};
  font-weight: ${theme.typography.fontWeight.semibold};
  font-size: 1.1rem;
  padding: 0.5rem 1rem;
  border-radius: 3.125rem;
  transition: ${theme.transitions.normal};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;

  &:hover, &.active {
    background: linear-gradient(135deg, ${theme.colors.primaryLight} 0%, ${theme.colors.accentLight} 100%);
    color: ${theme.colors.white};
    transform: translateY(-0.125rem);
    box-shadow: ${theme.shadows.sm};
  }

  &.active::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 2px;
    background: ${theme.colors.primary};
    border-radius: 1px;
    transition: width ${theme.transitions.normal};
  }

  &:hover::after {
    width: 30px;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 0.9375rem 1.25rem;
    border-radius: 0;
    justify-content: flex-start;
    width: 100%;
    white-space: normal;

    &:hover, &.active {
      background: ${theme.colors.primary};
      transform: none;
    }
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 1rem;
    margin: 5px 10px;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${theme.colors.primary};
  cursor: pointer;
  padding: 0.9375rem 1.25rem;
  width: 100%;
  text-align: left;
  border-bottom: 0.0625rem solid ${theme.colors.grayLight};

  @media (max-width: ${theme.breakpoints.md}) {
    display: block;
  }

  &:hover {
    background: ${theme.colors.grayLight};
  }
`;

const navItems = [
  { id: 'home', label: 'Beranda', icon: faHome, href: '#home' },
  { id: 'fruits', label: 'Buah & Sayur', icon: faAppleAlt, href: '#fruits' },
  { id: 'drinks', label: 'Minuman', icon: faWineBottle, href: '#drinks' },
  { id: 'food', label: 'Makanan', icon: faUtensils, href: '#food' },
  { id: 'clothing', label: 'Pakaian', icon: faTshirt, href: '#clothing' },
  { id: 'electronics', label: 'Elektronik', icon: faMobileAlt, href: '#electronics' },
];

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('home');

  const handleNavClick = (itemId) => {
    setActiveItem(itemId);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Section style={{ margin: '20px 0' }}>
      <NavigationContainer>
        <MobileMenuButton onClick={toggleMenu}>
          <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
          {' '}
          Menu
        </MobileMenuButton>
        <NavLinks $isOpen={isMenuOpen}>
          {navItems.map((item) => (
            <NavItem key={item.id}>
              <NavLink
                href={item.href}
                className={activeItem === item.id ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
              >
                <FontAwesomeIcon icon={item.icon} />
                {item.label}
              </NavLink>
            </NavItem>
          ))}
        </NavLinks>
      </NavigationContainer>
    </Section>
  );
};

export default Navigation;