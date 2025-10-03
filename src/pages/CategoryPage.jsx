import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams, useParams } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
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

// Universal category configuration
const categoryConfig = {
  buah: {
    title: 'Buah-buahan Segar',
    description: '🍃 Langsung dari kebun lokal • 100% Alami • Bebas Pestisida',
    emoji: '🍎',
    gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FFA500 100%)'
  },
  sayur: {
    title: 'Sayuran Hijau Segar',
    description: '🌱 Petani lokal • Tanpa kimia • Dipetik pagi hari',
    emoji: '🥬',
    gradient: 'linear-gradient(135deg, #4CAF50 0%, #8BC34A 100%)'
  },
  fruits: {
    title: 'Buah-buahan Segar',
    description: '🍃 Langsung dari kebun lokal • 100% Alami • Bebas Pestisida',
    emoji: '🍎',
    gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FFA500 100%)'
  },
  vegetables: {
    title: 'Sayuran Hijau Segar',
    description: '🌱 Petani lokal • Tanpa kimia • Dipetik pagi hari',
    emoji: '🥬',
    gradient: 'linear-gradient(135deg, #4CAF50 0%, #8BC34A 100%)'
  },
  daging: {
    title: 'Daging Segar & Halal',
    description: '🔪 Proses halal • Kualitas premium • Tanpa formalin',
    emoji: '🥩',
    gradient: 'linear-gradient(135deg, #8B4513 0%, #D2691E 100%)'
  },
  meat: {
    title: 'Daging Segar & Halal',
    description: '🔪 Proses halal • Kualitas premium • Tanpa formalin',
    emoji: '🥩',
    gradient: 'linear-gradient(135deg, #8B4513 0%, #D2691E 100%)'
  },
  ikan: {
    title: 'Ikan & Seafood Segar',
    description: '🌊 Tangkap pagi • Kualitas laut dalam • Bebas formalin',
    emoji: '🐟',
    gradient: 'linear-gradient(135deg, #1E90FF 0%, #00CED1 100%)'
  },
  seafood: {
    title: 'Ikan & Seafood Segar',
    description: '🌊 Tangkap pagi • Kualitas laut dalam • Bebas formalin',
    emoji: '🐟',
    gradient: 'linear-gradient(135deg, #1E90FF 0%, #00CED1 100%)'
  },
  susu: {
    title: 'Produk Susu & Olahan',
    description: '🥛 Sumber protein • Tanpa pengawet • Kaya kalsium',
    emoji: '🥛',
    gradient: 'linear-gradient(135deg, #F5F5DC 0%, #FFFACD 100%)'
  },
  dairy: {
    title: 'Produk Susu & Olahan',
    description: '🥛 Sumber protein • Tanpa pengawet • Kaya kalsium',
    emoji: '🥛',
    gradient: 'linear-gradient(135deg, #F5F5DC 0%, #FFFACD 100%)'
  },
  default: {
    title: 'Produk Segar',
    description: '✨ Kualitas terbaik • Terpercaya • Harga kompetitif',
    emoji: '📦',
    gradient: 'linear-gradient(135deg, #6A5ACD 0%, #9370DB 100%)'
  }
};
import { theme } from '../styles/theme';
import { Container } from '../styles/GlobalStyles';
import ProductCard from '../components/Product/ProductCard';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

