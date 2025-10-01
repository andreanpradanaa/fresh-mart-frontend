// Product Configuration System
// Single source of truth untuk semua product types

export const PRODUCT_TYPES = {
  FRUIT: 'fruit',
  VEGETABLE: 'vegetable',
  DAIRY: 'dairy',
  MEAT: 'meat',
  SEAFOOD: 'seafood',
  DEFAULT: 'default'
};

export const PRODUCT_CONFIG = {
  [PRODUCT_TYPES.FRUIT]: {
    layout: 'fruit',
    showNutrition: true,
    showBenefits: true,
    showSeasonalInfo: true,
    theme: {
      primary: '#14B8A6',
      gradient: 'linear-gradient(135deg, #14B8A6 0%, #3B82F6 100%)',
      background: 'linear-gradient(135deg, #F0FDF4 0%, #ECFDF5 100%)'
    },
    breadcrumbs: (product) => [
      { label: 'Buah-buahan', path: '/category/fruits' },
      { label: product.name, path: null }
    ]
  },
  
  [PRODUCT_TYPES.VEGETABLE]: {
    layout: 'vegetable',
    showNutrition: true,
    showBenefits: true,
    showCookingTips: true,
    theme: {
      primary: '#059669',
      gradient: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
      background: 'linear-gradient(135deg, #F0FDF4 0%, #ECFDF5 100%)'
    },
    breadcrumbs: (product) => [
      { label: 'Sayuran', path: '/category/vegetables' },
      { label: product.name, path: null }
    ]
  },
  
  [PRODUCT_TYPES.DEFAULT]: {
    layout: 'default',
    showNutrition: false,
    showBenefits: false,
    theme: {
      primary: '#3B82F6',
      gradient: 'linear-gradient(135deg, #3B82F6 0%, #6366F1 100%)',
      background: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)'
    },
    breadcrumbs: (product) => [
      { label: 'Produk', path: '/products' },
      { label: product.name, path: null }
    ]
  }
};

export const getProductConfig = (product) => {
  if (!product) return PRODUCT_CONFIG[PRODUCT_TYPES.DEFAULT];
  
  // Logic untuk menentukan product type
  if (product.category === 'fruits' || product.name?.toLowerCase().includes('apel') || 
      product.name?.toLowerCase().includes('jeruk') || product.emoji?.match(/[🍎🍊🍌🍇🥭]/)) {
    return PRODUCT_CONFIG[PRODUCT_TYPES.FRUIT];
  }
  
  if (product.category === 'vegetables' || product.name?.toLowerCase().includes('brokoli') || 
      product.name?.toLowerCase().includes('wortel') || product.emoji?.match(/[🥦🥕🥬🍅🥔]/)) {
    return PRODUCT_CONFIG[PRODUCT_TYPES.VEGETABLE];
  }
  
  return PRODUCT_CONFIG[PRODUCT_TYPES.DEFAULT];
};

export const getProductType = (product) => {
  const config = getProductConfig(product);
  return Object.keys(PRODUCT_TYPES).find(key => PRODUCT_CONFIG[PRODUCT_TYPES[key]] === config) || PRODUCT_TYPES.DEFAULT;
};