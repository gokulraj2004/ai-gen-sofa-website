import React from 'react';
import { Outlet } from 'react-router-dom';
import { CartProvider } from '../../context/CartContext';
import Header from './Header';
import Footer from './Footer';

const Layout: React.FC = () => {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <Outlet />
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
};

export default Layout;