// Extended sample products data - sama persis dengan AllProductsPage
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
  {
    id: 13,
    name: 'Semangka Merah Manis',
    price: 25000,
    originalPrice: 30000,
    rating: 4.7,
    reviews: 89,
    emoji: '🍉',
    badge: 'Seasonal',
    category: 'fruits',
    description: 'Semangka merah manis dengan kandungan air tinggi.',
  },
  {
    id: 14,
    name: 'Stroberi Segar',
    price: 38000,
    originalPrice: null,
    rating: 4.5,
    reviews: 167,
    emoji: '🍓',
    badge: 'Organic',
    category: 'fruits',
    description: 'Stroberi segar tanpa pestisida, manis dan aromatik.',
  },
  {
    id: 15,
    name: 'Kiwi Hijau',
    price: 42000,
    originalPrice: 48000,
    rating: 4.3,
    reviews: 78,
    emoji: '🥝',
    badge: 'Import',
    category: 'fruits',
    description: 'Kiwi hijau import dengan rasa asam manis yang seimbang.',
  },
  {
    id: 16,
    name: 'Nanas Madu',
    price: 22000,
    originalPrice: null,
    rating: 4.8,
    reviews: 134,
    emoji: '🍍',
    badge: 'Sweet',
    category: 'fruits',
    description: 'Nanas madu dengan tingkat kemanisan tinggi dan daging yang lembut.',
  },
  {
    id: 17,
    name: 'Melon Kuning',
    price: 28000,
    originalPrice: 35000,
    rating: 4.4,
    reviews: 92,
    emoji: '🍈',
    badge: 'Fresh',
    category: 'fruits',
    description: 'Melon kuning dengan tekstur juicy dan aroma yang harum.',
  },
  {
    id: 18,
    name: 'Pepaya California',
    price: 18000,
    originalPrice: null,
    rating: 4.6,
    reviews: 118,
    emoji: '🫐',
    badge: 'Vitamin C',
    category: 'fruits',
    description: 'Pepaya California dengan daging oranye dan biji sedikit.',
  },
  {
    id: 19,
    name: 'Blueberry Premium',
    price: 65000,
    originalPrice: 75000,
    rating: 4.9,
    reviews: 45,
    emoji: '🫐',
    badge: 'Antioxidant',
    category: 'fruits',
    description: 'Blueberry premium kaya antioksidan dengan rasa manis alami.',
  },
  {
    id: 20,
    name: 'Raspberry Merah',
    price: 58000,
    originalPrice: null,
    rating: 4.2,
    reviews: 56,
    emoji: '🫐',
    badge: 'Rare',
    category: 'fruits',
    description: 'Raspberry merah langka dengan rasa asam manis yang khas.',
  },
  {
    id: 21,
    name: 'Lemon Sunkist',
    price: 25000,
    originalPrice: 30000,
    rating: 4.1,
    reviews: 87,
    emoji: '🍋',
    badge: 'Vitamin C',
    category: 'fruits',
    description: 'Lemon Sunkist dengan kandungan vitamin C tinggi.',
  },
  {
    id: 22,
    name: 'Lime Jeruk Nipis',
    price: 18000,
    originalPrice: null,
    rating: 4.0,
    reviews: 76,
    emoji: '🍋',
    badge: 'Fresh',
    category: 'fruits',
    description: 'Jeruk nipis segar untuk bahan masakan dan minuman.',
  },
  {
    id: 23,
    name: 'Kubis Ungu',
    price: 15000,
    originalPrice: 18000,
    rating: 4.3,
    reviews: 98,
    emoji: '🥬',
    badge: 'Organic',
    category: 'vegetables',
    description: 'Kubis ungu organik dengan kandungan antioksidan tinggi.',
  },
  {
    id: 24,
    name: 'Sawi Hijau',
    price: 9000,
    originalPrice: null,
    rating: 4.2,
    reviews: 145,
    emoji: '🥬',
    badge: 'Local',
    category: 'vegetables',
    description: 'Sawi hijau lokal segar dengan tekstur renyah.',
  },
  {
    id: 25,
    name: 'Daun Bawang',
    price: 7000,
    originalPrice: 8000,
    rating: 4.1,
    reviews: 67,
    emoji: '🧅',
    badge: 'Fresh',
    category: 'vegetables',
    description: 'Daun bawang segar untuk pelengkap masakan.',
  },
  {
    id: 26,
    name: 'Bawang Putih',
    price: 32000,
    originalPrice: 35000,
    rating: 4.4,
    reviews: 189,
    emoji: '🧄',
    badge: 'Premium',
    category: 'vegetables',
    description: 'Bawang putih premium dengan aroma yang kuat.',
  },
  {
    id: 27,
    name: 'Bawang Merah',
    price: 28000,
    originalPrice: null,
    rating: 4.3,
    reviews: 167,
    emoji: '🧅',
    badge: 'Local',
    category: 'vegetables',
    description: 'Bawang merah lokal dengan rasa manis alami.',
  },
  {
    id: 28,
    name: 'Timun Jepang',
    price: 12000,
    originalPrice: 15000,
    rating: 4.5,
    reviews: 123,
    emoji: '🥒',
    badge: 'Import',
    category: 'vegetables',
    description: 'Timun Jepang dengan ukuran kecil dan renyah.',
  },
  {
    id: 29,
    name: 'Terong Ungu',
    price: 14000,
    originalPrice: null,
    rating: 4.2,
    reviews: 98,
    emoji: '🍆',
    badge: 'Fresh',
    category: 'vegetables',
    description: 'Terong ungu segar dengan tekstur lembut.',
  },
  {
    id: 30,
    name: 'Labu Kuning',
    price: 16000,
    originalPrice: 20000,
    rating: 4.6,
    reviews: 87,
    emoji: '🎃',
    badge: 'Seasonal',
    category: 'vegetables',
    description: 'Labu kuning musiman dengan rasa manis alami.',
  },
  {
    id: 31,
    name: 'Jagung Manis',
    price: 10000,
    originalPrice: null,
    rating: 4.7,
    reviews: 156,
    emoji: '🌽',
    badge: 'Sweet',
    category: 'vegetables',
    description: 'Jagung manis dengan kandungan gula alami tinggi.',
  },
  {
    id: 32,
    name: 'Kacang Panjang',
    price: 8000,
    originalPrice: 10000,
    rating: 4.1,
    reviews: 134,
    emoji: '🫛',
    badge: 'Local',
    category: 'vegetables',
    description: 'Kacang panjang lokal segar dengan protein tinggi.',
  },
  {
    id: 33,
    name: 'Tauge Kedelai',
    price: 6000,
    originalPrice: null,
    rating: 4.0,
    reviews: 78,
    emoji: '🫛',
    badge: 'Healthy',
    category: 'vegetables',
    description: 'Tauge kedelai segar dengan kandungan nutrisi tinggi.',
  },
  {
    id: 34,
    name: 'Jamur Kancing',
    price: 18000,
    originalPrice: 22000,
    rating: 4.4,
    reviews: 112,
    emoji: '🍄',
    badge: 'Protein',
    category: 'vegetables',
    description: 'Jamur kancing segar dengan tekstur kenyal.',
  },
  {
    id: 35,
    name: 'Jamur Tiram',
    price: 20000,
    originalPrice: null,
    rating: 4.3,
    reviews: 89,
    emoji: '🍄',
    badge: 'Fresh',
    category: 'vegetables',
    description: 'Jamur tiram dengan rasa gurih alami.',
  },
  {
    id: 36,
    name: 'Kembang Kol',
    price: 12000,
    originalPrice: 15000,
    rating: 4.2,
    reviews: 98,
    emoji: '🥦',
    badge: 'Vitamin C',
    category: 'vegetables',
    description: 'Kembang kol dengan kandungan vitamin C tinggi.',
  },
  {
    id: 37,
    name: 'Paprika Merah',
    price: 25000,
    originalPrice: 30000,
    rating: 4.5,
    reviews: 67,
    emoji: '🫑',
    badge: 'Vitamin A',
    category: 'vegetables',
    description: 'Paprika merah dengan vitamin A tinggi.',
  },
  {
    id: 38,
    name: 'Paprika Kuning',
    price: 23000,
    originalPrice: null,
    rating: 4.4,
    reviews: 54,
    emoji: '🫑',
    badge: 'Sweet',
    category: 'vegetables',
    description: 'Paprika kuning dengan rasa manis alami.',
  },
  {
    id: 39,
    name: 'Paprika Hijau',
    price: 20000,
    originalPrice: 25000,
    rating: 4.1,
    reviews: 89,
    emoji: '🫑',
    badge: 'Fresh',
    category: 'vegetables',
    description: 'Paprika hijau segar dengan rasa sedikit pahit.',
  },
  {
    id: 40,
    name: 'Asparagus Hijau',
    price: 45000,
    originalPrice: 50000,
    rating: 4.7,
    reviews: 34,
    emoji: '🌱',
    badge: 'Premium',
    category: 'vegetables',
    description: 'Asparagus hijau premium dengan kandungan folat tinggi.',
  },
  {
    id: 41,
    name: 'Cherry Tomato',
    price: 30000,
    originalPrice: null,
    rating: 4.6,
    reviews: 145,
    emoji: '🍅',
    badge: 'Sweet',
    category: 'vegetables',
    description: 'Cherry tomato manis dengan ukuran kecil.',
  },
  {
    id: 42,
    name: 'Daun Mint',
    price: 12000,
    originalPrice: 15000,
    rating: 4.3,
    reviews: 56,
    emoji: '🌿',
    badge: 'Aromatic',
    category: 'vegetables',
    description: 'Daun mint aromatik untuk bahan minuman dan masakan.',
  },
  {
    id: 43,
    name: 'Daun Basil',
    price: 10000,
    originalPrice: null,
    rating: 4.2,
    reviews: 67,
    emoji: '🌿',
    badge: 'Italian',
    category: 'vegetables',
    description: 'Daun basil segar untuk masakan Italia.',
  },
  {
    id: 44,
    name: 'Daun Ketumbar',
    price: 8000,
    originalPrice: 10000,
    rating: 4.0,
    reviews: 89,
    emoji: '🌿',
    badge: 'Fresh',
    category: 'vegetables',
    description: 'Daun ketumbar segar untuk bumbu masakan.',
  },
  {
    id: 45,
    name: 'Pare Hijau',
    price: 10000,
    originalPrice: null,
    rating: 3.8,
    reviews: 45,
    emoji: '🥒',
    badge: 'Bitter',
    category: 'vegetables',
    description: 'Pare hijau dengan manfaat untuk kesehatan.',
  },
  {
    id: 46,
    name: 'Belimbing',
    price: 15000,
    originalPrice: 18000,
    rating: 4.1,
    reviews: 78,
    emoji: '⭐',
    badge: 'Vitamin C',
    category: 'fruits',
    description: 'Belimbing dengan bentuk bintang dan rasa seger.',
  },
  {
    id: 47,
    name: 'Durian Montong',
    price: 85000,
    originalPrice: 100000,
    rating: 4.9,
    reviews: 234,
    emoji: '🫕',
    badge: 'King Fruit',
    category: 'fruits',
    description: 'Durian montong dengan daging tebal dan manis.',
  },
  {
    id: 48,
    name: 'Rambutan Aceh',
    price: 25000,
    originalPrice: null,
    rating: 4.4,
    reviews: 123,
    emoji: '🥥',
    badge: 'Local',
    category: 'fruits',
    description: 'Rambutan Aceh dengan rasa manis dan daging tebal.',
  },
  {
    id: 49,
    name: 'Kelapa Muda',
    price: 15000,
    originalPrice: 18000,
    rating: 4.7,
    reviews: 167,
    emoji: '🥥',
    badge: 'Hydration',
    category: 'fruits',
    description: 'Kelapa muda dengan air yang menyegarkan.',
  },
  {
    id: 50,
    name: 'Sirsat Bangkok',
    price: 35000,
    originalPrice: null,
    rating: 4.5,
    reviews: 89,
    emoji: '🍈',
    badge: 'Sweet',
    category: 'fruits',
    description: 'Sirsat Bangkok dengan daging putih yang manis.',
  },
];

