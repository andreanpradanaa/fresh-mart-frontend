import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { theme } from '../../styles/theme';

const BreadcrumbContainer = styled.nav`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 0;
  margin-bottom: 24px;
  font-size: 14px;
  color: ${theme.colors.grayDark};
  
  @media (max-width: 768px) {
    font-size: 12px;
    padding: 12px 0;
  }
`;

const BreadcrumbItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const BreadcrumbLink = styled(Link)`
  color: ${theme.colors.primary};
  text-decoration: none;
  transition: ${theme.transitions.fast};
  
  &:hover {
    color: ${theme.colors.primaryDark};
    text-decoration: underline;
  }
`;

const BreadcrumbText = styled.span`
  color: ${theme.colors.grayDark};
  font-weight: 500;
`;

const BreadcrumbCurrent = styled.span`
  color: ${theme.colors.grayDark};
  font-weight: 600;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 12px;
  color: ${theme.colors.grayMedium};
`;

const HomeIcon = styled(FontAwesomeIcon)`
  font-size: 14px;
  color: ${theme.colors.primary};
`;

const Breadcrumb = ({ items = [] }) => {
  const location = useLocation();
  
  // Default breadcrumb untuk halaman home
  const defaultItems = [
    { label: 'Beranda', path: '/', icon: faHome }
  ];
  
  // Gabungkan dengan items yang diberikan
  const breadcrumbItems = [...defaultItems, ...items];
  
  return (
    <BreadcrumbContainer aria-label="breadcrumb">
      {breadcrumbItems.map((item, index) => {
        const isLast = index === breadcrumbItems.length - 1;
        
        return (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              {item.icon && (
                <HomeIcon icon={item.icon} />
              )}
              
              {isLast ? (
                <BreadcrumbCurrent title={item.label}>
                  {item.label}
                </BreadcrumbCurrent>
              ) : (
                <BreadcrumbLink to={item.path}>
                  {item.label}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            
            {!isLast && (
              <Icon icon={faChevronRight} />
            )}
          </React.Fragment>
        );
      })}
    </BreadcrumbContainer>
  );
};

export default Breadcrumb;