import React, { useState } from 'react';
import logoImage from '../assets/rick-morty-logo.svg';
import { Page } from '../types/pages';

interface NavbarProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onPageChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (page: Page) => {
    onPageChange(page);
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-[#121212] z-50">
      <nav className="w-full max-w-[1440px] h-[52px] mx-auto">
        <div className="h-full px-4 flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={logoImage}
              alt="Rick and Morty Logo"
              className="h-8 w-auto mr-2"
              onClick={() => handleNavClick('characters')}
              style={{ cursor: 'pointer' }}
            />
          </div>
          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => handleNavClick('characters')}
              className={`text-white hover:text-gray-300 transition-colors duration-200 ${
                currentPage === 'characters' ? 'font-bold' : ''
              }`}
            >
              Characters
            </button>
            <button 
              onClick={() => handleNavClick('episodes')}
              className={`text-white hover:text-gray-300 transition-colors duration-200 ${
                currentPage === 'episodes' ? 'font-bold' : ''
              }`}
            >
              Episodes
            </button>
            <button 
              onClick={() => handleNavClick('about')}
              className={`text-white hover:text-gray-300 transition-colors duration-200 ${
                currentPage === 'about' ? 'font-bold' : ''
              }`}
            >
              About
            </button>
          </div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#121212] shadow-lg">
            <button 
              onClick={() => handleNavClick('characters')}
              className={`block w-full text-left px-4 py-3 text-white hover:bg-gray-800 transition-colors ${
                currentPage === 'characters' ? 'font-bold' : ''
              }`}
            >
              Characters
            </button>
            <button 
              onClick={() => handleNavClick('episodes')}
              className={`block w-full text-left px-4 py-3 text-white hover:bg-gray-800 transition-colors ${
                currentPage === 'episodes' ? 'font-bold' : ''
              }`}
            >
              Episodes
            </button>
            <button 
              onClick={() => handleNavClick('about')}
              className={`block w-full text-left px-4 py-3 text-white hover:bg-gray-800 transition-colors ${
                currentPage === 'about' ? 'font-bold' : ''
              }`}
            >
              About
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;