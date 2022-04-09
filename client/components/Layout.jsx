import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="bg-green-900 text-white font-bold">
      <Navbar />
      {children}

      <Footer />
    </div>
  );
}

export default Layout