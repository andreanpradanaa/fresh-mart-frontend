import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt, faShoppingCart, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { theme } from '../../styles/theme';

const Card = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.md};
  overflow: hidden;
  transition: ${theme.transitions.normal};
  box-shadow: ${theme.shadows.sm};
  position: relative;
  border: 1px solid rgba(20, 184, 166, 0.1);

  &:hover {
    transform: translateY(-10px);
    box-shadow: ${theme.shadows.lg};
    border-color: rgba(20, 184, 166, 0.3);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.accent} 100%);
    opacity: 0;
    transition: opacity ${theme.transitions.normal};
  }

  &:hover::before {
    opacity: 1;
  }
`;

const ProductBadge = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  background: linear-gradient(135deg, ${theme.colors.secondary} 0%, ${theme.colors.secondaryDark} 100%);
  color: ${theme.colors.white};
  padding: 6px 12px;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: ${theme.typography.fontWeight.bold};
  z-index: 2;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: ${theme.shadows.sm};
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const WishlistButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: ${theme.colors.white};
  border: none;
  border-radius: 50%;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$isWishlisted ? theme.colors.secondary : theme.colors.grayDark};
  cursor: pointer;
  transition: ${theme.transitions.normal};
  z-index: 2;
  box-shadow: ${theme.shadows.sm};
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);

  &:hover {
    transform: scale(1.15) rotate(5deg);
    color: ${theme.colors.secondary};
    box-shadow: ${theme.shadows.md};
  }

  &:active {
    transform: scale(0.95) rotate(0deg);
  }
`;

const ProductImage = styled.div`
  height: 200px;
  background: ${theme.colors.grayLight};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  cursor: pointer;

  img {
    max-width: 80%;
    max-height: 80%;
    transition: transform 0.5s;
  }

  ${Card}:hover & img {
    transform: scale(1.1);
  }
`;

const ProductInfo = styled.div`
  padding: 20px;
`;

const ProductTitle = styled.h3`
  margin-bottom: 10px;
  font-size: 1.2rem;
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.black};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.typography.fontSize.base};
  }
`;

const ProductRating = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 10px;
  color: ${theme.colors.secondary};
`;

const RatingText = styled.span`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.grayDark};
  margin-left: 5px;
`;

const ProductPrice = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  flex-wrap: wrap;
`;

const CurrentPrice = styled.span`
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--teal, #14B8A6);

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 1.1rem;
  }
`;

const OriginalPrice = styled.span`
  text-decoration: line-through;
  color: var(--gray-dark, #6B7280);
  font-size: 0.9rem;
`;

const Discount = styled.span`
  color: var(--green, #10B981);
  font-weight: 700;
  font-size: 0.9rem;
  background: rgba(16, 185, 129, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
`;

const AddToCartButton = styled.button`
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, var(--teal, #14B8A6) 0%, var(--blue, #3B82F6) 100%);
  color: white;
  border: none;
  border-radius: 50px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 1rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1));
  }

  &:hover::before {
    left: 100%;
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

const renderStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FontAwesomeIcon key={i} icon={faStar} />);
  }

  if (hasHalfStar) {
    stars.push(<FontAwesomeIcon key="half" icon={faStarHalfAlt} />);
  }

  const remainingStars = 5 - Math.ceil(rating);
  for (let i = 0; i < remainingStars; i++) {
    stars.push(<FontAwesomeIcon key={`empty-${i}`} icon={faStarRegular} />);
  }

  return stars;
};

const ProductCard = ({ 
  product, 
  badge = 'Sale', 
  onAddToCart, 
  onWishlist, 
  onProductClick 
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      await onAddToCart(product);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    onWishlist && onWishlist(product, !isWishlisted);
  };

  const handleProductClick = () => {
    onProductClick && onProductClick(product);
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Card>
      {badge && <ProductBadge>{badge}</ProductBadge>}
      
      <WishlistButton 
        onClick={handleWishlist}
        $isWishlisted={isWishlisted}
        aria-label="Add to wishlist"
      >
        <FontAwesomeIcon icon={faHeart} />
      </WishlistButton>

      <ProductImage onClick={handleProductClick}>
        {product.image ? (
          <img src={product.image} alt={product.name} />
        ) : (
          <span style={{ fontSize: '4rem', opacity: '0.3' }}>
            {product.emoji || '📦'}
          </span>
        )}
      </ProductImage>

      <ProductInfo>
        <ProductTitle>{product.name}</ProductTitle>
        
        <ProductRating>
          {renderStars(product.rating || 0)}
          <RatingText>({product.reviews || 0})</RatingText>
        </ProductRating>

        <ProductPrice>
          <CurrentPrice>Rp {product.price.toLocaleString('id-ID')}</CurrentPrice>
          {product.originalPrice && (
            <OriginalPrice>Rp {product.originalPrice.toLocaleString('id-ID')}</OriginalPrice>
          )}
          {discountPercentage > 0 && (
            <Discount>-{discountPercentage}%</Discount>
          )}
        </ProductPrice>

        <AddToCartButton 
          onClick={handleAddToCart}
          disabled={isAddingToCart}
        >
          <FontAwesomeIcon icon={faShoppingCart} />
          {isAddingToCart ? 'Menambahkan...' : 'Tambah ke Keranjang'}
        </AddToCartButton>
      </ProductInfo>
    </Card>
  );
};

export default ProductCard;