import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShoppingCart, faStar, faCheck, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { theme } from '../../styles/theme';

const DetailContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  margin-bottom: 48px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

const ImageSection = styled.div`
  position: relative;
  background: ${props => props.customTheme?.background || 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)'};
  border-radius: ${theme.borderRadius.xl};
  padding: 40px;
  text-align: center;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProductEmoji = styled.div`
  font-size: 120px;
  margin-bottom: 16px;
  animation: ${props => props.animate ? 'bounce 2s infinite' : 'none'};
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-10px); }
    60% { transform: translateY(-5px); }
  }
  
  @media (max-width: 768px) {
    font-size: 100px;
  }
`;

const Badge = styled.span`
  background: ${props => {
    switch(props.type) {
      case 'Sale': return '#EF4444';
      case 'Best Seller': return '#F59E0B';
      case 'New': return '#10B981';
      case 'Premium': return '#8B5CF6';
      case 'Organic': return '#059669';
      case 'Fresh': return '#06B6D4';
      default: return props.customTheme?.primary || theme.colors.primary;
    }
  }};
  color: white;
  padding: 6px 12px;
  border-radius: ${theme.borderRadius.full};
  font-size: 12px;
  font-weight: ${theme.typography.fontWeight.semibold};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ProductHeader = styled.div`
  border-bottom: 1px solid ${theme.colors.grayLight};
  padding-bottom: 20px;
`;

const ProductTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.black};
  margin: 0 0 8px 0;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ProductSubtitle = styled.p`
  font-size: 1.1rem;
  color: ${theme.colors.grayDark};
  margin: 0;
`;

const RatingSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 16px;
`;

const Stars = styled.div`
  display: flex;
  gap: 2px;
`;

const Star = styled(FontAwesomeIcon)`
  color: ${props => props.filled ? '#F59E0B' : theme.colors.grayLight};
  font-size: 16px;
`;

const RatingText = styled.span`
  color: ${theme.colors.grayDark};
  font-size: 14px;
`;

const PriceSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 0;
  border-bottom: 1px solid ${theme.colors.grayLight};
`;

const CurrentPrice = styled.span`
  font-size: 2rem;
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${props => props.customTheme?.primary || theme.colors.primary};
`;

const OriginalPrice = styled.span`
  font-size: 1.5rem;
  color: ${theme.colors.grayMedium};
  text-decoration: line-through;
`;

const DiscountBadge = styled.span`
  background: #EF4444;
  color: white;
  padding: 4px 8px;
  border-radius: ${theme.borderRadius.sm};
  font-size: 12px;
  font-weight: ${theme.typography.fontWeight.semibold};
`;

const DescriptionSection = styled.div`
  padding: 20px 0;
`;

const DescriptionTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.black};
  margin: 0 0 12px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const DescriptionText = styled.p`
  color: ${theme.colors.grayDark};
  line-height: 1.6;
  margin: 0;
`;

const BenefitsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 16px 0 0 0;
`;

const BenefitItem = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  color: ${theme.colors.grayDark};
`;

const ActionSection = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 24px;
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const AddToCartButton = styled.button`
  flex: 1;
  padding: 16px 32px;
  background: ${props => props.customTheme?.primary || theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${theme.borderRadius.lg};
  font-size: 1.1rem;
  font-weight: ${theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: ${theme.transitions.normal};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  &:hover {
    background: ${props => props.customTheme?.primaryDark || theme.colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.lg};
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const WishlistButton = styled.button`
  padding: 16px;
  background: ${props => props.isWishlist ? '#EF4444' : theme.colors.white};
  color: ${props => props.isWishlist ? 'white' : theme.colors.grayDark};
  border: 2px solid ${props => props.isWishlist ? '#EF4444' : theme.colors.grayLight};
  border-radius: ${theme.borderRadius.lg};
  cursor: pointer;
  transition: ${theme.transitions.normal};
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    border-color: ${props => props.isWishlist ? '#DC2626' : (props.customTheme?.primary || theme.colors.primary)};
    color: ${props => props.isWishlist ? 'white' : (props.customTheme?.primary || theme.colors.primary)};
    transform: translateY(-2px);
  }