// Styled components - sama persis dengan AllProductsPage
const BannerContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  padding: 0 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
    padding: 0 1rem;
  }
`;

const BannerText = styled.div`
  flex: 1;
`;

const BannerTitle = styled.h1`
  font-size: 2.25rem;
  font-weight: 700;
  margin: 0 0 0.25rem 0;
  color: white;
  text-shadow: 0 2px 4px rgba(0,0,0,0.2);
  line-height: 1.2;
  letter-spacing: -0.5px;
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const BannerSubtitle = styled.p`
  font-size: 1.1rem;
  opacity: 0.95;
  margin: 0;
  text-shadow: 0 1px 2px rgba(0,0,0,0.2);
  line-height: 1.4;
  
  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

const BannerBadge = styled.div`
  background: rgba(255,255,255,0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 24px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  text-shadow: 0 1px 2px rgba(0,0,0,0.2);
  white-space: nowrap;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 3rem;
  margin-bottom: 2rem;
`;

const PageButton = styled.button`
  padding: 0.5rem 0.75rem;
  border: 1px solid ${theme.colors.border};
  background: ${props => props.$active ? theme.colors.primary : 'white'};
  color: ${props => props.$active ? 'white' : theme.colors.text};
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.3s ease;
  min-width: 2.5rem;
  
  &:hover {
    background: ${props => props.$active ? theme.colors.primaryDark : theme.colors.background};
    border-color: ${theme.colors.primary};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    padding: 0.4rem 0.6rem;
    font-size: 0.75rem;
    min-width: 2rem;
  }
`;

const PageInfo = styled.div`
  color: ${theme.colors.textSecondary};
  font-size: 0.875rem;
  margin: 0 1rem;
  
  @media (max-width: 768px) {
    font-size: 0.75rem;
    margin: 0 0.5rem;
  }
`;

const BannerController = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  max-width: 1200px;
  margin: 1.5rem auto 0;
  padding: 1rem;
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.2);
  position: relative;
  z-index: 2;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  max-width: 350px;

  @media (max-width: ${theme.breakpoints.md}) {
    max-width: 100%;
    width: 100%;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 40px 10px 15px;
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 20px;
  font-size: 14px;
  outline: none;
  transition: all 0.3s ease;
  background: rgba(255,255,255,0.9);

  &:focus {
    border-color: rgba(255,255,255,0.6);
    box-shadow: 0 0 0 3px rgba(255,255,255,0.2);
  }

  &::placeholder {
    color: rgba(0,0,0,0.5);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(0,0,0,0.5);
  font-size: 16px;
`;
const SortDropdown = styled.div`
  position: relative;
`;

const SortButton = styled.button`
  background: rgba(255,255,255,0.9);
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 13px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.3s ease;
  color: #333;
  
  &:hover {
    background: white;
    border-color: rgba(255,255,255,0.6);
  }
`;

const SortMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 12px;
  margin-top: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  z-index: 10;
  overflow: hidden;
`;

const SortOption = styled.button`
  width: 100%;
  padding: 10px 14px;
  border: none;
  background: ${props => props.$active ? 'rgba(76, 175, 80, 0.1)' : 'transparent'};
  color: ${props => props.$active ? '#4CAF50' : '#333'};
  text-align: left;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: ${props => props.$active ? '600' : '400'};
  
  &:hover {
    background: rgba(76, 175, 80, 0.05);
  }
`;

const ProductBanner = styled.div`
  background: ${props => props.gradient || 'linear-gradient(135deg, #4CAF50 0%, #8BC34A 100%)'};
  color: ${theme.colors.white};
  padding: 1.25rem 0;
  margin-bottom: 0;
  position: relative;
  overflow: hidden;
  border-radius: 16px 16px 0 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.1);
    z-index: 1;
  }

  @media (max-width: 768px) {
    padding: 1rem 0;
  }
