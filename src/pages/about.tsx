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
      <div className="min-h-screen bg-black text-white relative overflow-hidden standard-container1">
        {/* Top Overlay */}
        <div className="absolute inset-0  pointer-events-none z-5"></div>

        <Navbar />

           {/* Background Logo */}
        

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
        
<Image
      src="/bg-logo2.png"
      alt="Background decorative logo"
      width={350}
      height={320}
      className="centered-bg-logo"
      objectFit="center"
      style={{
        alignItems: "center",
        zIndex: 5,
        filter: "grayscale(100%) brightness(200%)",
      }}
      priority
    />
              {/* ABOUT US Image */}
             <div className="w-full -mt-[10%] pb-4 relative ">
               <div className="" >
                <Image
                src="/aboutus-removebg-preview.png"
                alt="ABOUT US"
                width={300}
                height={220}
                className="centered-ourVision"
                // style={{ 
                //   zIndex: 10,
                //   marginTop:'-29%',
                //   transform: 'translateY(10%)',
                //   marginLeft: '15%',
                 
                //  }}
                priority
              />
            
              </div>

              
               
             </div>

              {/* Text on Right */}
              <div className="w-2/3 fixed top-0 right-0 h-screen flex flex-col justify-center z-10">
                {!textAnimationCompleted && (
                  <Image
                    src="/aboutusBg1.png"
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
                 {/* <div
        className="
          absolute inset-0 left-[19%]
          pointer-events-none
          bg-[linear-gradient(to_right,black_20%,rgba(255,255,255,0)_100%)]
          z-10
        "
      ></div> */}

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
                    style={{ fontFamily: 'Raleway',color: "#92856C" }}
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
                  {/* <div className="absolute inset-0 pointer-events-none h-auto w-full lg:h-screen lg:w-auto">
                    <Image
                      src="/transparent.png"
                      alt="Overlay Shadow"
                      fill
                      style={{
                        objectFit: 'cover',
                        objectPosition: '20% center',
                        zIndex: 45,
                      }}
                      priority
                    />
                  </div> */}
                </div>
              </div>
            </>
          )}

          {/* === MOBILE VIEW === */}
          {isMobile && (
            <div className="w-full px-4 flex flex-col  text-center space-y-4 pt-16 relative">
              {/* Background logo light */}
             <Image
                             src="/bg-logo2.png"
                             alt="Background decorative logo"
                             width={200}
                             height={180}
                             className="absolute top-0 bg-logo-mobile"
                             style={{
                               zIndex: 1,
                               filter: "grayscale(100%) brightness(150%) opacity(0.7)",
                             }}
                             priority
                           />

              {/* ABOUT US Image */}
              <div className="w-full max-w-[200px] mb-5 z-10">
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
                className="z-10 w-full -mt-7"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { duration: 3, staggerChildren: 0.6 } },
                }}
              >
                <motion.h2
                  className="mb-1 tracking-wide text-[23px] leading-tight"
                  style={{ fontFamily: "Aboreto, Sans-serif",fontSize: '18px' }}
                  variants={textVariants}
                  custom={0}
                >
                  EXPLORING THE EARTH'S SURFACE
                </motion.h2>
                <motion.h3
                  className="mb-3 tracking-wide text-[23px] leading-tight"
                  style={{ fontFamily: "Aboreto, Sans-serif",fontSize: '18px' }}
                  variants={textVariants}
                  custom={1}
                >
                  AWAKENING THE SPIRIT WITHIN.
                </motion.h3>
                <motion.p
                  className=" leading-relaxed  px-4 mb-4"
                  style={{ fontFamily: "Raleway, sans-serif", fontWeight: 'semibold', fontSize: '15px', color: "#92856C" }}
                  variants={textVariants}
                  custom={2}
                >
                  We travel across sacred lands, tracing energy lines and connecting with the spiritual essence of the Earth.
                </motion.p>
              </motion.div>

              {/* Bottom Image (e.g., Parthenon) */}
              <div className="w-full relative z-10">
  <Image
    src="/aboutusBg.png" // Replace with your actual filename
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
          bg-[linear-gradient(to_bottom,black_9%,rgba(255,255,255,0)_100%)]
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
