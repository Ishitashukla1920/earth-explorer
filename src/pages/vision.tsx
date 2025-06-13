// pages/vision.tsx
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import SocialLinks from '../components/SocialLinks';

const VisionPage = () => {
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
   <div className="standard-container  bg-white">
  <div className="min-h-screen relative overflow-hidden  standard-container">
    <Navbar />

        {/* Background Logo */}
        <div className="absolute h-[25vh] w-[100px] bg-logo-responsive z-1 ">
         {!isMobile ? ( ''

  
          ):( <Image
            src="/aboutus-logo-bg.png"
            alt="Background Logo"
            width={800}
            height={800}
            className="opacity-100  absolute "
            style={{ top: '0%', right: '0% !important' , zIndex: 0 }}

          />)}
        </div>

        {/* Main Content */}
      {/* Main Content */}
      <main className=" flex flex-col-reverse md:flex-row items-center justify-center py-16 relative">
        {/* Optional Watermark Background */}

        {/* Image Section */}
        <div className="w-full md:w-1/2 z-10 mb-10 md:mb-0 mt-10 ">
          <Image
            src="/visionpage.png"
            alt="Vision Image"
            width={600}
            height={300}
            className=""
          />
         {!isMobile ?  <div className="mt-6 flex justify-center md:justify-start">
            <SocialLinks />
          </div> :''}
          
        </div>

        {/* Text Content */}
        <div className="w-full md:w-1/2 z-10 text-center md:text-left max-w-xl md:px-2 ">
           {!isMobile ? <Image
            src="/ourVision Laptop.png"
            alt="Vision Image"
            width={305.5}
            height='150'
            className="alignItems-center justify-center px-2 mx-auto mb-4 md:mb-6"
          /> : <Image
            src="/ourVision Mobile.png"
            alt="Vision Image"
            width={220}
            height='120'
            className="alignItems-start justify-start mt-6 pl-6"/>
            
           }
           {isMobile? <div className="mt-6 mb-6 flex justify-start md:justify-start pl-8">
            <SocialLinks />
          </div> :''}

           
          <p  style={isMobile ? { fontFamily: "Aboreto, Sans-serif",  color: "#000",  fontSize: "18px",fontWeight:600 } : {fontFamily: "Aboreto, Sans-serif",  color: "#000",  fontSize: "21px",fontWeight:'bold'} } className={`text-sm md:text-base font-medium mb-4 text-center mt-4 px-4`}>
           
            IF WE SHARE A BIG DREAM, TOGETHER WE CAN <br className="hidden md:block" />
            MAKE IT A REALITY.
          </p>
          <p   style={isMobile ? { fontFamily: "Raleway, sans-serif",  color: "#92856C",  fontSize: "16px",fontWeight:700 } : {fontFamily: "Aboreto, Sans-serif",  color: "#000", fontSize: "20px",fontWeight:'bold'} } className={`text-xs md:text-sm font-light leading-relaxed text-center mt-8 px-4`}>
            Our dream is to transform the world from   <br className="hidden md:block" />
            seeing life as ordinary, to seeing life as an <br className="hidden md:block" />
            Extraordinary exploration!
          </p>

          {/* Social Icons */}
          
        </div>
      </main>
        </div>
</div>
  );
};

export default VisionPage;
