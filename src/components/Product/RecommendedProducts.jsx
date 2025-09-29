import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { theme } from '../../styles/theme';
import { Container, Grid } from '../../styles/GlobalStyles';
import ProductCard from './ProductCard';

const RecommendedSection = styled.section`
  padding: 60px 0;
  background: linear-gradient(135deg, #F0FDF4 0%, #ECFDF5 100%);
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  flex-wrap: wrap;
  gap: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.black};
  margin: 0;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 60px;
    height: 4px;
    background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.accent} 100%);
    border-radius: 2px;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 2rem;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 1.75rem;
  }
`;

const ViewAllLink = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${theme.colors.primary};
  text-decoration: none;
  font-weight: ${theme.typography.fontWeight.semibold};
  font-size: 1.1rem;
  transition: ${theme.transitions.normal};
  padding: 12px 20px;
  border: 2px solid ${theme.colors.primary};
  border-radius: ${theme.borderRadius.md};
  background: ${theme.colors.white};

  &:hover {
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.md};
  }

  svg {
    transition: transform ${theme.transitions.normal};
  }

  &:hover svg {
    transform: translateX(5px);
  }
`;

const ProductGrid = styled(Grid)`
  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: ${theme.colors.grayDark};

  h3 {
    font-size: 1.5rem;
    margin-bottom: 10px;
    color: ${theme.colors.black};
  }

  p {
    font-size: 1.1rem;
    line-height: 1.6;
  }
`;

const LoadingState = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const LoadingCard = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.md};
  overflow: hidden;
  box-shadow: ${theme.shadows.sm};
  animation: pulse 1.5s ease-in-out infinite;

  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
`;

const LoadingImage = styled.div`
  height: 200px;
  background: ${theme.colors.grayLight};
`;

const LoadingContent = styled.div`
  padding: 20px;
`;

const LoadingLine = styled.div`
  height: 16px;
  background: ${theme.colors.grayLight};
  border-radius: 4px;
  margin-bottom: 10px;

  &:nth-child(1) {
    width: 80%;
  }

  &:nth-child(2) {
    width: 60%;
  }

  &:nth-child(3) {
    width: 90%;
  }

  &:nth-child(4) {
    width: 100%;
    height: 40px;
    margin-top: 15px;
  }
`;

const RecommendedProducts = ({ 
  products = [], 
  currentProductId,
  onAddToCart, 
  onWishlist, 
  onProductClick,
  onViewAll,
  loading = false,
  title = "Produk Rekomendasi",
  showViewAll = true
}) => {
  // Filter out current product and limit to 4 recommendations
  const recommendedProducts = products
    .filter(product => product.id !== currentProductId)
    .slice(0, 4);

  const handleViewAll = () => {
    onViewAll && onViewAll();
  };

  if (loading) {
    return (
      <RecommendedSection>
        <Container>
          <SectionHeader>
            <SectionTitle>{title}</SectionTitle>
          </SectionHeader>
          
          <LoadingState>
            {[...Array(4)].map((_, index) => (
              <LoadingCard key={index}>
                <LoadingImage />
                <LoadingContent>
                  <LoadingLine />
                  <LoadingLine />
                  <LoadingLine />
                  <LoadingLine />
                </LoadingContent>
              </LoadingCard>
            ))}
          </LoadingState>
        </Container>
      </RecommendedSection>
    );
  }

  if (recommendedProducts.length === 0) {
    return (
      <RecommendedSection>
        <Container>
          <SectionHeader>
            <SectionTitle>{title}</SectionTitle>
          </SectionHeader>
          
          <EmptyState>
            <h3>Belum Ada Rekomendasi</h3>
            <p>Maaf, saat ini belum ada produk rekomendasi yang tersedia. Silakan jelajahi kategori produk lainnya.</p>
          </EmptyState>
        </Container>
      </RecommendedSection>
    );
  }

  return (
    <RecommendedSection>
      <Container>
        <SectionHeader>
          <SectionTitle>{title}</SectionTitle>
          {showViewAll && (
            <ViewAllLink href="#products" onClick={handleViewAll}>
              Lihat Semua
              <FontAwesomeIcon icon={faArrowRight} />
            </ViewAllLink>
          )}
        </SectionHeader>
        
        <ProductGrid cols={4} gap="20px">
          {recommendedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onWishlist={onWishlist}
              onProductClick={onProductClick}
            />
          ))}
        </ProductGrid>
      </Container>
    </RecommendedSection>
  );
};

export default RecommendedProducts;