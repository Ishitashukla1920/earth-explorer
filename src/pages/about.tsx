import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import SocialLinks from '@/components/SocialLinks';

interface HomePageProps {
  isMobile: boolean;
}

const AboutContent = ({ isMobile }: HomePageProps) => {
  const [textAnimationCompleted, setTextAnimationCompleted] = useState(false);

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.5,
        duration: 1,
        ease: 'easeOut',
      },
    }),
  };
  const [screenSize, setScreenSize] = useState('desktop');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setScreenSize('mobile');
      } else if (width>768 && width < 1024) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const isTablet = screenSize === 'tablet';
  const isDesktop = screenSize === 'desktop';

  return (
    <div className="standard-container">
      <div className="min-h-screen bg-white text-black relative overflow-hidden standard-container1">
        {/* Top Overlay */}
        <div className="absolute inset-0  pointer-events-none z-5"></div>

        <Navbar />

           {/* Background Logo */}
                <div className="relative">
                  {/* DESKTOP: show from lg (≥1024px) up */}
                  {isDesktop && (
                    <div className="absolute top-[12vw] left-[5vw] h-[27vw] w-[29vw] z-20">
                      <Image
                        src="/bg-logo4.png"
                        alt="Background Logo"
                        fill
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                  )}
        
                  {/* TABLET: show for md to lg (768px-1023px) */}
                  {isTablet && (
                    <div className="absolute top-[30vw] left-[8vw] h-[35vw] w-[37vw] z-20">
                      <Image
                        src="/bg-logo4.png"
                        alt="Background Logo"
                        fill
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                  )}
        
                  {/* MOBILE: show below md (<768px) */}
                  {isMobile && (
                    <div className="absolute h-[45vh] w-[100vw] mt-5 bg-logo-responsive-2 z-1">
                      <Image
                        src="/bg-logo5.png"
                        alt="Background Logo"
                        width={800}
                        height={800}
                        className="opacity-100 absolute"
                        style={{  top: '15%', right: '0px', zIndex: 0 , width: '160px', height: 'auto',}}
                      />
                    </div>
                  )}
                </div>

        <div className={`relative ${isMobile ? 'pt-12' : 'min-h-[calc(100vh-120px)] flex items-center'}`}>
          
          {isTablet ? <div className="w-1/3 pb-4 relative ">
               <div className="" >
                <Image
                src="/aboutus-removebg-preview.png"
                alt="ABOUT US"
                width={220}
                height={200}
                className=""
                style={{ 
                  zIndex: 10,
                  marginTop:'-50%',
                  transform: 'translateY(50%)',
                  marginLeft: '20%',
                 
                 }}
                priority
              />
              </div>

              
                <div className="justify-start md:justify-start" 
                style={{
                  marginTop: '40%',
                  marginLeft: '20%',}}>  
            <SocialLinks />
          </div> </div>  :''}
       

          {/* === DESKTOP VIEW === */}
          
          {!isMobile && (
            <>
              {/* Background Logo */}
        

              {/* ABOUT US Image */}
             <div className="w-1/3 pb-4 relative ">
               <div className="" >
                <Image
                src="/aboutus-removebg-preview.png"
                alt="ABOUT US"
                width={320}
                height={230}
                className=""
                style={{ 
                  zIndex: 10,
                  marginTop:'-50%',
                  transform: 'translateY(50%)',
                  marginLeft: '15%',
                 
                 }}
                priority
              />
              </div>

              
               <div className="justify-start md:justify-start" 
                style={{
                  marginTop: '25%',
                  marginLeft: '20%',}}>  
            <SocialLinks />
          </div>
             </div>

              {/* Text on Right */}
              <div className="w-2/3 fixed top-0 right-0 h-screen flex flex-col justify-center z-10">
                {!textAnimationCompleted && (
                  <Image
                    src="/parth.gif"
                    alt="Background Right"
                    fill
                    style={{
                      objectFit: 'contain',
                      objectPosition: 'right center',
                      filter: 'brightness(100%)',
                      zIndex: 0,
                    }}
                  />
                  
                  
                )}
                 <div
        className="
          absolute inset-0
          pointer-events-none
          bg-[linear-gradient(to_right,white_20%,rgba(255,255,255,0)_100%)]
          z-10
        "
      ></div>

                {/* Animated Text */}
                <motion.div
                  className="absolute inset-0 flex flex-col justify-center px-8 z-20"
                  initial="hidden"
                  animate={textAnimationCompleted ? 'hidden' : 'visible'}
                  variants={{
                    hidden: { opacity: 0, transition: { duration: 2 } },
                    visible: { opacity: 1, transition: { duration: 3.5, staggerChildren: 4 } },
                  }}
                >
                  <motion.h2
                    className="text-lg md:text-xl lg:text-2xl mb-2 tracking-wide"
                    style={{ fontFamily: 'Aboreto, Sans-serif' }}
                    variants={textVariants}
                    custom={0}
                  >
                    EXPLORING THE EARTH'S SURFACE
                  </motion.h2>
                  <motion.h3
                    className="text-lg md:text-xl lg:text-2xl mb-6 tracking-wide"
                    style={{ fontFamily: 'Aboreto' }}
                    variants={textVariants}
                    custom={1}
                  >
                    AWAKENING THE SPIRIT WITHIN.
                  </motion.h3>
                  <motion.p
                    className="text-sm md:text-base mb-8 tracking-wide max-w-md text-[#5f5f5f]"
                    style={{ fontFamily: 'Raleway' }}
                    variants={textVariants}
                    custom={2}
                  >
                    We travel across sacred lands, tracing energy lines and connecting with the spiritual essence of the Earth.
                  </motion.p>
                </motion.div>

                {/* White Overlay */}
                <div
                  className="absolute inset-0 flex justify-end items-center z-30 bg-transparent"
                  style={{
                    opacity: textAnimationCompleted ? 1 : 0,
                    transition: 'opacity 0.5s ease-out',
                  }}
                >
                  <div className="absolute inset-0 pointer-events-none h-auto w-full lg:h-screen lg:w-auto">
                    <Image
                      src="/whiteoverlay.png"
                      alt="Overlay Shadow"
                      fill
                      style={{
                        objectFit: 'cover',
                        objectPosition: '20% center',
                        zIndex: 45,
                      }}
                      priority
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* === MOBILE VIEW === */}
          {isMobile && (
            <div className="w-full px-4 flex flex-col  text-center space-y-4 pt-16 relative">
              {/* Background logo light */}
        

              {/* ABOUT US Image */}
              <div className="w-full max-w-[220px] mb-2 z-10">
                <Image
                  src="/aboutus-removebg-preview.png"
                  alt="About Us"
                  width={220}
                  height={130}
                  className="w-full h-auto justify-start items-start"
                  style={{ 
                  zIndex: 10,
                  marginTop:'-10%',
                  transform: 'translateY(10%)',
                  marginLeft: '5%',
                 }}
                  priority
                />
              </div>
              <div className="mt-6 justify-start md:justify-start" 
              style={{
                  marginTop: '10%',
                  marginLeft: '5%',
                  marginBottom: '20%',
                  }}>
            <SocialLinks  />
          </div>

              {/* Text */}
              <motion.div
                className="z-10 w-full"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { duration: 3, staggerChildren: 0.6 } },
                }}
              >
                <motion.h2
                  className="mb-1 tracking-wide text-[23px] leading-tight"
                  style={{ fontFamily: "Aboreto, Sans-serif", fontWeight: 'bold',fontSize: '22px' }}
                  variants={textVariants}
                  custom={0}
                >
                  EXPLORING THE EARTH'S SURFACE
                </motion.h2>
                <motion.h3
                  className="mb-3 tracking-wide text-[23px] leading-tight"
                  style={{ fontFamily: "Aboreto, Sans-serif", fontWeight: 'bold',fontSize: '22px' }}
                  variants={textVariants}
                  custom={1}
                >
                  AWAKENING THE SPIRIT WITHIN.
                </motion.h3>
                <motion.p
                  className=" leading-relaxed  px-4 mb-4"
                  style={{ fontFamily: "Raleway, sans-serif", fontWeight: 'semibold', fontSize: '18px', color: "#92856C" }}
                  variants={textVariants}
                  custom={2}
                >
                  We travel across sacred lands, tracing energy lines and connecting with the spiritual essence of the Earth.
                </motion.p>
              </motion.div>

              {/* Bottom Image (e.g., Parthenon) */}
              <div className="w-full relative z-10">
  <Image
    src="/parth.gif" // Replace with your actual filename
    alt="Sacred Site"
    width={350}
    height={200}
    className="w-full h-auto "
    priority
  />
   <div
        className="
          absolute inset-0
          pointer-events-none
          bg-[linear-gradient(to_bottom,white_9%,rgba(255,255,255,0)_100%)]
          z-10
        "
      ></div>
  
</div>


              {/* Footer */}
            
            </div>
          )}
        </div>


      </div>
    </div>
  );
};

const AboutPage = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return <AboutContent isMobile={isMobile} />;
};

export default AboutPage;
