import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLeaf, 
  faSearch, 
  faUser, 
  faHeart, 
  faShoppingCart, 
  faChevronRight,
  faHome
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { theme } from '../../styles/theme';
import { Container } from '../../styles/GlobalStyles';

const HeaderContainer = styled.header`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  box-shadow: ${theme.shadows.sm};
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid rgba(20, 184, 166, 0.1);
  transition: ${theme.transitions.normal};
`;

const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 15px 0;

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 10px 0;
    gap: 10px;
  }
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;

  @media (max-width: ${theme.breakpoints.md}) {
    flex-wrap: wrap;
    gap: 15px;
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex: 1;

  @media (max-width: ${theme.breakpoints.md}) {
    gap: 15px;
    flex: none;
    width: 100%;
    order: 1;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.6rem;
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.primary};
  transition: ${theme.transitions.normal};

  svg {
    font-size: 1.8rem;
    background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.accent} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 2px 4px rgba(20, 184, 166, 0.3));
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 1.4rem;
    
    svg {
      font-size: 1.6rem;
    }
  }
`;

const SearchSection = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  max-width: 400px;
  margin: 0 20px;

  @media (max-width: ${theme.breakpoints.md}) {
    max-width: none;
    margin: 0;
    order: 3;
    width: 100%;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: ${theme.colors.grayLight};
  border-radius: 25px;
  padding: 8px 16px;
  width: 100%;
  box-shadow: ${theme.shadows.sm};
  border: 2px solid transparent;
  transition: ${theme.transitions.normal};

  &:focus-within {
    border-color: ${theme.colors.primary};
    box-shadow: ${theme.shadows.md};
  }
`;

const SearchInput = styled.input`
  border: none;
  background: transparent;
  padding: 6px 8px;
  width: 100%;
  font-size: ${theme.typography.fontSize.sm};
  outline: none;
  color: ${theme.colors.black};

  &::placeholder {
    color: ${theme.colors.grayDark};
  }
`;

const SearchIcon = styled(FontAwesomeIcon)`
  color: ${theme.colors.grayDark};
  margin-right: 8px;
  font-size: 0.9rem;
`;

const HeaderIcons = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;

  @media (max-width: ${theme.breakpoints.md}) {
    order: 2;
  }
`;

const IconButton = styled.button`
  position: relative;
  background: ${theme.colors.grayLight};
  width: 42px;
  height: 42px;
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
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.md};
    color: ${theme.colors.primary};
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    width: 38px;
    height: 38px;
  }
`;

const CartCount = styled.span`
  position: absolute;
  top: -4px;
  right: -4px;
  background: ${theme.colors.secondary};
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;
  font-weight: ${theme.typography.fontWeight.bold};
  animation: pulse 2s infinite;

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
`;

const BreadcrumbContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
  border-top: 1px solid rgba(20, 184, 166, 0.1);

  @media (max-width: ${theme.breakpoints.sm}) {
    gap: 6px;
    padding: 6px 0;
  }
`;

const BreadcrumbItem = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  color: ${props => props.$isActive ? theme.colors.primary : theme.colors.grayDark};
  font-weight: ${props => props.$isActive ? theme.typography.fontWeight.semibold : theme.typography.fontWeight.normal};
  cursor: ${props => props.$isClickable ? 'pointer' : 'default'};
  transition: ${theme.transitions.normal};

  &:hover {
    color: ${props => props.$isClickable ? theme.colors.primary : 'inherit'};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 0.8rem;
    gap: 6px;
  }
`;

const BreadcrumbSeparator = styled(FontAwesomeIcon)`
  color: ${theme.colors.grayDark};
  font-size: 0.7rem;
  opacity: 0.6;
`;

const ProductDetailHeader = ({ 
  cartItems = [], 
  wishlistItems = [], 
  searchQuery = '', 
  onSearch = () => {}, 
  product = null 
}) => {
  const navigate = useNavigate();
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleSearchChange = (e) => {
    setLocalSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  const getCategoryName = (product) => {
    if (!product) return 'Produk';
    
    // Map category based on product type or category field
    const categoryMap = {
      'fruit': 'Buah & Sayur',
      'vegetable': 'Buah & Sayur',
      'drink': 'Minuman',
      'food': 'Makanan',
      'clothing': 'Pakaian',
      'electronics': 'Elektronik'
    };
    
    return categoryMap[product.category] || 'Produk';
  };

  return (
    <HeaderContainer>
      <Container>
        <HeaderContent>
          <TopRow>
            <LeftSection>
              <Logo>
                <FontAwesomeIcon icon={faLeaf} />
                FreshMart
              </Logo>
            </LeftSection>

            <SearchSection>
              <SearchBar>
                <SearchIcon icon={faSearch} />
                <SearchInput
                  type="text"
                  placeholder="Cari produk lainnya..."
                  value={localSearchQuery}
                  onChange={handleSearchChange}
                />
              </SearchBar>
            </SearchSection>

            <HeaderIcons>
              <IconButton>
                <FontAwesomeIcon icon={faUser} />
              </IconButton>
              <IconButton>
                <FontAwesomeIcon icon={faHeart} />
                {wishlistItems.length > 0 && (
                  <CartCount>{wishlistItems.length}</CartCount>
                )}
              </IconButton>
              <IconButton>
                <FontAwesomeIcon icon={faShoppingCart} />
                {cartItems.length > 0 && (
                  <CartCount>{cartItems.length}</CartCount>
                )}
              </IconButton>
            </HeaderIcons>
          </TopRow>

          <BreadcrumbContainer>
            <BreadcrumbItem $isClickable onClick={handleHomeClick}>
              <FontAwesomeIcon icon={faHome} />
              Beranda
            </BreadcrumbItem>
            <BreadcrumbSeparator icon={faChevronRight} />
            <BreadcrumbItem $isClickable>
              {getCategoryName(product)}
            </BreadcrumbItem>
            <BreadcrumbSeparator icon={faChevronRight} />
            <BreadcrumbItem $isActive>
              {product?.name || 'Detail Produk'}
            </BreadcrumbItem>
          </BreadcrumbContainer>
        </HeaderContent>
      </Container>
    </HeaderContainer>
  );
};

export default ProductDetailHeader;