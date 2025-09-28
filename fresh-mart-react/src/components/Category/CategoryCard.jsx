import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { theme } from '../../styles/theme';

const CategoryIcon = styled.div`
  width: clamp(50px, 12vw, 70px);
  height: clamp(50px, 12vw, 70px);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 15px;
  font-size: clamp(1.4rem, 4vw, 1.8rem);
  transition: ${theme.transitions.normal};
  background: linear-gradient(135deg, ${theme.colors.primaryLight} 0%, ${theme.colors.accentLight} 100%);
  color: ${theme.colors.white};
  box-shadow: ${theme.shadows.md};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 70%);
    border-radius: 50%;
  }

  svg {
    position: relative;
    z-index: 1;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
  }
`;

const Card = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.md};
  padding: 25px 20px;
  text-align: center;
  transition: ${theme.transitions.normal};
  box-shadow: ${theme.shadows.sm};
  cursor: pointer;
  border: 1px solid rgba(20, 184, 166, 0.1);
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-10px);
    box-shadow: ${theme.shadows.lg};
    border-color: rgba(20, 184, 166, 0.3);
    
    ${CategoryIcon} {
      transform: scale(1.15) rotate(10deg);
      box-shadow: ${theme.shadows.lg};
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    transition: left 0.5s;
  }

  &:hover::before {
    left: 100%;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.accent} 100%);
    opacity: 0.8;
  }
`;

const CategoryTitle = styled.h3`
  margin-bottom: 10px;
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.black};
`;

const CategoryDescription = styled.p`
  color: ${theme.colors.grayDark};
  font-size: ${theme.typography.fontSize.sm};
  line-height: 1.4;
`;

const CategoryCard = ({ icon, title, description, onClick, color }) => {
  return (
    <Card onClick={onClick} role="button" tabIndex={0}>
      <CategoryIcon style={{ background: color }}>
        <FontAwesomeIcon icon={icon} />
      </CategoryIcon>
      <CategoryTitle>{title}</CategoryTitle>
      <CategoryDescription>{description}</CategoryDescription>
    </Card>
  );
};

export default CategoryCard;