import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf, faPhone, faEnvelope, faMapMarkerAlt, faClock, faQuestionCircle, faCreditCard, faTruck, faUndo, faInfoCircle, faStore, faBriefcase, faShieldAlt, faFileContract, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { theme } from '../../styles/theme';
import { Container } from '../../styles/GlobalStyles';

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(249, 250, 251, 0.95) 100%);
  backdrop-filter: blur(10px);
  padding: 60px 0 30px;
  box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.05);
  margin-top: 30px;
  border-top: 1px solid rgba(20, 184, 166, 0.1);

  @media (max-width: ${theme.breakpoints.md}) {
    margin-top: 20px;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    margin-top: 15px;
  }
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;
  margin-bottom: 40px;

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const FooterColumn = styled.div`
  h3 {
    margin-bottom: 1.25rem;
    color: var(--teal, #14B8A6);
    font-size: 1.3rem;
    font-weight: ${theme.typography.fontWeight.bold};
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 0.625rem;
    display: flex;
    align-items: center;
    gap: 0.625rem;
  }

  a {
    text-decoration: none;
    color: ${theme.colors.grayDark};
    transition: ${theme.transitions.normal};
    font-size: ${theme.typography.fontSize.sm};

    &:hover {
      color: var(--teal, #14B8A6);
      transform: translateX(0.1875rem);
    }
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  font-size: 1.8rem;
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.primary};
  margin-bottom: 0.9375rem;

  svg {
    font-size: 2.2rem;
    background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.accent} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Description = styled.p`
  color: ${theme.colors.grayDark};
  font-size: ${theme.typography.fontSize.sm};
  line-height: 1.6;
  margin-bottom: 1.25rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 0.9375rem;
  margin-top: 1.25rem;
`;

const SocialLink = styled.a`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: ${theme.colors.grayLight};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.grayDark};
  text-decoration: none;
  transition: ${theme.transitions.normal};
  font-size: 1.2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    transition: left 0.5s;
  }

  &:hover {
    background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.accent} 100%);
    color: ${theme.colors.white};
    transform: translateY(-0.1875rem) scale(1.1);
    box-shadow: ${theme.shadows.md};
  }

  &:hover::before {
    left: 100%;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;
  color: ${theme.colors.grayDark};
  font-size: ${theme.typography.fontSize.sm};

  svg {
    color: ${theme.colors.primary};
    margin-top: 0.1875rem;
    min-width: 1rem;
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 30px;
  border-top: 1px solid rgba(20, 184, 166, 0.2);
  color: ${theme.colors.grayDark};
  font-size: 0.9rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 2px;
    background: linear-gradient(90deg, transparent, ${theme.colors.primary}, transparent);
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 0.8rem;
  }
`;

const PaymentMethods = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.9375rem;
  margin-bottom: 0.9375rem;
  flex-wrap: wrap;
`;

const PaymentIcon = styled.div`
  width: 2.5rem;
  height: 1.5625rem;
  background: ${theme.colors.grayLight};
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.grayDark};
`;

const footerLinks = {
  help: [
    { label: 'Cara Belanja', href: '#help', icon: faQuestionCircle },
    { label: 'Pembayaran', href: '#payment', icon: faCreditCard },
    { label: 'Pengiriman', href: '#shipping', icon: faTruck },
    { label: 'Pengembalian', href: '#returns', icon: faUndo },
    { label: 'FAQ', href: '#faq', icon: faInfoCircle },
  ],
  about: [
    { label: 'Tentang FreshMart', href: '#about', icon: faStore },
    { label: 'Karir', href: '#careers', icon: faBriefcase },
    { label: 'Kebijakan Privasi', href: '#privacy', icon: faShieldAlt },
    { label: 'Syarat & Ketentuan', href: '#terms', icon: faFileContract },
    { label: 'Hubungi Kami', href: '#contact', icon: faPhone },
  ],
};

const Footer = () => {
  return (
    <FooterContainer>
      <Container>
        <FooterContent>
          <FooterColumn>
            <h3>FreshMart</h3>
            <Description>
              Toko online dengan produk-produk segar dan berkualitas untuk kesehatan keluarga Anda!
            </Description>
            <SocialLinks>
              <SocialLink href="#" aria-label="Instagram">
                <FontAwesomeIcon icon={faInstagram} />
              </SocialLink>
              <SocialLink href="#" aria-label="Facebook">
                <FontAwesomeIcon icon={faFacebook} />
              </SocialLink>
              <SocialLink href="#" aria-label="Twitter">
                <FontAwesomeIcon icon={faTwitter} />
              </SocialLink>
              <SocialLink href="#" aria-label="TikTok">
                <FontAwesomeIcon icon={faTiktok} />
              </SocialLink>
            </SocialLinks>
          </FooterColumn>

          <FooterColumn>
            <h3>Bantuan</h3>
            <ul>
              {footerLinks.help.map((link, index) => (
                <li key={index}>
                  <FontAwesomeIcon icon={link.icon} />
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn>
            <h3>Tentang Kami</h3>
            <ul>
              {footerLinks.about.map((link, index) => (
                <li key={index}>
                  <FontAwesomeIcon icon={link.icon} />
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn>
            <h3>Kontak</h3>
            <ContactInfo>
              <ContactItem>
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                <span>Jl. Sehat No. 123, Jakarta</span>
              </ContactItem>
              <ContactItem>
                <FontAwesomeIcon icon={faPhone} />
                <span>(021) 1234-5678</span>
              </ContactItem>
              <ContactItem>
                <FontAwesomeIcon icon={faEnvelope} />
                <span>hello@freshmart.com</span>
              </ContactItem>
              <ContactItem>
                <FontAwesomeIcon icon={faClock} />
                <span>Buka setiap hari 07:00 - 22:00</span>
              </ContactItem>
            </ContactInfo>
          </FooterColumn>
        </FooterContent>

        <Copyright>
          <p>
            &copy; 2023 FreshMart. All rights reserved. | Made with <FontAwesomeIcon icon={faHeart} style={{color: 'var(--teal, #14B8A6)'}} /> for healthy living
          </p>
        </Copyright>
      </Container>
    </FooterContainer>
  );
};

export default Footer;