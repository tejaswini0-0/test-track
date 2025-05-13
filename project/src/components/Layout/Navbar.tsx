import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Beaker, LayoutDashboard, Menu, X } from 'lucide-react';
import Button from '../ui/Button';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex items-center flex-shrink-0">
              <Link to="/" className="flex items-center space-x-2">
                <Beaker className="w-8 h-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">TestTrack</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/')
                    ? 'border-blue-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/projects"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/projects') || location.pathname.startsWith('/projects/')
                    ? 'border-blue-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Projects
              </Link>
            </div>
          </div>
          <div className="flex items-center sm:hidden">
            <Button variant="ghost" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className={`block py-2 pl-3 pr-4 text-base font-medium ${
                isActive('/')
                  ? 'bg-blue-50 border-l-4 border-blue-500 text-blue-700'
                  : 'border-l-4 border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
              }`}
              onClick={closeMobileMenu}
            >
              Dashboard
            </Link>
            <Link
              to="/projects"
              className={`block py-2 pl-3 pr-4 text-base font-medium ${
                isActive('/projects') || location.pathname.startsWith('/projects/')
                  ? 'bg-blue-50 border-l-4 border-blue-500 text-blue-700'
                  : 'border-l-4 border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
              }`}
              onClick={closeMobileMenu}
            >
              Projects
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;