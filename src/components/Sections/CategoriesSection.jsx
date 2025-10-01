import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAppleAlt, faWineBottle, faUtensils, faTshirt, faMobileAlt, faPills, faBook, faBasketballBall } from '@fortawesome/free-solid-svg-icons';
import { theme } from '../../styles/theme';
import { Container, Section, SectionTitle, ViewAllLink, Grid } from '../../styles/GlobalStyles';
import CategoryCard from '../Category/CategoryCard';

const categories = [
  {
    id: 1,
    icon: faAppleAlt,
    title: 'Buah & Sayur',
    description: 'Buah dan sayuran segar pilihan',
    color: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    category: 'fruits',
  },
  {
    id: 2,
    icon: faWineBottle,
    title: 'Minuman',
    description: 'Berbagai minuman segar dan sehat',
    color: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
  },
  {
    id: 3,
    icon: faUtensils,
    title: 'Makanan',
    description: 'Makanan lezat dan bergizi',
    color: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
  },
  {
    id: 4,
    icon: faTshirt,
    title: 'Pakaian',
    description: 'Fashion terkini untuk semua usia',
    color: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)',
  },
  {
    id: 5,
    icon: faMobileAlt,
    title: 'Elektronik',
    description: 'Gadget dan perangkat terbaru',
    color: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
  },
  {
    id: 6,
    icon: faPills,
    title: 'Kesehatan',
    description: 'Produk kesehatan dan kecantikan',
    color: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)',
  },
  {
    id: 7,
    icon: faBook,
    title: 'Buku & Alat Tulis',
    description: 'Buku dan perlengkapan sekolah',
    color: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
  },
  {
    id: 8,
    icon: faBasketballBall,
    title: 'Olahraga',
    description: 'Peralatan olahraga dan fitness',
    color: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
  },
];

const CategoriesSection = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    if (category.category) {
      navigate(`/category/${category.category}`);
    } else {
      console.log('Category clicked:', category.title);
    }
  };

  return (
    <Section>
      <Container>
        <SectionTitle>
          <h2>Kategori Populer</h2>
          <ViewAllLink href="#categories">
            Lihat Semua
            <FontAwesomeIcon icon="arrow-right" />
          </ViewAllLink>
        </SectionTitle>
        
        <Grid cols={4} gap="25px">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              icon={category.icon}
              title={category.title}
              description={category.description}
              onClick={() => handleCategoryClick(category)}
              color={category.color}
            />
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default CategoriesSection;