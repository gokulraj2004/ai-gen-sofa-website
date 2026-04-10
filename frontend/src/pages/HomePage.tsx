import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="space-y-12">
      <section className="text-center py-16 bg-gradient-to-r from-primary-50 to-primary-100 rounded-2xl">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Welcome to Sofa Website
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Discover our collection of premium sofas and furniture for your home.
        </p>
        <Link
          to="/products"
          className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-primary-700 transition-colors"
        >
          Shop Now
        </Link>
      </section>
    </div>
  );
};

export default HomePage;