import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, 
  faFilter, 
  faSortAmountDown, 
  faSortAmountUp,
  faTh,
  faList,
  faChevronDown
} from '@fortawesome/free-solid-svg-icons';
import { theme } from '../styles/theme';
import { Container } from '../styles/GlobalStyles';
import ProductCard from '../components/Product/ProductCard';

// Extended sample products data
const allProducts = [
  {
    id: 1,
    name: 'Apel Merah Segar',
    price: 25000,
    originalPrice: 30000,
    rating: 4.5,
    reviews: 128,
    emoji: '🍎',
    badge: 'Sale',
    category: 'fruits',
    description: 'Apel merah segar yang dipetik langsung dari kebun organik.',
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
    category: 'vegetables',
    description: 'Brokoli organik segar tanpa pestisida.',
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
    category: 'fruits',
    description: 'Jeruk manis import dengan kualitas premium.',
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
    category: 'vegetables',
    description: 'Wortel lokal segar dengan nutrisi tinggi.',
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
    category: 'vegetables',
    description: 'Tomat ceri premium dengan rasa manis alami.',
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
    category: 'vegetables',
    description: 'Bayam hijau segar kaya akan zat besi.',
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
    category: 'fruits',
    description: 'Anggur ungu manis dengan kualitas premium.',
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
    category: 'fruits',
    description: 'Pisang Cavendish segar dengan tekstur lembut.',
  },
  {
    id: 9,
    name: 'Kentang Organik',
    price: 20000,
    originalPrice: 25000,
    rating: 4.3,
    reviews: 112,
    emoji: '🥔',
    badge: 'Organic',
    category: 'vegetables',
    description: 'Kentang organik berkualitas tinggi.',
  },
  {
    id: 10,
    name: 'Mangga Harum Manis',
    price: 32000,
    originalPrice: null,
    rating: 4.8,
    reviews: 98,
    emoji: '🥭',
    badge: 'Best Seller',
    category: 'fruits',
    description: 'Mangga harum manis dengan aroma yang menggoda.',
  },
  {
    id: 11,
    name: 'Cabai Merah Keriting',
    price: 35000,
    originalPrice: 40000,
    rating: 4.1,
    reviews: 87,
    emoji: '🌶️',
    badge: 'Hot',
    category: 'vegetables',
    description: 'Cabai merah keriting dengan tingkat kepedasan sedang.',
  },
  {
    id: 12,
    name: 'Alpukat Mentega',
    price: 28000,
    originalPrice: null,
    rating: 4.6,
    reviews: 145,
    emoji: '🥑',
    badge: 'Premium',
    category: 'fruits',
    description: 'Alpukat mentega dengan tekstur lembut dan creamy.',
  },
];

const PageHeader = styled.div`
  background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.accent} 100%);
  color: ${theme.colors.white};
  padding: 60px 0;
  margin-bottom: 40px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/><circle cx="10" cy="60" r="0.5" fill="white" opacity="0.1"/><circle cx="90" cy="40" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    opacity: 0.3;
  }
`;

const HeaderContent = styled(Container)`
  position: relative;
  z-index: 1;
  text-align: center;
`;

const PageTitle = styled.h1`
  font-size: 3rem;
  font-weight: ${theme.typography.fontWeight.bold};
  margin-bottom: 15px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 2.5rem;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 2rem;
  }
`;

const PageSubtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 1rem;
  }
`;

const FilterSection = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: ${theme.shadows.md};
  border: 1px solid rgba(20, 184, 166, 0.1);
`;

const FilterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
  justify-content: space-between;

  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  max-width: 400px;

  @media (max-width: ${theme.breakpoints.md}) {
    max-width: 100%;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 15px 50px 15px 20px;
  border: 2px solid ${theme.colors.gray};
  border-radius: ${theme.borderRadius.lg};
  font-size: 1rem;
  transition: ${theme.transitions.normal};

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.1);
  }

  &::placeholder {
    color: ${theme.colors.grayDark};
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.colors.grayDark};
  cursor: pointer;
  transition: ${theme.transitions.normal};

  &:hover {
    color: ${theme.colors.primary};
  }
`;

const FilterGroup = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: ${theme.breakpoints.sm}) {
    justify-content: center;
  }
`;

const FilterButton = styled.button`
  padding: 12px 20px;
  border: 2px solid ${props => props.$active ? theme.colors.primary : theme.colors.gray};
  background: ${props => props.$active ? theme.colors.primary : theme.colors.white};
  color: ${props => props.$active ? theme.colors.white : theme.colors.grayDark};
  border-radius: ${theme.borderRadius.lg};
  font-weight: ${theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: ${theme.transitions.normal};
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    border-color: ${theme.colors.primary};
    ${props => !props.$active && `
      background: ${theme.colors.primary};
      color: ${theme.colors.white};
      transform: translateY(-2px);
      box-shadow: ${theme.shadows.sm};
    `}
  }
`;

const SortDropdown = styled.div`
  position: relative;
`;

