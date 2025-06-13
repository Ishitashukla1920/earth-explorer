import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useRouter } from 'next/router';
import { label } from 'framer-motion/client';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<string>('home');
  const router = useRouter();

  // Set currentPage based on URL
  useEffect(() => {
    const path = router.pathname;
    const page = path === '/' ? 'home' : path.replace('/', '');
    setCurrentPage(page);
  }, [router.pathname]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = [
    // { href: '/', label: 'Home', id: 'home' },
    { href: '/team', label: 'Team', id: 'team' },
    { href: '/watch', label: 'Watch', id: 'watch' },
  ];

// Determine background and active link color before returning JSX
const isLightBg = ['home', 'team','watch'].includes(currentPage);
const linkTextColor = !isLightBg ? 'text-black' : 'text-white';
const border = isLightBg ? 'border-white' : 'border-black';

return (
  <nav
    className={`relative z-50 flex items-center padding-new ${
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
     <Link href='/' >   <Image
          src={isLightBg? '/logoEEx.png' : '/logo-black.png' }
          alt="Logo"
          width={isMobile ? 47 : 58}
          height={isMobile ? 47.6 : 76}
          className="rounded-full opacity-60"
        />
        </Link>
      </div>

      {/* Desktop Navigation */}
      {!isMobile && navLinks.map((link) => (
  <Link href={link.href} key={link.id}>
    <button
      style={{
                  fontFamily: "Aboreto, Sans-serif",
                }}
      className={`text-sm sm:text-base md:text-lg font-light cursor-pointer opacity-65 ${linkTextColor} ${
        currentPage === link.id ? 'border-b-2 ${border} pb-1' : ''
      }`}
    >
      {link.label}
    </button>
  </Link>
))}

    </div>

      {/* Mobile Menu Icon */}
      {isMobile && (
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`text-${!['home', 'team'].includes(currentPage)? 'black' : 'white' }  focus:outline-none z-50}`}
        >
          {menuOpen ? <X size={32} className='opacity-60' /> : <Menu size={32} className='opacity-60' color={!['home', 'team','watch'].includes(currentPage)? 'black' : 'white' } />}
        </button>
      )}

      {/* Mobile Menu Dropdown */}
      {isMobile && menuOpen && (
        <div className="fixed top-14 left-0 w-full bg-white z-40 shadow-lg transition-all  ">
          {navLinks.map((link) => (
            <Link key={link.id} href={link.href}>
              <button
                onClick={() => setMenuOpen(false)} // No need to manually set currentPage
                className={`text-lg py-3 w-full text-center  ${
                  currentPage === link.id ? 'text-black bg-amber-100' : 'text-amber-800'
                } hover:bg-amber-200 transition-colors border-b border-gray-300`}
                style={{
                  fontFamily: "Aboreto, Sans-serif",
                }}
              >
                {link.label}
              </button>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
