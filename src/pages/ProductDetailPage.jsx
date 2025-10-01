import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import UniversalProductDetail from '../components/Product/UniversalProductDetail';
import RecommendedProducts from '../components/Product/RecommendedProducts';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import { getProductConfig, PRODUCT_TYPES } from '../config/productConfig';

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

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

// Sample products data - in a real app, this would come from an API
const sampleProducts = [
  {
    id: 1,
    name: 'Apel Merah Segar',
    category: 'fruits',
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
    category: 'vegetables',
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
    category: 'fruits',
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
    category: 'vegetables',
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
    category: 'vegetables',
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
    category: 'vegetables',
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
    category: 'fruits',
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
    category: 'fruits',
    price: 18000,
    originalPrice: null,
    rating: 4.2,
    reviews: 134,
    emoji: '🍌',
    badge: 'Fresh',
    description: 'Pisang Cavendish segar dengan tekstur lembut dan rasa manis alami. Kaya akan potasium dan vitamin B6 yang baik untuk kesehatan jantung.',
  },
];

// Nutrition data configuration
const nutritionData = {
  fruits: {
    'Apel Merah Segar': {
      'Kalori': '52 kcal', 'Karbohidrat': '14 g', 'Serat': '2.4 g', 'Vitamin C': '4.6 mg', 'Kalium': '107 mg'
    },
    'Jeruk Manis Import': {
      'Kalori': '47 kcal', 'Karbohidrat': '12 g', 'Serat': '2.4 g', 'Vitamin C': '53.2 mg', 'Kalsium': '40 mg'
    },
    'Anggur Ungu Manis': {
      'Kalori': '62 kcal', 'Karbohidrat': '16 g', 'Serat': '0.9 g', 'Vitamin C': '3.2 mg', 'Kalium': '191 mg'
    },
    'Pisang Cavendish': {
      'Kalori': '89 kcal', 'Karbohidrat': '23 g', 'Serat': '2.6 g', 'Kalium': '358 mg', 'Vitamin B6': '0.4 mg'
    }
  },
  vegetables: {
    'Brokoli Organik': {
      'Kalori': '34 kcal', 'Protein': '2.8 g', 'Serat': '2.6 g', 'Vitamin C': '89.2 mg', 'Vitamin K': '101.6 μg'
    },
    'Wortel Lokal Segar': {
      'Kalori': '41 kcal', 'Karbohidrat': '10 g', 'Serat': '2.8 g', 'Vitamin A': '835 μg', 'Beta Karoten': '5.9 mg'
    },
    'Tomat Ceri Premium': {
      'Kalori': '18 kcal', 'Karbohidrat': '3.9 g', 'Serat': '1.2 g', 'Vitamin C': '14 mg', 'Lisin': '0.1 g'
    },
    'Bayam Hijau Segar': {
      'Kalori': '23 kcal', 'Protein': '2.9 g', 'Serat': '2.2 g', 'Zat Besi': '2.7 mg', 'Vitamin A': '469 μg'
    }
  }
};

const UniversalProductDetailPage = ({ onAddToCart, onWishlist }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const productId = parseInt(id);
        const foundProduct = sampleProducts.find(p => p.id === productId);
        
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setError('Produk tidak ditemukan');
        }
      } catch (err) {
        setError('Terjadi kesalahan saat memuat produk');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = (product) => {
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  const handleWishlist = (product) => {
    setWishlistItems(prev => 
      prev.includes(product.id) 
        ? prev.filter(id => id !== product.id)
        : [...prev, product.id]
    );
    if (onWishlist) {
      onWishlist(product);
    }
  };

  const isWishlist = product ? wishlistItems.includes(product.id) : false;

  // Get product configuration
  const productConfig = getProductConfig(product);
  const breadcrumbs = productConfig.breadcrumbs(product || { name: 'Produk' });

  // Get nutrition data
  const getNutritionData = (product) => {
    if (!product) return {};
    const category = product.category === 'fruits' ? 'fruits' : 'vegetables';
    return nutritionData[category]?.[product.name] || {};
  };

  // Get benefits based on product type
  const getBenefits = (product) => {
    if (!product) return [];
    
    if (product.category === 'fruits') {
      return [
        'Kaya akan vitamin dan mineral',
        'Meningkatkan sistem kekebalan tubuh',
        'Baik untuk pencernaan',
        'Sumber antioksidan alami',
        'Meningkatkan energi secara alami'
      ];
    } else if (product.category === 'vegetables') {
      return [
        'Kaya akan serat dan nutrisi',
        'Mendukung kesehatan pencernaan',
        'Sumber vitamin dan mineral alami',
        'Baik untuk diet sehat',
        'Meningkatkan energi secara alami'
      ];
    }
    return [];
  };

  // Build component configuration
  const componentConfig = {
    showNutrition: productConfig.showNutrition,
    showBenefits: productConfig.showBenefits,
    animateEmoji: productConfig.layout === 'fruit',
    customTheme: productConfig.theme,
    nutritionData: getNutritionData(product),
    benefits: getBenefits(product)
  };

  if (loading) {
    return (
      <PageContainer>
        <ContentWrapper>
          <LoadingContainer>
            <LoadingSpinner />
            <LoadingText>Memuat detail produk...</LoadingText>
          </LoadingContainer>
        </ContentWrapper>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <ContentWrapper>
          <ErrorContainer>
            <ErrorTitle>Produk Tidak Ditemukan</ErrorTitle>
            <ErrorMessage>{error}</ErrorMessage>
            <BackButton onClick={() => navigate(-1)}>
              Kembali
            </BackButton>
          </ErrorContainer>
        </ContentWrapper>
      </PageContainer>
    );
  }

  if (!product) {
    return (
      <PageContainer>
        <ContentWrapper>
          <ErrorContainer>
            <ErrorTitle>Produk Tidak Tersedia</ErrorTitle>
            <ErrorMessage>Maaf, produk ini tidak tersedia saat ini.</ErrorMessage>
            <BackButton onClick={() => navigate(-1)}>
              Kembali
            </BackButton>
          </ErrorContainer>
        </ContentWrapper>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <ContentWrapper>
        <Breadcrumb items={breadcrumbs} />
        
        <UniversalProductDetail
          product={product}
          onAddToCart={handleAddToCart}
          onWishlist={handleWishlist}
          isWishlist={isWishlist}
          config={componentConfig}
        />

        <RecommendedProducts 
          currentProductId={product.id}
          category={product.category}
          onProductClick={(productId) => navigate(`/product/${productId}`)}
          onAddToCart={handleAddToCart}
          onWishlist={handleWishlist}
        />
      </ContentWrapper>
    </PageContainer>
  );
};

export default UniversalProductDetailPage;