import React from 'react';
import "../auth.css";
import Header from './Header';
import Body from './Body';
import Footer from './Footer';

const RegisterPage: React.FC = () => {
  return ( 
    <div className="auth">
      <Header></Header>
      <Body></Body>  
      <Footer></Footer>
    </div>
  );
};

export default RegisterPage;
