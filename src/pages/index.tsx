import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Menu, X } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion'; // Import motion from framer-motion
import { useRouter } from 'next/router';

import Navbar from '@/components/Navbar';
import SocialLinks from '@/components/SocialLinks';

// --- Type Definitions ---
interface TeamMember {
  name: string;
  role: string;
  image: string;
}

interface HomePageProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  isMobile: boolean;
  menuOpen: boolean;
  setMenuOpen: (isOpen: boolean) => void;
  router: any; // Add router prop
}

interface TeamPageProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  teamMembers: TeamMember[];
  isMobile: boolean;
  menuOpen: boolean;
  setMenuOpen: (isOpen: boolean) => void;
}
// --- End Type Definitions ---

const HomePage = ({ currentPage, setCurrentPage, isMobile, menuOpen, setMenuOpen, router }: HomePageProps) => {
  const [textAnimationCompleted, setTextAnimationCompleted] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!isMobile) {
      const timer = setTimeout(() => {
        setTextAnimationCompleted(true);
      }, 3000); // Increased timeout to allow for text animations
      return () => clearTimeout(timer);
    } else {
      // For mobile, also use timer for text animations
      const timer = setTimeout(() => {
        setTextAnimationCompleted(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isMobile]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  // Framer Motion variants for text animation
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.5, // Stagger animation for each line
        duration: 1,
        ease: "easeOut"
      },
    }),
  };

  return (
    <div className="standard-container">
    <div className="min-h-screen bg-black text-white relative overflow-hidden standard-container">
      {/* Top to Bottom Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none z-5"></div>

      {/* Navigation */}
     <Navbar />

      {/* Main Content Area */}
      <div className={`relative ${isMobile ? 'pt-12 ' : 'min-h-[calc(100vh-120px)] flex items-center'}`}>
        {/* ====== DESKTOP SPECIFIC LAYOUT ====== */}
        {!isMobile && (
          <>
            <Image
              src="/bg-logo2.png"
              alt="Background decorative logo"
              width={350}
              height={320}
              className="absolute bg-logo-responsive"
              objectFit='center'
              style={{
                alignItems:'center',
                zIndex: 5,
                filter: 'grayscale(100%) brightness(200%)',
              }}
              priority
            />
            <Image
              src="/eex.png"
              alt="Descriptive image for main content"
              width={320}
              height={230}
              className="absolute eex-responsive"
              style={{ zIndex: 1 }}
              priority
            />
        

            <div className="w-2/3 fixed top-0 right-0 h-screen flex flex-col justify-center z-10">
              {/* Desktop: bg-image removed ONLY after text animation completes */}
              {!textAnimationCompleted && (
                <>
                  <Image
                    src="/bg-image.png"
                    alt="Background for right side"
                    fill
                    style={{
                      objectFit: 'contain',
                      objectPosition: 'right center',
                      filter: 'brightness(100%)',
                      zIndex:0
                    }}
                  />
                </>
              )}

              {/* Desktop: Text content - fade out when animation completes */}
              <motion.div
                className="absolute inset-0 flex flex-col justify-center px-8 z-20"
                initial="hidden"
                animate={textAnimationCompleted ? "hidden" : "visible"}
                variants={{
                  hidden: { opacity: 0, transition: { duration: 2 } },
                  visible: { opacity: 1, transition: { duration: 3.5, staggerChildren: 4 } }
                }}
              >
                <motion.h2
                  className="text-lg md:text-xl lg:text-2xl mb-2 tracking-wide"
                  style={{ fontFamily: "Aboreto, Sans-serif" }}
                  variants={textVariants}
                  custom={0}
                >
                  AN ANCIENT SECRET SO POWERFUL...
                </motion.h2>

                <motion.h3
                  className="text-lg md:text-xl lg:text-2xl mb-6 tracking-wide"
                  style={{ fontFamily: 'Aboreto' }}
                  variants={textVariants}
                  custom={1}
                >
                  IT GAVE RISE TO MODERN CIVILIZATION.
                </motion.h3>

                <motion.p
                  className="text-sm md:text-base mb-8 tracking-wide max-w-md text-[#E9D6A9]"
                  style={{ fontFamily: 'Raleway' }}
                  variants={textVariants}
                  custom={2}
                >
                  Join us as we rediscover the mystery of earth energy.
                </motion.p>
              </motion.div>

              {/* Desktop: video fades in when text animation completes */}
              <div
                className="absolute inset-0 flex justify-end items-center z-30 bg-transparent"
                style={{
                  opacity: textAnimationCompleted ? 1 : 0,
                  transition: 'opacity 0.5s ease-out'
                }}
              >
                <video
                  ref={videoRef}
                  src="https://firebasestorage.googleapis.com/v0/b/invictaa-f3ba8.appspot.com/o/EEX%20Teaser%20With%20end%20logo%20text%20Desktop.mp4?alt=media&token=27a65aae-161d-4d92-b4b7-47e702797b0a"
                  autoPlay
                  muted={isMuted}
                  loop
                  playsInline
                  className="w-[75%] tab-height object-cover rounded shadow-lg"
                />
                
                {/* Transparent image on top of the video */}
                {textAnimationCompleted && (
                  <div className="absolute inset-0 pointer-events-none h-auto w-full lg:h-screen lg:w-auto">
                    <Image
                      src="/transparent.png"
                      alt="Video Overlay"
                      fill
                      style={{
                        objectFit: 'cover',
                        objectPosition: '20% center',
                        zIndex: 45,
                      }}
                      priority
                    />
                  </div>
                )}

                <button
                  onClick={toggleMute}
                  className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-black/50 border border-white/30 flex items-center justify-center hover:bg-black/70 transition-colors cursor-pointer z-40"
                >
                  {isMuted
                    ? <VolumeX className="w-5 h-5 text-white" />
                    : <Volume2 className="w-5 h-5 text-white" />}
                </button>
              </div>
            </div>
          </>
        )}

        {/* ====== MOBILE SPECIFIC LAYOUT ====== */}
        {isMobile && (
          <div className="w-full flex flex-col items-center text-center space-y-6 z-10 relative mt-2">
            {/* Mobile: bg-logo.png positioned on the right side, half visible */}
            <Image
              src="/bg-logo2.png"
              alt="Background decorative logo"
              width={200}
              height={180}
              className="absolute top-0 bg-logo-mobile"
              style={{
                zIndex: 1,
                filter: 'grayscale(100%) brightness(150%) opacity(0.7)',
              }}
              priority
            />

            {/* Mobile: the eex.png image - reduced size and shifted left */}
            <div className="relative w-full max-w-[250px] sm:max-w-[270px] mb-[3px] z-10 self-start mt-3">
              <Image
                src="/eex.png"
                alt="Descriptive image for main content"
                width={270}
                height={174}
                className="w-full h-auto rounded shadow-lg"
                style={{
                  transform: 'translateX(0%)', // Shift left
                }}
                priority
              />
            </div>
            
            {/* Mobile: text content with framer motion animations */}
            <motion.div 
              className="relative z-10 "
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: {duration:3, staggerChildren: 1 } }
              }}
            >
              <motion.h2 
                className="mb-2 tracking-wide"
                style={{fontSize:'15px', fontFamily: 'Aboreto' }}
                variants={textVariants}
                custom={0}
              >
                AN ANCIENT SECRET SO POWERFUL...
              </motion.h2>
              <motion.h3 
                className="mb-4 tracking-wide"
                style={{ fontSize:'15px', fontFamily: 'Aboreto' }}
                variants={textVariants}
                custom={1}
              >
                IT GAVE RISE TO MODERN CIVILIZATION.
              </motion.h3>
             
              <motion.p
                className="text-[12px] mb-[1px] tracking-wide text-[#E9D6A9]"
                style={{ fontFamily: 'Raleway' }}
                variants={textVariants}
                custom={2}
              >
                Join us as we rediscover the mystery of earth energy.
              </motion.p>
            </motion.div>

            {/* Mobile: video appears below the building image */}
            <div className="relative w-full max-w-[550px] md:max-w-[450px] sm:max-w-[100vw]  z-10">
              <video
                ref={videoRef}
                src="https://firebasestorage.googleapis.com/v0/b/invicta-29211.firebasestorage.app/o/Final%20EEX%20Teaser%20vertical%20increase%20With%20end%20logo%20text.mp4?alt=media&token=4dab2742-f1c8-40f5-a93e-effc60766da1"
                autoPlay
                muted={isMuted}
                loop
                playsInline
                webkit-playsinline="true"
                className="w-full h-full object-cover rounded shadow-lg"
              />
              <button
                onClick={toggleMute}
                className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-black/50 border border-white/30 flex items-center justify-center hover:bg-black/70 transition-colors cursor-pointer z-40"
              >
                {isMuted ? <VolumeX className="w-5 h-5 text-white" /> : <Volume2 className="w-5 h-5 text-white" />}
              </button>
              {/* Overlay on video */}
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-black/100 to-transparent z-10"></div>
            </div>
          </div>
        )}
      </div>
      
      { isMobile ? ( <div className="relative flex space-x-4 justify-center pt-4 pb-4 z-10">
        {/* Custom Social Media Icons */}
       <SocialLinks />
      </div>):''}
     
    </div>
   </div>
  );
};



const EarthEnergyXplorers = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return currentPage === 'home' ? (
    <HomePage
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      isMobile={isMobile}
      menuOpen={menuOpen}
      setMenuOpen={setMenuOpen}
      router={router}
    />
  ) : (
    <></>
  );
};

export default EarthEnergyXplorers;