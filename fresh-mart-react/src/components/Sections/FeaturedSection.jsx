import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSeedling } from '@fortawesome/free-solid-svg-icons';
import { theme } from '../../styles/theme';
import { Container, Button, Section } from '../../styles/GlobalStyles';

const FeaturedContainer = styled.div`
  background: linear-gradient(135deg, var(--green, #10B981) 0%, var(--teal, #14B8A6) 100%);
  border-radius: var(--radius-lg, 20px);
  padding: 50px 40px;
  color: white;
  display: flex;
  align-items: center;
  gap: 40px;
  box-shadow: var(--shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1));
  width: 100%;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at top left, rgba(255,255,255,0.1) 0%, transparent 50%);
    pointer-events: none;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
    text-align: center;
    gap: 30px;
    padding: 40px 30px;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 30px 20px;
    gap: 25px;
  }
`;

const FeaturedContent = styled.div`
  flex: 1;
  z-index: 2;
`;

const FeaturedTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 15px;
  font-weight: ${theme.typography.fontWeight.bold};
  line-height: 1.2;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 2rem;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 1.8rem;
  }
`;

const FeaturedDescription = styled.p`
  margin-bottom: 25px;
  font-size: 1.1rem;
  opacity: 0.9;
  line-height: 1.6;
  max-width: 600px;

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 1rem;
  }
`;

const FeaturedImage = styled.div`
  flex: 1;
  text-align: center;
  z-index: 2;

  @media (max-width: ${theme.breakpoints.lg}) {
    order: -1;
  }
`;



const FeaturedSection = () => {
  const handleShopNow = () => {
    console.log('Explore Organic Products clicked in featured section');
    // Implement navigation to organic products page
  };

  return (
    <Section>
      <Container>
        <FeaturedContainer>
          <div className="featured-content" style={{ flex: 1 }}>
            <FeaturedTitle>
              Produk Organik Terbaik
            </FeaturedTitle>
            <FeaturedDescription>
              Kami menyediakan produk organik berkualitas tinggi yang ditanam tanpa pestisida dan bahan kimia berbahaya. Dapatkan kesehatan optimal untuk keluarga Anda.
            </FeaturedDescription>
            
            <Button onClick={handleShopNow} style={{ background: 'var(--orange, #F59E0B)', color: 'white' }}>
              <FontAwesomeIcon icon={faSeedling} />
              Jelajahi Produk Organik
            </Button>
          </div>

          <div className="featured-image" style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: '8rem', color: 'rgba(255,255,255,0.7)' }}>
              <FontAwesomeIcon icon={faSeedling} />
            </div>
          </div>
        </FeaturedContainer>
      </Container>
    </Section>
  );
};

export default FeaturedSection;