
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import SocialLinks from '../components/SocialLinks';

const Press = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="standard-container">
      <div className="min-h-screen bg-white relative overflow-hidden standard-container">
        {/* Background Logo */}
        <div className="absolute h-[25vh] w-[100px] bg-logo-responsive z-1">
          <Image
            src="/bg-logo.png"
            alt="Background Logo"
            width={800}
            height={800}
            className="object-contain opacity-100 filter -brightness-280 -contrast-100%"
          />
        </div>

        <Navbar />

        {/* Main Content */}
        <div className="text-center justify-center item-center  min-h-screen">
          <h1 className="text-gray-600">Work in Progress</h1>
        </div>
       
      </div>
    </div>
  );
};

export default Press;