const SortButton = styled.button`
  padding: 12px 20px;
  border: 2px solid ${theme.colors.gray};
  background: ${theme.colors.white};
  color: ${theme.colors.grayDark};
  border-radius: ${theme.borderRadius.lg};
  font-weight: ${theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: ${theme.transitions.normal};
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 180px;

  &:hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
  }
`;

const SortMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray};
  border-radius: ${theme.borderRadius.md};
  box-shadow: ${theme.shadows.lg};
  z-index: 10;
  min-width: 200px;
  overflow: hidden;
  margin-top: 5px;
`;

const SortOption = styled.button`
  width: 100%;
  padding: 12px 16px;
  border: none;
  background: ${props => props.$active ? theme.colors.primaryLight : theme.colors.white};
  color: ${props => props.$active ? theme.colors.primary : theme.colors.grayDark};
  text-align: left;
  cursor: pointer;
  transition: ${theme.transitions.normal};

  &:hover {
    background: ${theme.colors.primaryLight};
    color: ${theme.colors.primary};
  }
`;

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 15px;
`;

const ResultsCount = styled.div`
  font-size: 1.1rem;
  color: ${theme.colors.grayDark};
  font-weight: ${theme.typography.fontWeight.medium};
`;

const ViewToggle = styled.div`
  display: flex;
  gap: 10px;
`;

const ViewButton = styled.button`
  padding: 10px 15px;
  border: 2px solid ${props => props.$active ? theme.colors.primary : theme.colors.gray};
  background: ${props => props.$active ? theme.colors.primary : theme.colors.white};
  color: ${props => props.$active ? theme.colors.white : theme.colors.grayDark};
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  transition: ${theme.transitions.normal};

  &:hover {
    border-color: ${theme.colors.primary};
    ${props => !props.$active && `
      background: ${theme.colors.primary};
      color: ${theme.colors.white};
    `}
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: ${props => props.$viewMode === 'grid' ? 'repeat(auto-fill, minmax(280px, 1fr))' : '1fr'};
  gap: 25px;
  margin-bottom: 40px;

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: ${props => props.$viewMode === 'grid' ? 'repeat(auto-fill, minmax(250px, 1fr))' : '1fr'};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: ${props => props.$viewMode === 'grid' ? 'repeat(auto-fill, minmax(220px, 1fr))' : '1fr'};
    gap: 20px;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 80px 20px;
  color: ${theme.colors.grayDark};

  h3 {
    font-size: 1.8rem;
    margin-bottom: 15px;
    color: ${theme.colors.black};
  }

  p {
    font-size: 1.1rem;
    line-height: 1.6;
    max-width: 400px;
    margin: 0 auto;
  }
`;

