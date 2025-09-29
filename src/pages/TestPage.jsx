import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const TestContainer = styled.div`
  padding: 50px;
  text-align: center;
`;

const TestLink = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  margin: 10px;
  background: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  
  &:hover {
    background: #0056b3;
  }
`;

const TestPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path) => {
    console.log('Navigating to:', path);
    navigate(path);
  };

  return (
    <TestContainer>
      <h1>Test Navigation Page</h1>
      <div>
        <TestLink to="/">Go to Home (Link)</TestLink>
        <TestLink to="/products">Go to All Products (Link)</TestLink>
        <TestLink to="/product/1">Go to Product Detail (Link)</TestLink>
      </div>
      <div>
        <button onClick={() => handleNavigate('/')}>Go to Home (Navigate)</button>
        <button onClick={() => handleNavigate('/products')}>Go to All Products (Navigate)</button>
        <button onClick={() => handleNavigate('/product/1')}>Go to Product Detail (Navigate)</button>
      </div>
      <p>Current URL: {location.pathname}</p>
      <p>Current Search: {location.search}</p>
    </TestContainer>
  );
};

export default TestPage;