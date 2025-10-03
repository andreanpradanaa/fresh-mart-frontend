import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import ProductDetail from '../components/Product/ProductDetail';
import RecommendedProducts from '../components/Product/RecommendedProducts';

const PageContainer = styled.div`
  min-height: 100vh;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  flex-direction: column;
  gap: 20px;
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid ${theme.colors.grayLight};
  border-top: 4px solid ${theme.colors.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  color: ${theme.colors.grayDark};
  font-size: 1.1rem;
`;

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  flex-direction: column;
  gap: 20px;
  text-align: center;
  padding: 40px 20px;
`;

const ErrorTitle = styled.h2`
  color: ${theme.colors.black};
  font-size: 2rem;
  margin: 0;
`;

const ErrorMessage = styled.p`
  color: ${theme.colors.grayDark};
  font-size: 1.1rem;
  line-height: 1.6;
  max-width: 500px;
`;

const BackButton = styled.button`
  padding: 12px 24px;
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-size: 1rem;
  font-weight: ${theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: ${theme.transitions.normal};

  &:hover {
    background: ${theme.colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.md};
  }
`;

// Sample products data - in a real app, this would come from an API
const sampleProducts = [
  {
    id: 1,
    name: 'Apel Merah Segar',
    slug: 'apel-merah-segar',
    category: 'Buah-buahan',
    price: 25000,
    originalPrice: 30000,
    rating: 4.5,
    reviews: 128,
    emoji: '🍎',
    badge: 'Sale',
    description: 'Apel merah segar yang dipetik langsung dari kebun organik. Kaya akan vitamin C dan serat yang baik untuk kesehatan. Tekstur renyah dan rasa manis yang menyegarkan.',
  },
  {
    id: 2,
    name: 'Brokoli Organik',
    slug: 'brokoli-organik',
    category: 'Sayuran',
    price: 15000,
    originalPrice: null,
    rating: 4.8,
    reviews: 95,
    emoji: '🥦',
    badge: 'Best Seller',
    description: 'Brokoli organik segar tanpa pestisida. Kaya akan vitamin K, vitamin C, dan folat. Cocok untuk berbagai masakan sehat dan bergizi.',
  },
  {
    id: 3,
    name: 'Jeruk Manis Import',
    slug: 'jeruk-manis-import',
    category: 'Buah-buahan',
    price: 35000,
    originalPrice: 40000,
    rating: 4.3,
    reviews: 76,
    emoji: '🍊',
    badge: 'New',
    description: 'Jeruk manis import berkualitas premium dengan rasa yang sangat manis dan segar. Kaya vitamin C untuk meningkatkan daya tahan tubuh.',
  },
  {
    id: 4,
    name: 'Wortel Lokal Segar',
    slug: 'wortel-lokal-segar',
    category: 'Sayuran',
    price: 12000,
    originalPrice: 15000,
    rating: 4.6,
    reviews: 203,
    emoji: '🥕',
    badge: 'Sale',
    description: 'Wortel lokal segar dengan kandungan beta karoten tinggi. Baik untuk kesehatan mata dan kulit. Tekstur renyah dan rasa manis alami.',
  },
  {
    id: 5,
    name: 'Tomat Ceri Premium',
    slug: 'tomat-ceri-premium',
    category: 'Sayuran',
    price: 28000,
    originalPrice: null,
    rating: 4.7,
    reviews: 89,
    emoji: '🍅',
    badge: 'Premium',
    description: 'Tomat ceri premium dengan ukuran kecil dan rasa yang sangat manis. Cocok untuk salad, garnish, atau dimakan langsung sebagai camilan sehat.',
  },
  {
    id: 6,
    name: 'Bayam Hijau Segar',
    slug: 'bayam-hijau-segar',
    category: 'Sayuran',
    price: 8000,
    originalPrice: 10000,
    rating: 4.4,
    reviews: 156,
    emoji: '🥬',
    badge: 'Sale',
    description: 'Bayam hijau segar kaya akan zat besi dan vitamin A. Daun yang lembut dan segar, cocok untuk berbagai masakan tradisional Indonesia.',
  },
  {
    id: 7,
    name: 'Anggur Ungu Manis',
    slug: 'anggur-ungu-manis',
    category: 'Buah-buahan',
    price: 45000,
    originalPrice: 50000,
    rating: 4.9,
    reviews: 67,
    emoji: '🍇',
    badge: 'Limited',
    description: 'Anggur ungu manis dengan kualitas premium. Buah yang kaya antioksidan dan memiliki rasa manis yang sempurna. Cocok untuk camilan sehat.',
  },
  {
    id: 8,
    name: 'Pisang Cavendish',
    slug: 'pisang-cavendish',
    category: 'Buah-buahan',
    price: 18000,
    originalPrice: null,
    rating: 4.2,
    reviews: 134,
    emoji: '🍌',
    badge: 'Fresh',
    description: 'Pisang Cavendish segar dengan tekstur lembut dan rasa manis alami. Kaya akan potasium dan vitamin B6 yang baik untuk kesehatan jantung.',
  },
];

const ProductDetailPage = ({ onAddToCart, onWishlist }) => {
  const { slug, category } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API call to fetch product details
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const foundProduct = sampleProducts.find(p => p.slug === slug);
        
        if (!foundProduct) {
          throw new Error('Produk tidak ditemukan');
        }
        
        setProduct(foundProduct);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  const handleBack = () => {
    if (category) {
      navigate(`/category/${category}`); // Navigate back to category page
    } else {
      navigate('/products'); // Navigate to products page
    }
  };

  const handleAddToCart = async (productWithQuantity) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (onAddToCart) {
        onAddToCart(productWithQuantity);
      }
      
      console.log('Added to cart:', productWithQuantity);
      // You could show a success toast here
    } catch (error) {
      console.error('Error adding to cart:', error);
      // You could show an error toast here
    }
  };

  const handleWishlist = (product, isWishlisted) => {
    if (onWishlist) {
      onWishlist(product, isWishlisted);
    }
    console.log(isWishlisted ? 'Added to wishlist:' : 'Removed from wishlist:', product.name);
  };

  const handleProductClick = (clickedProduct) => {
    // Generate slug from product name if not available
    const slug = clickedProduct.slug || clickedProduct.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    
    // Navigate to the clicked product's detail page
    if (category) {
      navigate(`/category/${category}/${slug}`);
    } else {
      navigate(`/product/${slug}`);
    }
  };

  const handleViewAllProducts = () => {
    navigate('/products');
  };

  if (loading) {
    return (
      <PageContainer>
        <LoadingContainer>
          <LoadingSpinner />
          <LoadingText>Memuat detail produk...</LoadingText>
        </LoadingContainer>
      </PageContainer>
    );
  }

  if (error || !product) {
    return (
      <PageContainer>
        <ErrorContainer>
          <ErrorTitle>Oops! Terjadi Kesalahan</ErrorTitle>
          <ErrorMessage>
            {error || 'Produk yang Anda cari tidak ditemukan. Mungkin produk telah dihapus atau URL tidak valid.'}
          </ErrorMessage>
          <BackButton onClick={handleBack}>
            Kembali
          </BackButton>
        </ErrorContainer>
        
        <RecommendedProducts
          products={sampleProducts}
          currentProductId={null}
          onAddToCart={handleAddToCart}
          onWishlist={handleWishlist}
          onProductClick={handleProductClick}
          onViewAll={handleViewAllProducts}
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <ProductDetail
        product={product}
        onBack={handleBack}
        onAddToCart={handleAddToCart}
        onWishlist={handleWishlist}
      />
      
      <RecommendedProducts
        products={sampleProducts}
        currentProductId={product.id}
        onAddToCart={handleAddToCart}
        onWishlist={handleWishlist}
        onProductClick={handleProductClick}
        onViewAll={handleViewAllProducts}
        title="Produk Rekomendasi"
        showViewAll={true}
      />
    </PageContainer>
  );
};

export default ProductDetailPage;