`;

const NutritionInfo = styled.div`
  background: ${props => props.customTheme?.background || '#F0FDF4'};
  border-radius: ${theme.borderRadius.lg};
  padding: 20px;
  margin-top: 20px;
`;

const NutritionTitle = styled.h4`
  font-size: 1rem;
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.black};
  margin: 0 0 12px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const NutritionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const NutritionItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #E5E7EB;
  font-size: 14px;
  
  &:last-child {
    border-bottom: none;
  }
`;

const UniversalProductDetail = ({ 
  product, 
  onAddToCart, 
  onWishlist, 
  isWishlist = false,
  config = {}
}) => {
  
  if (!product) return null;
  
  const handleAddToCart = () => {
    onAddToCart(product);
  };
  
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star 
        key={index} 
        icon={faStar} 
        filled={index < Math.floor(rating)}
      />
    ));
  };
  
  const { showNutrition = false, showBenefits = false, customTheme = {}, nutritionData = {}, benefits = [] } = config;
  
  return (
    <DetailContainer>
      <ImageSection customTheme={customTheme}>
        <ProductEmoji animate={config.animateEmoji}>{product.emoji}</ProductEmoji>
        {product.badge && <Badge type={product.badge} customTheme={customTheme}>{product.badge}</Badge>}
      </ImageSection>
      
      <InfoSection>
        <ProductHeader>
          <ProductTitle>{product.name}</ProductTitle>
          <ProductSubtitle>{product.category}</ProductSubtitle>
          
          <RatingSection>
            <Stars>{renderStars(product.rating)}</Stars>
            <RatingText>{product.rating} ({product.reviews} ulasan)</RatingText>
          </RatingSection>
        </ProductHeader>
        
        <PriceSection>
          <CurrentPrice customTheme={customTheme}>Rp {product.price.toLocaleString('id-ID')}</CurrentPrice>
          {product.originalPrice && (
            <>
              <OriginalPrice>Rp {product.originalPrice.toLocaleString('id-ID')}</OriginalPrice>
              <DiscountBadge>
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </DiscountBadge>
            </>
          )}
        </PriceSection>
        
        <DescriptionSection>
          <DescriptionTitle>
            <FontAwesomeIcon icon={faInfoCircle} />
            Deskripsi Produk
          </DescriptionTitle>
          <DescriptionText>{product.description}</DescriptionText>
          
          {showBenefits && benefits.length > 0 && (
            <BenefitsList>
              {benefits.map((benefit, index) => (
                <BenefitItem key={index}>
                  <FontAwesomeIcon icon={faCheck} color="#10B981" />
                  {benefit}
                </BenefitItem>
              ))}
            </BenefitsList>
          )}
        </DescriptionSection>
        
        {showNutrition && nutritionData && Object.keys(nutritionData).length > 0 && (
          <NutritionInfo customTheme={customTheme}>
            <NutritionTitle>
              <FontAwesomeIcon icon={faInfoCircle} />
              Informasi Nutrisi (per 100g)
            </NutritionTitle>
            <NutritionGrid>
              {Object.entries(nutritionData).map(([key, value]) => (
                <NutritionItem key={key}>
                  <span>{key}</span>
                  <span><strong>{value}</strong></span>
                </NutritionItem>
              ))}
            </NutritionGrid>
          </NutritionInfo>
        )}
        
        <ActionSection>
          <AddToCartButton onClick={handleAddToCart} customTheme={customTheme}>
            <FontAwesomeIcon icon={faShoppingCart} />
            Tambah ke Keranjang
          </AddToCartButton>
          
          <WishlistButton 
            onClick={() => onWishlist(product)}
            isWishlist={isWishlist}
            customTheme={customTheme}
          >
            <FontAwesomeIcon icon={faHeart} />
          </WishlistButton>
        </ActionSection>
      </InfoSection>
    </DetailContainer>
  );
};

export default UniversalProductDetail;