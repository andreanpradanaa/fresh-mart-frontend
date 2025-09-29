import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faStar, 
  faStarHalfAlt, 
  faShoppingCart, 
  faHeart, 
  faMinus, 
  faPlus,
  faShare,
  faShieldAlt,
  faTruck,
  faHome,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { theme } from '../../styles/theme';
import { Container } from '../../styles/GlobalStyles';

const DetailContainer = styled.div`
  padding: 40px 0;
  background: ${theme.colors.white};
  min-height: 100vh;
`;

const BreadcrumbContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
  padding: 12px 0;
  font-size: 0.9rem;
`;

const BreadcrumbItem = styled.span`
  color: ${props => props.$isActive ? theme.colors.black : theme.colors.grayDark};
  font-weight: ${props => props.$isActive ? theme.typography.fontWeight.semibold : theme.typography.fontWeight.normal};
  cursor: ${props => props.$isClickable ? 'pointer' : 'default'};
  transition: ${theme.transitions.normal};
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    color: ${props => props.$isClickable ? theme.colors.primary : 'inherit'};
  }
`;

const BreadcrumbSeparator = styled(FontAwesomeIcon)`
  color: ${theme.colors.gray};
  font-size: 0.7rem;
`;

const ProductDetailGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  margin-bottom: 60px;

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const ImageSection = styled.div`
  position: relative;
`;

const MainImage = styled.div`
  width: 100%;
  height: 500px;
  background: ${theme.colors.grayLight};
  border-radius: ${theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  overflow: hidden;
  box-shadow: ${theme.shadows.md};

  img {
    max-width: 80%;
    max-height: 80%;
    object-fit: contain;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    height: 400px;
  }
`;

const ThumbnailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
`;

const Thumbnail = styled.div`
  width: 100%;
  height: 80px;
  background: ${theme.colors.grayLight};
  border-radius: ${theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 2px solid ${props => props.$active ? theme.colors.primary : 'transparent'};
  transition: ${theme.transitions.normal};

  &:hover {
    border-color: ${theme.colors.primary};
  }
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const ProductBadge = styled.span`
  display: inline-block;
  background: linear-gradient(135deg, ${theme.colors.secondary} 0%, ${theme.colors.secondaryDark} 100%);
  color: ${theme.colors.white};
  padding: 8px 16px;
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: ${theme.typography.fontWeight.bold};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  width: fit-content;
`;

const ProductTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.black};
  line-height: 1.2;
  margin: 0;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 2rem;
  }
`;

const RatingSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
`;

const StarRating = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${theme.colors.secondary};
`;

const RatingText = styled.span`
  font-size: 1.1rem;
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.black};
`;

const ReviewCount = styled.span`
  color: ${theme.colors.grayDark};
  font-size: 1rem;
`;

const PriceSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
`;

const CurrentPrice = styled.span`
  font-size: 2.5rem;
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.primary};

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 2rem;
  }
`;

const OriginalPrice = styled.span`
  font-size: 1.5rem;
  color: ${theme.colors.grayDark};
  text-decoration: line-through;
`;

const Discount = styled.span`
  background: ${theme.colors.success};
  color: ${theme.colors.white};
  padding: 8px 12px;
  border-radius: ${theme.borderRadius.md};
  font-weight: ${theme.typography.fontWeight.bold};
  font-size: 1rem;
`;

const Description = styled.div`
  h3 {
    font-size: 1.3rem;
    font-weight: ${theme.typography.fontWeight.semibold};
    color: ${theme.colors.black};
    margin-bottom: 15px;
  }

  p {
    color: ${theme.colors.grayDark};
    line-height: 1.6;
    font-size: 1.1rem;
  }
`;

const ActionSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 30px;
  background: ${theme.colors.grayLight};
  border-radius: ${theme.borderRadius.lg};
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const QuantityLabel = styled.span`
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.black};
  font-size: 1.1rem;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  border: 2px solid ${theme.colors.gray};
  border-radius: ${theme.borderRadius.md};
  overflow: hidden;
`;

const QuantityButton = styled.button`
  width: 45px;
  height: 45px;
  border: none;
  background: ${theme.colors.white};
  color: ${theme.colors.primary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: ${theme.transitions.normal};

  &:hover {
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const QuantityDisplay = styled.span`
  width: 60px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.white};
  font-weight: ${theme.typography.fontWeight.semibold};
  font-size: 1.1rem;
  border-left: 2px solid ${theme.colors.gray};
  border-right: 2px solid ${theme.colors.gray};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
`;

const AddToCartButton = styled.button`
  flex: 1;
  min-width: 200px;
  padding: 18px 30px;
  background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryDark} 100%);
  color: ${theme.colors.white};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-size: 1.1rem;
  font-weight: ${theme.typography.fontWeight.bold};
  cursor: pointer;
  transition: ${theme.transitions.normal};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.lg};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const WishlistButton = styled.button`
  padding: 18px;
  background: ${theme.colors.white};
  border: 2px solid ${theme.colors.primary};
  color: ${theme.colors.primary};
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  transition: ${theme.transitions.normal};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
    transform: translateY(-2px);
  }
`;

const ShareButton = styled.button`
  padding: 18px;
  background: ${theme.colors.white};
  border: 2px solid ${theme.colors.grayDark};
  color: ${theme.colors.grayDark};
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  transition: ${theme.transitions.normal};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${theme.colors.grayDark};
    color: ${theme.colors.white};
    transform: translateY(-2px);
  }
