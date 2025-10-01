import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import Header from './components/Header/Header';
import Navigation from './components/Navigation/Navigation';
import Hero from './components/Hero/Hero';
import CategoriesSection from './components/Sections/CategoriesSection';
import ProductsSection from './components/Sections/ProductsSection';
import FeaturedSection from './components/Sections/FeaturedSection';
import NewsletterSection from './components/Sections/NewsletterSection';
import Footer from './components/Footer/Footer';
import ProductDetailPage from './pages/ProductDetailPage';
import AllProductsPage from './pages/AllProductsPage';
import CategoryPage from './pages/CategoryPage';


import { theme } from './styles/theme';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #F0FDF4 0%, #ECFDF5 100%);
  width: 100%;
  overflow-x: hidden;
  position: relative;
`;

const MainContent = styled.main`
  padding-top: 7rem; /* Tambahkan padding untuk menghindari tumpang tindih dengan header fixed */
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding-top: 6rem; /* Kurangi padding untuk mobile */
  }
`;

// HomePage component
const HomePage = ({ cartItems, wishlistItems, searchQuery, onAddToCart, onAddToWishlist, onSearch }) => (
  <>
    <Header 
      cartItems={cartItems}
      wishlistCount={wishlistItems.length}
      onSearch={onSearch}
    />
    <MainContent>
      <div style={{ width: '100%', margin: '-25px auto' }}>
        <Hero />
        <CategoriesSection />
        <FeaturedSection />
        <ProductsSection 
          searchQuery={searchQuery}
          onAddToCart={onAddToCart}
          onAddToWishlist={onAddToWishlist}
          wishlistItems={wishlistItems}
        />
        <NewsletterSection />
      </div>
    </MainContent>
    <Footer />
  </>
);

function App() {
  const [cartItems, setCartItems] = useState(0);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const addToCart = (product) => {
    setCartItems(prev => prev + 1);
  };

  const addToWishlist = (product) => {
    setWishlistItems(prev => 
      prev.includes(product.id) 
        ? prev.filter(id => id !== product.id)
        : [...prev, product.id]
    );
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <Router>
      <AppContainer>
        <GlobalStyles />
        <Routes>
          <Route 
            path="/" 
            element={
              <HomePage
                cartItems={cartItems}
                wishlistItems={wishlistItems}
                searchQuery={searchQuery}
                onAddToCart={addToCart}
                onAddToWishlist={addToWishlist}
                onSearch={handleSearch}
              />
            } 
          />
          <Route 
            path="/products" 
            element={
              <>
                <Header 
                  cartItems={cartItems}
                  wishlistCount={wishlistItems.length}
                  onSearch={handleSearch}
                />
                <MainContent>
                  <AllProductsPage
                    onAddToCart={addToCart}
                    onWishlist={addToWishlist}
                  />
                </MainContent>
                <Footer />
              </>
            } 
          />
          <Route 
            path="/product/:id" 
            element={
              <>
                <Header 
                  cartItems={cartItems}
                  wishlistCount={wishlistItems.length}
                  onSearch={handleSearch}
                />
                <MainContent>
                  <ProductDetailPage
                    onAddToCart={addToCart}
                    onWishlist={addToWishlist}
                  />
                </MainContent>
                <Footer />
              </>
            } 
          />
          <Route 
            path="/category/:category" 
            element={
              <>
                <Header 
                  cartItems={cartItems}
                  wishlistCount={wishlistItems.length}
                  onSearch={handleSearch}
                />
                <MainContent>
                  <CategoryPage
                    onAddToCart={addToCart}
                    onWishlist={addToWishlist}
                  />
                </MainContent>
                <Footer />
              </>
            } 
          />


        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App;
