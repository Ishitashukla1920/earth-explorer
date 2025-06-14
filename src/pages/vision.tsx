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
      <div className="relative">
          {/* DESKTOP: show from md (≥768px) up */}
          {!isMobile && (
            <div className="hidden sm:block
               absolute top-[2vw] right-[7vw]
               h-[27vw] w-[29vw]
               z-20">
              <Image
                src="/bg-logo4.png"
                alt="Background Logo"
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
          )}

  {/* MOBILE: show below md */}
  {isMobile && (
    <div className="absolute h-[45vh] w-[160px] mt-5 bg-logo-responsive-2 z-1">
      <Image
            src="/bg-logo5.png"
            alt="Background Logo"
            width={800}
            height={800}
            className="opacity-100  absolute "
            style={{ left:'15rem',top: '15%', right: '0% !important' , zIndex: 0 }}

          />
    </div>
  )}
</div>


        {/* Main Content */}
      {/* Main Content */}
      <main className=" flex flex-col-reverse md:flex-row items-center justify-center py-16 relative">
        {/* Optional Watermark Background */}

        {/* Image Section */}
        <div className="w-full md:w-1/2 z-10 mb-10 md:mb-0 mt-10 ">
          <video
            src="/vision3.mp4"
            width={500}
            height={200}
             autoPlay
              loop
              muted
              className="w-full h-auto max-w-[600px] max-h-[300px] object-cover bg-white mb-7 ${isMobile ? 'mt-20 -mb-10' : ''}"
          />
         {!isMobile ?  <div className="mt-6 flex justify-center md:justify-start">
            <SocialLinks />
          </div> :<div className="mt-10 -mb-10 flex justify-start md:justify-start pl-25">
            <SocialLinks />
          </div> }
         
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
            width={200}
            height='140'
            className="alignItems-start justify-start mt-6 mb-6 pl-6"/>
            
           }
           {isMobile? <div className="mt-9 mb-6 flex justify-start md:justify-start pl-11">
            <SocialLinks />
          </div> :''}

           
          <p  style={isMobile ? { fontFamily: "Aboreto, Sans-serif",  color: "#000",  fontSize: "18px",fontWeight:600 } : {fontFamily: "Aboreto, Sans-serif",  color: "#000",  fontSize: "18px",fontWeight:'bold'} } className={`font-medium mb-2 text-center mt-4 ${isMobile ? "text-base px-6 mt-12" : "text-sm md:text-base px-8"}`}>
           
            IF WE SHARE A BIG DREAM, TOGETHER WE CAN <br className="hidden md:block" />
            MAKE IT A REALITY.
          </p>
          <p   style={isMobile ? { fontFamily: "Raleway, sans-serif",  color: "#92856C",  fontSize: "14px",fontWeight:500 } : {fontFamily: "Aboreto, Sans-serif",  color: "#000", fontSize: "15px",fontWeight:'bold'} } className={`font-light leading-relaxed text-center mt-4 ${isMobile ? "text-sm px-6 -mb-10" : "text-xs md:text-sm px-8"}`}>
            Our dream is to transform the world from   <br className="hidden md:block" />
             seeing life as ordinary,to seeing life as an <br className="hidden md:block" />
              Extraordinary  exploration! 
            
          </p>

          {/* Social Icons */}
          
        </div>
      </main>
        </div>
</div>
  );
};

export default VisionPage;
