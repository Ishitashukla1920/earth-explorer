// components/Navbar.tsx
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className="absolute top-0 left-11 right-0 z-50 py-2 px-4 md:py-4 md:px-6">
      <div className="flex items-center justify-start space-x-6 md:space-x-8">
        {/* Logo */}
        <div className="flex items-center">
          <div className="w-16 h-16 md:w-16 md:h-16 relative">
            <Image
              src="/logo-black.png"
              alt="Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Navigation Links (Desktop) */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          <Link 
            href="/" 
            className="text-black hover:text-gray-700 transition-colors text-lg lg:text-xl"
            style={{ fontFamily: 'Radley, serif' }}
          >
            Home
          </Link>
          <Link 
            href="/team" 
            className="text-black hover:text-gray-700 transition-colors text-lg lg:text-xl"
            style={{ fontFamily: 'Radley, serif' }}
          >
            Team
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden ml-auto">
          <button className="text-black">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
