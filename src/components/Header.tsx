// components/Navbar.tsx
import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react'; 

const Navbar = () => {
    const [currentPage, setCurrentPage] = useState<string>('home');
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        // Function to check if the screen is mobile size
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

  return (
    <nav
        className={`relative z-50 flex items-center ${
          isMobile ? 'justify-between' : 'justify-start'
        } p-2 md:p-8`}
        style={{
          fontFamily: 'Radley',
          ...(isMobile
            ? {
                width: '100%',
                height: '40px',
                position: 'absolute',
                top: 0,
                left: 0,
              }
            : {}),
        }}
      >
        <div className="flex items-center space-x-3 sm:space-x-4 md:space-x-8">
          {/* Logo */}
          <div style={isMobile ? { position: 'absolute', left: '10px', top: '9px' } : {}}>
            <Image
              src="/logo-black.png"
              alt="Logo"
              width={isMobile ? 40 : 58}
              height={isMobile ? 40.6 : 76}
              className="rounded-full"
            />
          </div>
          
          {/* Desktop Navigation Links */}
          {!isMobile && (
            <>
              <Link href="/">
                <button
                  className={`text-sm sm:text-base md:text-lg font-light cursor-pointer ${
                    currentPage === 'home' ? 'border-b-2 border-white pb-1 text-amber-100' : ''
                  }`}
                >
                  Home
                </button>
              </Link>
              <Link href="/team">
                <button
                  className="text-sm sm:text-base md:text-lg font-light cursor-pointer border-b-2 border-white pb-1 text-amber-100"
                >
                  Team
                </button>
              </Link>
              <Link href="/vision">
                <button
                  className={`text-sm sm:text-base md:text-lg font-light cursor-pointer ${
                    currentPage === 'vision' ? 'border-b-2 border-white pb-1 text-amber-100' : ''
                  }`}
                >
                  Vision
                </button>
              </Link>
              <Link href="/about">
                <button
                  className={`text-sm sm:text-base md:text-lg font-light cursor-pointer ${
                    currentPage === 'about' ? 'border-b-2 border-white pb-1 text-amber-100' : ''
                  }`}
                >
                  About
                </button>
              </Link>
            </>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        {isMobile && (
          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="text-black-100 focus:outline-none z-50"
          >
            {menuOpen ? <X size={32} /> : <Menu size={32} color={'black'} />}
          </button>
        )}
        
        {/* Mobile Menu Dropdown */}
        {isMobile && menuOpen && (
          <div className="fixed top-14 left-0 w-full bg-white z-40 shadow-lg transition-all">
            <Link href="/">
              <button
                onClick={() => {
                  setCurrentPage('home');
                  setMenuOpen(false);
                }}
                className={`text-lg py-3 w-full text-center ${
                  currentPage === 'home' ? 'bg-gray-100 text-black' : 'text-black'
                } hover:bg-gray-200 transition-colors border-b border-gray-300`}
              >
                Home
              </button>
            </Link>
            <Link href="/team">
              <button
                onClick={() => {
                  setCurrentPage('team');
                  setMenuOpen(false);
                }}
                className={`text-lg py-3 w-full text-center ${
                  currentPage === 'team' ? 'bg-gray-100 text-black' : 'text-black'
                } hover:bg-gray-200 transition-colors border-b border-gray-300`}
              >
                Team
              </button>
            </Link>
            <Link href="/vision">
              <button
                onClick={() => {
                  setCurrentPage('vision');
                  setMenuOpen(false);
                }}
                className={`text-lg py-3 w-full text-center ${
                  currentPage === 'vision' ? 'bg-gray-100 text-black' : 'text-black'
                } hover:bg-gray-200 transition-colors border-b border-gray-300`}
              >
                Vision
              </button>
            </Link>
            <Link href="/about">
              <button
                onClick={() => {
                  setCurrentPage('about');
                  setMenuOpen(false);
                }}
                className={`text-lg py-3 w-full text-center ${
                  currentPage === 'about' ? 'bg-gray-100 text-black' : 'text-black'
                } hover:bg-gray-200 transition-colors border-b border-gray-300`}
              >
                About
              </button>
            </Link>
          </div>
        )}
      </nav>
  );
};

export default Navbar;