const LoadingState = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
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
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
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
  height: 12px;
  background: ${theme.colors.grayLight};
  border-radius: 6px;
  margin-bottom: 10px;
  width: ${props => props.width || '100%'};
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 40px;
`;

const PaginationButton = styled.button`
  padding: 12px 16px;
  border: 2px solid ${props => props.$active ? theme.colors.primary : theme.colors.gray};
  background: ${props => props.$active ? theme.colors.primary : theme.colors.white};
  color: ${props => props.$active ? theme.colors.white : theme.colors.grayDark};
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  transition: ${theme.transitions.normal};
  font-weight: ${theme.typography.fontWeight.medium};

  &:hover:not(:disabled) {
    border-color: ${theme.colors.primary};
    ${props => !props.$active && `
      background: ${theme.colors.primary};
      color: ${theme.colors.white};
    `}
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const AllProductsPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // State management
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [activeFilter, setActiveFilter] = useState(searchParams.get('category') || 'all');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'name');
  const [viewMode, setViewMode] = useState('grid');
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page')) || 1);
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  
  const itemsPerPage = 12;

  // Filter and sort options
  const filters = [
    { id: 'all', label: 'Semua Produk', icon: null },
    { id: 'fruits', label: 'Buah-buahan', icon: '🍎' },
    { id: 'vegetables', label: 'Sayuran', icon: '🥬' },
    { id: 'sale', label: 'Diskon', icon: '🏷️' },
    { id: 'organic', label: 'Organik', icon: '🌱' },
  ];

  const sortOptions = [
    { id: 'name', label: 'Nama A-Z', icon: faSortAmountDown },
    { id: 'name-desc', label: 'Nama Z-A', icon: faSortAmountUp },
    { id: 'price-low', label: 'Harga Terendah', icon: faSortAmountDown },
    { id: 'price-high', label: 'Harga Tertinggi', icon: faSortAmountUp },
    { id: 'rating', label: 'Rating Tertinggi', icon: faSortAmountUp },
    { id: 'reviews', label: 'Paling Populer', icon: faSortAmountUp },
  ];

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let filtered = [...allProducts];

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (activeFilter !== 'all') {
      if (activeFilter === 'sale') {
        filtered = filtered.filter(product => product.originalPrice);
      } else if (activeFilter === 'organic') {
        filtered = filtered.filter(product => 
          product.badge === 'Organic' || 
          product.name.toLowerCase().includes('organik')
        );
      } else {
        filtered = filtered.filter(product => product.category === activeFilter);
      }
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'reviews':
          return (b.reviews || 0) - (a.reviews || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, activeFilter, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  // Update URL params
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    if (activeFilter !== 'all') params.set('category', activeFilter);
    if (sortBy !== 'name') params.set('sort', sortBy);
    if (currentPage !== 1) params.set('page', currentPage.toString());
    
    setSearchParams(params);
  }, [searchQuery, activeFilter, sortBy, currentPage, setSearchParams]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeFilter, sortBy]);

  // Event handlers
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
  };

  const handleSortChange = (sortId) => {
    setSortBy(sortId);
    setShowSortMenu(false);
  };

  const handleAddToCart = async (product) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setCartItems(prev => [...prev, product]);
      console.log('Added to cart:', product.name);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWishlist = (product, isWishlisted) => {
    console.log(isWishlisted ? 'Added to wishlist:' : 'Removed from wishlist:', product.name);
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getCurrentSortLabel = () => {
    const option = sortOptions.find(opt => opt.id === sortBy);
    return option ? option.label : 'Urutkan';
  };

  return (
    <>
      <PageHeader>
        <HeaderContent>
          <PageTitle>Semua Produk</PageTitle>
          <PageSubtitle>
            Temukan berbagai produk segar berkualitas tinggi untuk kebutuhan sehari-hari Anda
          </PageSubtitle>
        </HeaderContent>
      </PageHeader>

      <Container>
        <FilterSection>
          <FilterRow>
            <SearchContainer>
              <SearchInput
                type="text"
                placeholder="Cari produk..."
                value={searchQuery}
                onChange={handleSearch}
              />
              <SearchIcon>
                <FontAwesomeIcon icon={faSearch} />
              </SearchIcon>
            </SearchContainer>

            <FilterGroup>
              {filters.map((filter) => (
                <FilterButton
                  key={filter.id}
                  $active={activeFilter === filter.id}
                  onClick={() => handleFilterChange(filter.id)}
                >
                  {filter.icon && <span>{filter.icon}</span>}
                  {filter.label}
                </FilterButton>
              ))}
            </FilterGroup>

            <SortDropdown>
              <SortButton onClick={() => setShowSortMenu(!showSortMenu)}>
                <FontAwesomeIcon icon={faFilter} />
                {getCurrentSortLabel()}
                <FontAwesomeIcon icon={faChevronDown} />
              </SortButton>
              
              {showSortMenu && (
                <SortMenu>
                  {sortOptions.map((option) => (
                    <SortOption
                      key={option.id}
                      $active={sortBy === option.id}
                      onClick={() => handleSortChange(option.id)}
                    >
                      <FontAwesomeIcon icon={option.icon} style={{ marginRight: '8px' }} />
                      {option.label}
                    </SortOption>
                  ))}
                </SortMenu>
              )}
            </SortDropdown>
          </FilterRow>
        </FilterSection>

        <ResultsHeader>
          <ResultsCount>
            Menampilkan {paginatedProducts.length} dari {filteredProducts.length} produk
          </ResultsCount>
          
          <ViewToggle>
            <ViewButton
              $active={viewMode === 'grid'}
              onClick={() => setViewMode('grid')}
            >
              <FontAwesomeIcon icon={faTh} />
            </ViewButton>
            <ViewButton
              $active={viewMode === 'list'}
              onClick={() => setViewMode('list')}
            >
              <FontAwesomeIcon icon={faList} />
            </ViewButton>
          </ViewToggle>
        </ResultsHeader>

        {loading ? (
          <LoadingState>
            {Array.from({ length: 8 }).map((_, index) => (
              <LoadingCard key={index}>
                <LoadingImage />
                <LoadingContent>
                  <LoadingLine width="80%" />
                  <LoadingLine width="60%" />
                  <LoadingLine width="90%" />
                </LoadingContent>
              </LoadingCard>
            ))}
          </LoadingState>
        ) : paginatedProducts.length > 0 ? (
          <>
            <ProductGrid $viewMode={viewMode}>
              {paginatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  badge={product.badge}
                  onAddToCart={handleAddToCart}
                  onWishlist={handleWishlist}
                  onProductClick={handleProductClick}
                />
              ))}
            </ProductGrid>

            {totalPages > 1 && (
              <Pagination>
                <PaginationButton
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Sebelumnya
                </PaginationButton>
                
                {Array.from({ length: totalPages }, (_, index) => {
                  const page = index + 1;
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 2 && page <= currentPage + 2)
                  ) {
                    return (
                      <PaginationButton
                        key={page}
                        $active={currentPage === page}
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </PaginationButton>
                    );
                  } else if (page === currentPage - 3 || page === currentPage + 3) {
                    return <span key={page}>...</span>;
                  }
                  return null;
                })}
                
                <PaginationButton
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Selanjutnya
                </PaginationButton>
              </Pagination>
            )}
          </>
        ) : (
          <EmptyState>
            <h3>Tidak ada produk ditemukan</h3>
            <p>
              Coba ubah kata kunci pencarian atau filter yang Anda gunakan untuk menemukan produk yang diinginkan.
            </p>
          </EmptyState>
        )}
      </Container>
    </>
  );
};

export default AllProductsPage;