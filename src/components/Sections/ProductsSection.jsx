import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { theme } from '../../styles/theme';
import { Container, Section, SectionTitle, ViewAllLink, Grid } from '../../styles/GlobalStyles';
import ProductCard from '../Product/ProductCard';

const sampleProducts = [
  {
    id: 1,
    name: 'Apel Merah Segar',
    price: 25000,
    originalPrice: 30000,
    rating: 4.5,
    reviews: 128,
    emoji: '🍎',
    badge: 'Sale',
  },
  {
    id: 2,
    name: 'Brokoli Organik',
    price: 15000,
    originalPrice: null,
    rating: 4.8,
    reviews: 95,
    emoji: '🥦',
    badge: 'Best Seller',
  },
  {
    id: 3,
    name: 'Jeruk Manis Import',
    price: 35000,
    originalPrice: 40000,
    rating: 4.3,
    reviews: 76,
    emoji: '🍊',
    badge: 'New',
  },
  {
    id: 4,
    name: 'Wortel Lokal Segar',
    price: 12000,
    originalPrice: 15000,
    rating: 4.6,
    reviews: 203,
    emoji: '🥕',
    badge: 'Sale',
  },
  {
    id: 5,
    name: 'Tomat Ceri Premium',
    price: 28000,
    originalPrice: null,
    rating: 4.7,
    reviews: 89,
    emoji: '🍅',
    badge: 'Premium',
  },
  {
    id: 6,
    name: 'Bayam Hijau Segar',
    price: 8000,
    originalPrice: 10000,
    rating: 4.4,
    reviews: 156,
    emoji: '🥬',
    badge: 'Sale',
  },
  {
    id: 7,
    name: 'Anggur Ungu Manis',
    price: 45000,
    originalPrice: 50000,
    rating: 4.9,
    reviews: 67,
    emoji: '🍇',
    badge: 'Limited',
  },
  {
    id: 8,
    name: 'Pisang Cavendish',
    price: 18000,
    originalPrice: null,
    rating: 4.2,
    reviews: 134,
    emoji: '🍌',
    badge: 'Fresh',
  },
];

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 30px;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  padding: 8px 16px;
  border: 2px solid ${props => props.$active ? theme.colors.primary : theme.colors.gray};
  background: ${props => props.$active ? theme.colors.primary : theme.colors.white};
  color: ${props => props.$active ? theme.colors.white : theme.colors.grayDark};
  border-radius: 50px;
  font-weight: ${theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: ${theme.transitions.normal};

  &:hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
    ${props => !props.$active && `
      background: ${theme.colors.primary};
      color: ${theme.colors.white};
    `}
  }
`;

const ProductsSection = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [cartItems, setCartItems] = useState([]);

  const filters = [
    { id: 'all', label: 'Semua' },
    { id: 'fruits', label: 'Buah' },
    { id: 'vegetables', label: 'Sayur' },
    { id: 'organic', label: 'Organik' },
    { id: 'sale', label: 'Diskon' },
  ];

  const handleAddToCart = async (product) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        setCartItems(prev => [...prev, product]);
        console.log('Added to cart:', product.name);
        resolve();
      }, 500);
    });
  };

  const handleWishlist = (product, isWishlisted) => {
    console.log(isWishlisted ? 'Added to wishlist:' : 'Removed from wishlist:', product.name);
  };

  const handleProductClick = (product) => {
    console.log('Product clicked:', product.name);
    // Generate slug from product name if not available
    const slug = product.slug || product.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    navigate(`/product/${slug}`);
  };

  const handleViewAll = () => {
    console.log('View all products clicked');
    // Implement navigation to products page
  };

  return (
    <Section>
      <Container>
        <SectionTitle>
          <h2>Produk Unggulan</h2>
          <ViewAllLink href="products" onClick={handleViewAll}>
            Lihat Semua
            <FontAwesomeIcon icon={faArrowRight} />
          </ViewAllLink>
        </SectionTitle>

        <FilterContainer>
          {filters.map((filter) => (
            <FilterButton
              key={filter.id}
              $active={activeFilter === filter.id}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </FilterButton>
          ))}
        </FilterContainer>

        <Grid cols={4} gap="20px">
          {sampleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onWishlist={handleWishlist}
              onProductClick={handleProductClick}
            />
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default ProductsSection;