`;

const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: ${theme.colors.grayDark};
  font-size: 1rem;

  svg {
    color: ${theme.colors.success};
    width: 20px;
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

const ProductDetail = ({ product, onBack, onAddToCart, onWishlist }) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      await onAddToCart({ ...product, quantity });
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

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Mock images for demonstration
  const productImages = [
    product.emoji || '📦',
    product.emoji || '📦',
    product.emoji || '📦',
    product.emoji || '📦'
  ];

  return (
    <DetailContainer>
      <Container>
        <BreadcrumbContainer>
          <BreadcrumbItem 
            $isClickable={true} 
            onClick={() => navigate('/')}
          >
            <FontAwesomeIcon icon={faHome} />
            Home
          </BreadcrumbItem>
          
          <BreadcrumbSeparator icon={faChevronRight} />
          
          <BreadcrumbItem 
            $isClickable={true} 
            onClick={() => navigate('/products')}
          >
            {product?.category || 'Produk'}
          </BreadcrumbItem>
          
          <BreadcrumbSeparator icon={faChevronRight} />
          
          <BreadcrumbItem $isActive={true}>
            {product?.name || 'Detail Produk'}
          </BreadcrumbItem>
        </BreadcrumbContainer>

        <ProductDetailGrid>
          <ImageSection>
            <MainImage>
              {product.image ? (
                <img src={product.image} alt={product.name} />
              ) : (
                <span style={{ fontSize: '8rem', opacity: '0.3' }}>
                  {productImages[selectedImage]}
                </span>
              )}
            </MainImage>
            
            <ThumbnailGrid>
              {productImages.map((image, index) => (
                <Thumbnail
                  key={index}
                  $active={selectedImage === index}
                  onClick={() => setSelectedImage(index)}
                >
                  <span style={{ fontSize: '1.5rem', opacity: '0.6' }}>
                    {image}
                  </span>
                </Thumbnail>
              ))}
            </ThumbnailGrid>
          </ImageSection>

          <InfoSection>
            <ProductBadge>{product.badge || 'Fresh'}</ProductBadge>
            
            <ProductTitle>{product.name}</ProductTitle>
            
            <RatingSection>
              <StarRating>
                {renderStars(product.rating || 0)}
              </StarRating>
              <RatingText>{product.rating || 0}</RatingText>
              <ReviewCount>({product.reviews || 0} ulasan)</ReviewCount>
            </RatingSection>

            <PriceSection>
              <CurrentPrice>Rp {product.price.toLocaleString('id-ID')}</CurrentPrice>
              {product.originalPrice && (
                <OriginalPrice>Rp {product.originalPrice.toLocaleString('id-ID')}</OriginalPrice>
              )}
              {discountPercentage > 0 && (
                <Discount>Hemat {discountPercentage}%</Discount>
              )}
            </PriceSection>

            <Description>
              <h3>Deskripsi Produk</h3>
              <p>
                {product.description || `${product.name} adalah produk segar berkualitas tinggi yang dipilih khusus untuk Anda. Dengan kualitas terbaik dan rasa yang lezat, produk ini cocok untuk kebutuhan sehari-hari keluarga Anda. Dipetik langsung dari kebun dan disimpan dalam kondisi optimal untuk menjaga kesegaran.`}
              </p>
            </Description>

            <ActionSection>
              <QuantitySelector>
                <QuantityLabel>Jumlah:</QuantityLabel>
                <QuantityControls>
                  <QuantityButton 
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </QuantityButton>
                  <QuantityDisplay>{quantity}</QuantityDisplay>
                  <QuantityButton 
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= 10}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </QuantityButton>
                </QuantityControls>
              </QuantitySelector>

              <ButtonGroup>
                <AddToCartButton 
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                >
                  <FontAwesomeIcon icon={faShoppingCart} />
                  {isAddingToCart ? 'Menambahkan...' : 'Tambah ke Keranjang'}
                </AddToCartButton>
                
                <WishlistButton onClick={handleWishlist}>
                  <FontAwesomeIcon icon={faHeart} />
                </WishlistButton>
                
                <ShareButton>
                  <FontAwesomeIcon icon={faShare} />
                </ShareButton>
              </ButtonGroup>

              <FeatureList>
                <FeatureItem>
                  <FontAwesomeIcon icon={faShieldAlt} />
                  Jaminan kualitas terbaik
                </FeatureItem>
                <FeatureItem>
                  <FontAwesomeIcon icon={faTruck} />
                  Gratis ongkir untuk pembelian di atas Rp 100.000
                </FeatureItem>
              </FeatureList>
            </ActionSection>
          </InfoSection>
        </ProductDetailGrid>
      </Container>
    </DetailContainer>
  );
};

export default ProductDetail;