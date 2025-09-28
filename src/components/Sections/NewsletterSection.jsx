import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { theme } from '../../styles/theme';
import { Container, Section, Button } from '../../styles/GlobalStyles';

const NewsletterContainer = styled.div`
  background: linear-gradient(135deg, ${theme.colors.secondary} 0%, ${theme.colors.success} 100%);
  border-radius: ${theme.borderRadius.lg};
  padding: 50px 20px;
  text-align: center;
  color: ${theme.colors.white};
  box-shadow: ${theme.shadows.lg};
  position: relative;
  overflow: hidden;
  margin: 40px 0;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at top right, rgba(255,255,255,0.1) 0%, transparent 40%);
    pointer-events: none;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 30px 20px;
    margin: 30px 0;
  }
`;

const NewsletterTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 15px;
  font-weight: ${theme.typography.fontWeight.bold};
  text-align: center;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 2rem;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 1.8rem;
  }
`;

const NewsletterDescription = styled.p`
  max-width: 600px;
  margin: 0 auto 30px;
  font-size: 1.1rem;
  opacity: 0.9;
  line-height: 1.6;
  text-align: center;

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 1rem;
  }
`;

const NewsletterForm = styled.form`
  display: flex;
  max-width: 500px;
  margin: 0 auto;
  gap: 0;
  border-radius: 50px;
  overflow: hidden;
  box-shadow: ${theme.shadows.md};
  background: ${theme.colors.white};
  width: 100%;

  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
    border-radius: ${theme.borderRadius.md};
    gap: 10px;
    background: transparent;
    box-shadow: none;
  }
`;

const NewsletterInput = styled.input`
  flex: 1;
  padding: 15px 20px;
  border: none;
  font-size: ${theme.typography.fontSize.base};
  outline: none;
  background: ${theme.colors.white};
  color: ${theme.colors.black};
  border-radius: 50px 0 0 50px;

  &::placeholder {
    color: ${theme.colors.grayDark};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    border-radius: ${theme.borderRadius.md};
    box-shadow: ${theme.shadows.sm};
  }
`;

const NewsletterButton = styled(Button)`
  padding: 15px 30px;
  background: var(--teal, #14B8A6);
  color: ${theme.colors.white};
  border-radius: 0 50px 50px 0;
  margin: 0;
  border: none;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: ${theme.typography.fontWeight.bold};
  transition: ${theme.transitions.normal};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
  }

  &:hover {
    background: var(--teal-dark, #0D9488);
    transform: none;
    box-shadow: none;
  }

  &:hover::before {
    left: 100%;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    border-radius: ${theme.borderRadius.md};
    width: 100%;
    justify-content: center;
  }
`;

const SuccessMessage = styled.div`
  background: rgba(255, 255, 255, 0.2);
  border-radius: ${theme.borderRadius.md};
  padding: 15px 20px;
  margin-top: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  animation: slideIn 0.5s ease-out;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const FloatingElement = styled.div`
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
  animation: float 6s infinite ease-in-out;
  background: ${theme.colors.white};

  &:nth-child(1) {
    width: 60px;
    height: 60px;
    top: 20%;
    left: 10%;
    animation-delay: 0s;
  }

  &:nth-child(2) {
    width: 80px;
    height: 80px;
    bottom: 30%;
    right: 15%;
    animation-delay: 2s;
  }

  &:nth-child(3) {
    width: 40px;
    height: 40px;
    top: 70%;
    left: 80%;
    animation-delay: 4s;
  }

  @keyframes float {
    0% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
    100% { transform: translateY(0) rotate(360deg); }
  }
`;

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Email tidak boleh kosong');
      return;
    }

    if (!validateEmail(email)) {
      setError('Format email tidak valid');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSuccess(true);
      setEmail('');
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (error) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section>
      <Container>
        <NewsletterContainer>
          <NewsletterTitle>
            Dapatkan Penawaran Spesial!
          </NewsletterTitle>
          <NewsletterDescription>
            Berlangganan newsletter kami untuk mendapatkan diskon eksklusif dan update produk terbaru
          </NewsletterDescription>

          <NewsletterForm onSubmit={handleSubmit}>
            <NewsletterInput
              type="email"
              placeholder="Masukkan alamat email Anda"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              required
            />
            <NewsletterButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                'Mengirim...'
              ) : (
                <>
                  Berlangganan
                  <FontAwesomeIcon icon={faPaperPlane} />
                </>
              )}
            </NewsletterButton>
          </NewsletterForm>

          {error && (
            <div style={{ 
              color: '#ff6b6b', 
              marginTop: '10px', 
              fontSize: '0.9rem',
              background: 'rgba(255, 107, 107, 0.1)',
              padding: '8px 12px',
              borderRadius: '6px',
              display: 'inline-block'
            }}>
              {error}
            </div>
          )}

          {isSuccess && (
            <SuccessMessage>
              🎉 Terima kasih! Anda berhasil berlangganan newsletter kami.
            </SuccessMessage>
          )}
          
          {/* Floating elements for decoration */}
          <FloatingElement />
          <FloatingElement />
          <FloatingElement />
        </NewsletterContainer>
      </Container>
    </Section>
  );
};

export default NewsletterSection;