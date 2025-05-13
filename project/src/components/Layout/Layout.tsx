import React from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1 px-4 py-8 mx-auto w-full max-w-7xl sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;