import React, { useState } from 'react';
import styled from 'styled-components';
//import headerImage from './../../images/header.png';
//import footerImage from './../../images/footer.png' ;


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Login attempted with:', email, password);
  };
  const handleClose = () => {
    // Handle close logic here
    console.log('Close button clicked');
  };

  return (
    <PageContainer>
      <LoginContainer>
        <HeaderImage src='./../../images/header.png' alt="Header" />
        <CloseButton onClick={handleClose}> X </CloseButton>
      
        <Title>Welcome to kidoo Parents !</Title>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputGroup>
          <ForgotPassword href="#">Forgot password?</ForgotPassword>
          <SubmitButton type="submit">Sign in</SubmitButton>
        </Form>
        <FooterImage src='./../../images/footer.png' alt="Footer" />
      </LoginContainer>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f0f0;
`;

const LoginContainer = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 60%;
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:column;

`;
const CloseButton = styled.button`
  position: absolute;
  top: 24%;
  right: 20%;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;
`;

const Title = styled.h1`
  color: #333;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputGroup = styled.div`
  margin-bottom: 1rem;
  width:100%;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #666;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const ForgotPassword = styled.a`
  text-align: right;
  color: #666;
  text-decoration: none;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const SubmitButton = styled.button`
  background-color: #7ed957;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #6ac746;
  }
`;
const HeaderImage = styled.img`
  width: 100%;
  object-fit: cover;
`;

const FooterImage = styled.img`
  width: 100%;
  object-fit: cover;
  margin-top: auto;
`;

export default LoginPage;