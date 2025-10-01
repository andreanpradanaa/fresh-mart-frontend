import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf, faSearch, faUser, faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { theme } from '../../styles/theme';
import { Container } from '../../styles/GlobalStyles';

const HeaderContainer = styled.header`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: ${theme.shadows.sm};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 15px 0;
  transition: ${theme.transitions.normal};
  border-bottom: 1px solid rgba(20, 184, 166, 0.1);

  &.scrolled {
    background: rgba(255, 255, 255, 0.98);
    box-shadow: ${theme.shadows.md};
    border-bottom: 1px solid rgba(20, 184, 166, 0.2);
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 10px 0;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;

  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
    gap: 15px;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  font-size: 1.8rem;
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.primary};
  text-decoration: none;
  transition: ${theme.transitions.normal};
  position: relative;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.accent} 100%);
    transition: width ${theme.transitions.normal};
  }

  &:hover::after {
    width: 100%;
  }

  svg {
    font-size: 2.2rem;
    background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.accent} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 2px 4px rgba(20, 184, 166, 0.3));
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: ${theme.colors.grayLight};
  border-radius: 3.125rem;
  padding: 0.5rem 1.25rem;
  flex: 1;
  max-width: 25rem;
  box-shadow: ${theme.shadows.sm};
  border: 0.125rem solid transparent;
  transition: ${theme.transitions.normal};

  &:focus-within {
    border-color: ${theme.colors.primary};
    box-shadow: ${theme.shadows.md};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    width: 100%;
    max-width: none;
    order: 3;
  }
`;

const SearchInput = styled.input`
  border: none;
  background: transparent;
  padding: 8px;
  width: 100%;
  font-size: ${theme.typography.fontSize.base};
  outline: none;
  color: ${theme.colors.black};
  min-width: 0;

  &::placeholder {
    color: ${theme.colors.grayDark};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.typography.fontSize.sm};
  }
`;

const SearchIcon = styled(FontAwesomeIcon)`
  color: ${theme.colors.grayDark};
  margin-right: 10px;
`;

const HeaderIcons = styled.div`
  display: flex;
  gap: 1.25rem;
  align-items: center;
`;

const IconButton = styled.button`
  position: relative;
  background: ${theme.colors.grayLight};
  width: 2.8125rem;
  height: 2.8125rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.grayDark};
  border: none;
  cursor: pointer;
  transition: ${theme.transitions.normal};
  box-shadow: ${theme.shadows.sm};

  &:hover {
    transform: translateY(-0.1875rem);
    box-shadow: ${theme.shadows.md};
    color: ${theme.colors.primary};
  }

  &:active {
    transform: translateY(-0.0625rem);
  }
`;

const CartCount = styled.span`
  position: absolute;
  top: -0.3125rem;
  right: -0.3125rem;
  background: ${theme.colors.secondary};
  color: white;
  border-radius: 50%;
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: ${theme.typography.fontWeight.bold};
  animation: pulse 2s infinite;

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${theme.colors.primary};
  cursor: pointer;

  @media (max-width: ${theme.breakpoints.md}) {
    display: block;
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(3);

  // Handle scroll effect
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Implement search functionality here
  };

  return (
    <HeaderContainer className={isScrolled ? 'scrolled' : ''}>
      <Container>
        <HeaderContent>
          <Logo onClick={handleLogoClick}>
            <FontAwesomeIcon icon={faLeaf} />
            FreshMart
          </Logo>
          
          <SearchBar as="form" onSubmit={handleSearch}>
            <SearchIcon icon={faSearch} />
            <SearchInput
              type="text"
              placeholder="Cari produk segar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchBar>
          
          <HeaderIcons>
            <IconButton aria-label="User Account">
              <FontAwesomeIcon icon={faUser} />
            </IconButton>
            <IconButton aria-label="Wishlist">
              <FontAwesomeIcon icon={faHeart} />
            </IconButton>
            <IconButton aria-label="Shopping Cart">
              <FontAwesomeIcon icon={faShoppingCart} />
              {cartCount > 0 && <CartCount>{cartCount}</CartCount>}
            </IconButton>
            <MobileMenuButton aria-label="Menu">
              <FontAwesomeIcon icon="bars" />
            </MobileMenuButton>
          </HeaderIcons>
        </HeaderContent>
      </Container>
    </HeaderContainer>
  );
};

export default Header;