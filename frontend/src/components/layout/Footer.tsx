import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Sofa Website. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;