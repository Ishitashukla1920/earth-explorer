
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import SocialLinks from '../components/SocialLinks';

const Watch = () => {
  const [isMobile, setIsMobile] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className=" standard-container bg-black">
      <div className="min-h-screen relative overflow-hidden standard-container ">
        {/* Background Logo */}
        {/* <div className="absolute h-[25vh] w-[100px] bg-logo-responsive z-1">
          <Image
            src="/bg-logo.png"
            alt="Background Logo"
            width={800}
            height={800}
            className={`object-contain opacity-100 filter -brightness-280 -contrast-100% ${isMobile ? 'alignItems-center justify-center' : ''}`}
          />
        </div> */}

        <Navbar />

        {/* Main Content */}

        {!isMobile ? <main className="flex justify-center items-center py-12 px-4 bg-black ">
  <div className="w-full max-w-[1300px] md:max-w-[1300px] aspect-[16/9]">
    <video
      src="https://firebasestorage.googleapis.com/v0/b/invicta-29211.firebasestorage.app/o/EEX%20Teaser%20Full%20Screen.mp4?alt=media&token=19acba95-544e-4c15-a5d5-904e958f402d"
      controls
      autoPlay
      muted
      loop
      playsInline
      className="w-full h-full object-cover rounded-xl shadow-xl"
    >
      Your browser does not support the video tag.
    </video>
  </div>
</main>

:  <main className="flex flex-col items-center justify-center px-4 pt-16 pb-10 bg-black">
        {/* Heading */}
        <div className="text-center max-w-md mb-6">
          <Image
                      src="/Group 1597883051.png"
                      alt="exclusive Image"
                      width={500}
                      height='300'
                      className="alignItems-center justify-center "/>
          <p className="text-sm text-gray-400 mt-4" style={{ fontFamily: "Raleway, sans-serif", fontSize:18 }}>
            Watch our exclusive trailer and step into a world of hidden energies, ancient mysteries,
            and spiritual discovery.
          </p>
        </div>

        {/* Video Container */}
        <div className="w-full  mb-6">
          <video
            src="https://firebasestorage.googleapis.com/v0/b/invicta-29211.firebasestorage.app/o/EEX%20Teaser%20Full%20Screen.mp4?alt=media&token=19acba95-544e-4c15-a5d5-904e958f402d"
            controls
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover rounded-xl shadow-lg"
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Social Icons */}
        <div className="mt-4">
          <SocialLinks />
        </div>
      </main>
  
  }


       
      </div>
    </div>
  );
};

export default Watch;