`;


const ResultsCount = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: linear-gradient(135deg, ${theme.colors.primaryLight}, #e6f7f5);
  color: ${theme.colors.primary};
  padding: 12px 24px;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: ${theme.typography.fontWeight.semibold};
  margin: 0 auto 25px;
  box-shadow: ${theme.shadows.sm};
  border: 1px solid rgba(20, 184, 166, 0.2);
  
  &::before {
    content: '🔍';
    font-size: 1.2rem;
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 0.9rem;
    padding: 10px 20px;
    gap: 8px;
  }
`;

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  background: ${theme.colors.white};
  padding: 1.5rem;
  border-radius: 0 0 16px 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  margin-top: 0;
  position: relative;
  z-index: 2;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ViewToggle = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const ViewButton = styled.button`
  background: ${props => props.$active ? 'rgba(76, 175, 80, 0.9)' : 'rgba(255,255,255,0.9)'};
  border: 1px solid ${props => props.$active ? 'rgba(76, 175, 80, 0.9)' : 'rgba(255,255,255,0.3)'};
  color: ${props => props.$active ? 'white' : '#333'};
  border-radius: 8px;
  padding: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
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

const CategoryPage = ({ onAddToCart, onWishlist }) => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // State management - sama seperti AllProductsPage
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [activeFilter, setActiveFilter] = useState(searchParams.get('filter') || 'all');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'name');
  const [sortOrder, setSortOrder] = useState(searchParams.get('order') || 'asc');
  const [viewMode, setViewMode] = useState(searchParams.get('view') || 'grid');
  const [selectedBadge, setSelectedBadge] = useState(searchParams.get('badge') || 'all');
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page')) || 1);
  const productsPerPage = 9;

  // Filter options - same as AllProductsPage
  const filters = [
    { id: 'all', label: 'Semua', icon: null },
    { id: 'sale', label: 'Diskon', icon: '🏷️' },
    { id: 'organic', label: 'Organik', icon: '🌱' },
  ];

  // Sort options - same as AllProductsPage
  const sortOptions = [
    { id: 'name', label: 'Nama A-Z', icon: faSortAmountDown },
    { id: 'name-desc', label: 'Nama Z-A', icon: faSortAmountUp },
    { id: 'price-low', label: 'Harga Terendah', icon: faSortAmountDown },
    { id: 'price-high', label: 'Harga Tertinggi', icon: faSortAmountUp },
    { id: 'rating', label: 'Rating Tertinggi', icon: faSortAmountUp },
    { id: 'reviews', label: 'Paling Populer', icon: faSortAmountUp },
  ];



  // Filter products by category - sama seperti AllProductsPage
  const categoryProducts = useMemo(() => {
    return allProducts.filter(product => product.category === category);
  }, [category]);

  // Filter and sort logic - sama seperti AllProductsPage
  const filteredProducts = useMemo(() => {
    let filtered = categoryProducts;

    // Filter by active filter
    if (activeFilter !== 'all') {
      filtered = filtered.filter(product => product.badge === activeFilter);
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Badge filter
    if (selectedBadge !== 'all') {
      filtered = filtered.filter(product => product.badge === selectedBadge);
    }

    return filtered;
  }, [categoryProducts, activeFilter, searchTerm, selectedBadge]);

  // Sort products - updated to handle new sort options
  const sortedProducts = useMemo(() => {
    if (!sortBy) {
      return filteredProducts;
    }
    const sorted = [...filteredProducts].sort((a, b) => {
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
    return sorted;
  }, [filteredProducts, sortBy]);

  // Get unique badges from current category products
  const availableBadges = useMemo(() => {
    const badges = new Set(categoryProducts.map(product => product.badge).filter(Boolean));
    return ['all', ...Array.from(badges)];
  }, [categoryProducts]);

  // Get category config
  const config = categoryConfig[category] || {
    title: category.charAt(0).toUpperCase() + category.slice(1),
    description: `Produk ${category} berkualitas tinggi`,
    emoji: '📦',
    gradient: 'linear-gradient(135deg, #4CAF50 0%, #8BC34A 100%)'
  };

  // Pagination logic
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  // Update URL when filters change - sama seperti AllProductsPage
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (activeFilter !== 'all') params.set('filter', activeFilter);
    if (sortBy !== 'name') params.set('sort', sortBy);
    if (sortOrder !== 'asc') params.set('order', sortOrder);
    if (viewMode !== 'grid') params.set('view', viewMode);
    if (selectedBadge !== 'all') params.set('badge', selectedBadge);
    if (currentPage !== 1) params.set('page', currentPage);
    
    setSearchParams(params);
  }, [searchTerm, activeFilter, sortBy, sortOrder, viewMode, selectedBadge, currentPage]);

  // Load state from URL on mount - sama seperti AllProductsPage
  useEffect(() => {
    const search = searchParams.get('search');
    const filter = searchParams.get('filter');
    const sort = searchParams.get('sort');
    const order = searchParams.get('order');
    const view = searchParams.get('view');
    const badge = searchParams.get('badge');

    if (search) setSearchTerm(search);
    if (filter) setActiveFilter(filter);
    if (sort) setSortBy(sort);
    if (order) setSortOrder(order);
    if (view) setViewMode(view);
    if (badge) setSelectedBadge(badge);
  }, []);

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
    setCurrentPage(1);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleBadgeFilter = (badge) => {
    setSelectedBadge(badge);
    setCurrentPage(1);
  };

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`);
  };

  const getCurrentSortLabel = () => {
    const option = sortOptions.find(opt => opt.id === sortBy);
    return option ? option.label : 'Urutkan';
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    
    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    // Previous button
    pages.push(
      <PageButton
        key="prev"
        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        ‹
      </PageButton>
    );
    
    // First page and ellipsis
    if (startPage > 1) {
      pages.push(
        <PageButton
          key={1}
          onClick={() => setCurrentPage(1)}
          $active={currentPage === 1}
        >
          1
        </PageButton>
      );
      if (startPage > 2) {
        pages.push(<PageInfo key="start-ellipsis">...</PageInfo>);
      }
    }
    
    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PageButton
          key={i}
          onClick={() => setCurrentPage(i)}
          $active={currentPage === i}
        >
          {i}
        </PageButton>
      );
    }
    
    // Last page and ellipsis
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<PageInfo key="end-ellipsis">...</PageInfo>);
      }
      pages.push(
        <PageButton
          key={totalPages}
          onClick={() => setCurrentPage(totalPages)}
          $active={currentPage === totalPages}
        >
          {totalPages}
        </PageButton>
      );
    }
    
    // Next button
    pages.push(
      <PageButton
        key="next"
        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        ›
      </PageButton>
    );
    
    return pages;
  };

  return (
    <>
      {/* Banner - Desain Compact & Universal */}
      <Container>
        <ProductBanner gradient={config.gradient}>
          <BannerContent>
            <BannerText>
              <BannerTitle>{config.emoji} {config.title}</BannerTitle>
              <BannerSubtitle>{config.description}</BannerSubtitle>
            </BannerText>
            <BannerBadge>
              {filteredProducts.length} Produk
            </BannerBadge>
          </BannerContent>
        </ProductBanner>
      </Container>

      <Container>
        <ResultsHeader>
          <SearchContainer>
            <SearchInput
              type="text"
              placeholder={`Cari ${config.title.toLowerCase()}...`}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
            <SearchIcon>
              <FontAwesomeIcon icon={faSearch} />
            </SearchIcon>
          </SearchContainer>

          <ViewToggle>
            <SortDropdown>
              <SortButton onClick={() => setShowSortMenu(!showSortMenu)}>
                <FontAwesomeIcon icon={faFilter} />
                {getCurrentSortLabel()}
                <FontAwesomeIcon icon={faChevronDown} />
              </SortButton>
              {showSortMenu && (
                <SortMenu>
                  {sortOptions.map(option => (
                    <SortOption
                      key={option.id}
                      $active={sortBy === option.id}
                      onClick={() => {
                        setSortBy(option.id);
                        setShowSortMenu(false);
                      }}
                    >
                      <FontAwesomeIcon icon={option.icon} />
                      {option.label}
                    </SortOption>
                  ))}
                </SortMenu>
              )}
            </SortDropdown>
            
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





          <div style={{ marginTop: '2rem' }}>
          {currentProducts.length === 0 ? (
            <EmptyState>
              <h3>Produk tidak ditemukan</h3>
              <p>
                Coba ubah kata kunci pencarian atau filter yang digunakan untuk menemukan produk yang diinginkan.
              </p>
            </EmptyState>
          ) : (
            <>
              <ProductGrid $viewMode={viewMode}>
                {currentProducts.map(product => (
                  <ProductCard 
                    key={product.id}
                    product={product} 
                    viewMode={viewMode}
                    onAddToCart={onAddToCart}
                    onWishlist={onWishlist}
                    onProductClick={handleProductClick}
                  />
                ))}
              </ProductGrid>
              
              {totalPages > 1 && (
                <PaginationContainer>
                  {renderPageNumbers()}
                </PaginationContainer>
              )}
            </>
          )}
        </div>
      </Container>
    </>
  );
};

export default CategoryPage;