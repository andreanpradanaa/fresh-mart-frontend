import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag, faPlayCircle, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { theme } from '../../styles/theme';
import { Container, Button, Section } from '../../styles/GlobalStyles';

const HeroContainer = styled.div`
  background: linear-gradient(135deg, var(--teal) 0%, var(--blue) 100%);
  border-radius: ${theme.borderRadius.lg};
  padding: 60px 40px;
  color: white;
  position: relative;
  overflow: hidden;
  box-shadow: ${theme.shadows.lg};
  min-height: 25rem;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border: 1px solid rgba(255, 255, 255, 0.1);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 30% 70%, rgba(255,255,255,0.1) 0%, transparent 50%),
                radial-gradient(circle at 70% 30%, rgba(255,255,255,0.05) 0%, transparent 50%);
    pointer-events: none;
  }

  @media (max-width: ${theme.breakpoints.lg}) {
    padding: 50px 30px;
    min-height: 21.875rem;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 40px 20px;
    min-height: 18.75rem;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 30px 20px;
    min-height: 15.625rem;
  }
`;

const HeroContent = styled.div`
  max-width: 50%;
  z-index: 2;
  position: relative;

  @media (max-width: ${theme.breakpoints.lg}) {
    max-width: 100%;
    text-align: center;
  }
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 15px;
  line-height: 1.1;
  font-weight: 700;
  animation: fadeInUp 1s ease-out;
  word-break: break-word;
  color: white;

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: ${theme.breakpoints.lg}) {
    font-size: 3rem;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 2.5rem;
    text-align: center;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 2rem;
  }

  @media (max-width: 400px) {
    font-size: 1.8rem;
  }
`;

const HeroDescription = styled.p`
  font-size: 1.2rem;
  margin-bottom: 30px;
  opacity: 0.9;
  line-height: 1.6;
  animation: fadeInUp 1s ease-out 0.3s both;
  text-align: left;
  color: white;
  max-width: 600px;

  @media (max-width: ${theme.breakpoints.md}) {
    text-align: center;
    margin: 0 auto 30px auto;
    font-size: 1.1rem;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 1rem;
  }
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 20px;
  animation: fadeInUp 1s ease-out 0.4s both;
  align-items: center;

  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
    gap: 15px;
  }
`;

const HeroImage = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;

  @media (max-width: ${theme.breakpoints.lg}) {
    display: none;
  }
`;

const FloatingElement = styled.div`
  position: absolute;
  border-radius: 50%;
  opacity: 0.15;
  animation: float 8s infinite ease-in-out;
  background: ${theme.colors.white};
  backdrop-filter: blur(2px);
  border: 1px solid rgba(255, 255, 255, 0.2);

  &:nth-child(1) {
    width: clamp(60px, 8vw, 80px);
    height: clamp(60px, 8vw, 80px);
    top: 20%;
    left: 10%;
    animation-delay: 0s;
  }

  &:nth-child(2) {
    width: clamp(40px, 6vw, 60px);
    height: clamp(40px, 6vw, 60px);
    top: 60%;
    left: 80%;
    animation-delay: 2s;
  }

  &:nth-child(3) {
    width: clamp(30px, 4vw, 40px);
    height: clamp(30px, 4vw, 40px);
    top: 80%;
    left: 20%;
    animation-delay: 4s;
  }

  @keyframes float {
    0% { transform: translateY(0) rotate(0deg) scale(1); }
    25% { transform: translateY(-15px) rotate(90deg) scale(1.05); }
    50% { transform: translateY(-25px) rotate(180deg) scale(0.95); }
    75% { transform: translateY(-10px) rotate(270deg) scale(1.02); }
    100% { transform: translateY(0) rotate(360deg) scale(1); }
  }
`;

const Hero = () => {
  const handleShopNow = () => {
    console.log('Shop Now clicked');
    // Implement navigation to shop page
  };

  const handleLearnMore = () => {
    console.log('Learn More clicked');
    // Implement scroll to about section
  };

  return (
    <Section>
      <Container>
        <HeroContainer>
          <HeroContent>
            <HeroTitle>
              Segar & Sehat
              <br />
              untuk Keluarga Anda!
            </HeroTitle>
            <HeroDescription>
              Dapatkan diskon spesial hingga 50% untuk pembelian pertama Anda. 
              Belanja produk segar dan berkualitas dengan harga terjangkau!
            </HeroDescription>
            <HeroButtons>
              <Button onClick={handleShopNow} style={{ 
                background: 'white', 
                color: 'var(--teal)',
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px',
                fontWeight: '700',
                padding: '14px 30px',
                borderRadius: '50px',
                boxShadow: 'var(--shadow-md)',
                transition: 'all 0.3s'
              }}>
                <FontAwesomeIcon icon={faShoppingBag} />
                Belanja Sekarang
              </Button>
              <Button $variant="outline" onClick={handleLearnMore} style={{ 
                background: 'transparent', 
                border: '2px solid white',
                color: 'white',
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px',
                fontWeight: '700',
                padding: '14px 30px',
                borderRadius: '50px',
                marginLeft: '15px',
                transition: 'all 0.3s'
              }}>
                <FontAwesomeIcon icon={faPlayCircle} />
                Lihat Promo
              </Button>
            </HeroButtons>
          </HeroContent>
          
          <HeroImage>
            {/* Add hero image here */}
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(20, 184, 166, 0.3)',
              fontSize: 'clamp(6rem, 15vw, 10rem)'
            }}>
              <FontAwesomeIcon icon={faShoppingBasket} />
            </div>
          </HeroImage>
          
          {/* Floating elements */}
          <FloatingElement style={{ top: '15%', left: '8%' }}>
            <div style={{ 
              width: '60px', 
              height: '60px', 
              background: 'rgba(20, 184, 166, 0.1)', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontSize: '24px',
              color: 'var(--teal)'
            }}>🍎</div>
          </FloatingElement>
          <FloatingElement style={{ top: '25%', right: '12%' }}>
            <div style={{ 
              width: '80px', 
              height: '80px', 
              background: 'rgba(20, 184, 166, 0.1)', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontSize: '32px',
              color: 'var(--teal)'
            }}>🥕</div>
          </FloatingElement>
          <FloatingElement style={{ bottom: '25%', left: '10%' }}>
            <div style={{ 
              width: '70px', 
              height: '70px', 
              background: 'rgba(20, 184, 166, 0.1)', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontSize: '28px',
              color: 'var(--teal)'
            }}>🥬</div>
          </FloatingElement>
          <FloatingElement style={{ bottom: '15%', right: '8%' }}>
            <div style={{ 
              width: '65px', 
              height: '65px', 
              background: 'rgba(20, 184, 166, 0.1)', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontSize: '26px',
              color: 'var(--teal)'
            }}>🍊</div>
          </FloatingElement>
        </HeroContainer>
      </Container>
    </Section>
  );
};

export default Hero;