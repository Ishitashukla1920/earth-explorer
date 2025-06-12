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

  return (
    <div className="standard-container">
      <div className="min-h-screen bg-white text-black relative overflow-hidden standard-container1">
        {/* Top Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20 pointer-events-none z-5"></div>

        <Navbar />

        <div className={`relative ${isMobile ? 'pt-12' : 'min-h-[calc(100vh-120px)] flex items-center'}`}>
          {/* === DESKTOP VIEW === */}
          {!isMobile && (
            <>
              {/* Background Logo */}
        

              {/* ABOUT US Image */}
             <div className="w-1/3 justify-start items-start pb-4 relative z-10">
               <div className="inline-block w-[120px] sm:w-[160px] md:w-[180px] lg:w-[240px] xl:w-[300px] pl-8" >
                <Image
                src="/aboutus-removebg-preview.png"
                alt="ABOUT US"
                width={360}
                height={230}
                className=""
                style={{ 
                  zIndex: 10,
                  marginTop:'-20%',
                  transform: 'translateY(-25%)',
                 
                 }}
                priority
              />
              </div>
                {!isMobile? (<div className="mt-6 mb-6  justify-start md:justify-start pl-8">
            <SocialLinks />
          </div>) :''}
             </div>

              {/* Text on Right */}
              <div className="w-2/3 fixed top-0 right-0 h-screen flex flex-col justify-center z-10">
                {!textAnimationCompleted && (
                  <Image
                    src="/aboutbg-image.png"
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
                  priority
                />
              </div>
              <div className="mt-6 mb-6  justify-start md:justify-start pl-4">
            <SocialLinks />
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
                  className="mb-1 tracking-wide text-[14px] leading-tight"
                  style={{ fontFamily: "Aboreto, Sans-serif", fontWeight: 'bold',fontSize: '18px' }}
                  variants={textVariants}
                  custom={0}
                >
                  EXPLORING THE EARTH'S SURFACE
                </motion.h2>
                <motion.h3
                  className="mb-3 tracking-wide text-[14px] leading-tight"
                  style={{ fontFamily: "Aboreto, Sans-serif", fontWeight: 'bold',fontSize: '15px' }}
                  variants={textVariants}
                  custom={1}
                >
                  AWAKENING THE SPIRIT WITHIN.
                </motion.h3>
                <motion.p
                  className="text-[12px] leading-relaxed text-[#5f5f5f] px-2 mb-4"
                  style={{ fontFamily: "Raleway, sans-serif", fontWeight: 'bold', fontSize: '15px', color: "#92856C" }}
                  variants={textVariants}
                  custom={2}
                >
                  We travel across sacred lands, tracing energy lines and connecting with the spiritual essence of the Earth.
                </motion.p>
              </motion.div>

              {/* Bottom Image (e.g., Parthenon) */}
              <div className="w-full relative z-10">
                <Image
                  src="/aboutbg-image.png" // Replace with your actual filename
                  alt="Sacred Site"
                  width={350}
                  height={200}
                  className="w-full h-auto rounded-md"
                  priority
                />
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
