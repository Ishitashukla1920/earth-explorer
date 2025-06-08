import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Menu, X } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion'; // Import motion from framer-motion


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

const HomePage = ({ currentPage, setCurrentPage, isMobile, menuOpen, setMenuOpen }: HomePageProps) => {
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
    <div className="min-h-screen bg-black text-white relative overflow-hidden standard-container" >
      {/* Top to Bottom Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none z-5"></div>

      {/* Navigation */}
      <nav className={`relative ${isMobile ? 'z-30' : 'z-20'} flex items-center ${isMobile ? 'justify-between' : 'justify-start'} p-4 md:p-8`} style={{ fontFamily: 'Radley' }}>
        <div className="flex items-center space-x-3 sm:space-x-4 md:space-x-8">
          <div>
            <Image
              src="/logoEEx.png"
              alt="Logo"
              width={isMobile ? 50 : 58}
              height={isMobile ? 67 : 76}
              className="rounded-full"
              priority
            />
          </div>
         
          {/* Desktop Navigation Links */}
          {!isMobile && (
            <>
              <button
                onClick={() => setCurrentPage('home')}
                className={`text-sm sm:text-base md:text-lg cursor-pointer ${
                  currentPage === 'home' ? 'border-b-2 border-white pb-1 text-amber-100' : ''
                }`}
                style={{ fontFamily: 'Radley' }}
              >
                Home
              </button>
              <button
                onClick={() => setCurrentPage('team')}
                className={`text-sm sm:text-base md:text-lg cursor-pointer hover-amber-100${
                  currentPage === 'team' ? 'border-b-2 border-white pb-1 text-amber-100' : ''
                }`}
                style={{ fontFamily: 'Radley' }}
              >
                Team
              </button>
            </>
          )}
        </div>
        {/* Hamburger Menu Button for Mobile */}
        {isMobile && (
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-amber-100 focus:outline-none z-50">
            {menuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        )}

        {/* Mobile Menu Dialog - HomePage */}
        {isMobile && menuOpen && (
          <div className="absolute top-full right-4 mt-2 w-40 bg-black/90 rounded-md shadow-lg p-4 flex flex-col items-end z-40">
            <button
              onClick={() => { setCurrentPage('home'); setMenuOpen(false); }}
              className={`text-lg py-2 ${currentPage === 'home' ? 'text-amber-100' : 'text-white'} hover:text-amber-100 transition-colors w-full text-right`}
            >
              Home
            </button>
            <button
              onClick={() => { setCurrentPage('team'); setMenuOpen(false); }}
              className={`text-lg py-2 ${currentPage === 'team' ? 'text-amber-100' : 'text-white'} hover:text-amber-100 transition-colors w-full text-right`}
            >
              Team
            </button>
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      <div className={`relative ${isMobile ? 'pt-4 ' : 'min-h-[calc(100vh-120px)] flex items-center'}`}>
        {/* ====== DESKTOP SPECIFIC LAYOUT ====== */}
        {!isMobile && (
          <>
            <Image
              src="/bg-logo.png"
              alt="Background decorative logo"
              width={350}
              height={320}
                className="absolute bg-logo-responsive" // Add a new class

              style={{
                zIndex: 5,
                filter: 'grayscale(100%) brightness(200%)',
              }}
              priority
            />
            <Image
              src="/eex.png"
              alt="Descriptive image for main content"
              width={450}  // Maximum size needed
              height={288} // Maintain aspect ratio (450 * 230/360)
              className="absolute eex-responsive"
              style={{
                zIndex: 1,
                transform: `scale(${isMobile ? '0.9' : '1'})`, // Slight scale down on mobile
              }}
              priority
            />
            <div className="w-2/3 fixed  top-0 right-0 h-screen flex flex-col justify-center z-10">
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
                    //priority
                  />
               {/* <div className="absolute inset-5 bg-gradient-to-l from-black/40 to-transparent"></div>*/}
                </>
              )}

              {/* Desktop: Text content - fade out when animation completes */}
              <motion.div
                className="absolute inset-0 flex flex-col justify-center align-items-center px-6 z-20"
                initial="hidden"
                animate={textAnimationCompleted ? "hidden" : "visible"} // Animate out when completed
                variants={{
                  hidden: { opacity: 0, transition: { duration: 0.5 } },
                  visible: { opacity: 1, transition: { staggerChildren: 0.5 } } // Stagger children for sequential reveal
                }}
              >
                <motion.h2
                  className="text-[21px] mb-2 tracking-wide"
                  style={{ fontFamily: "Aboreto, Sans-serif" }}
                  variants={textVariants}
                  custom={0}
                >
                  AN ANCIENT SECRET SO POWERFUL...
                </motion.h2>
                <motion.h3
                  className="text-[21px] mb-2.5 tracking-wide -ml-3"
                  style={{ fontFamily: 'Aboreto' }}
                  variants={textVariants}
                  custom={1}
                >
                  IT GAVE RISE TO MODERN CIVILIZATION.
                </motion.h3>
                   <motion.p
  className="text-[18px] mb-[14px] tracking-wide text-[#E9D6A9]"
  style={{ fontFamily: 'Raleway' }}
  variants={textVariants}
  custom={2}
>
  Join us as we rediscover the mystery of earth energy.
</motion.p>

                <div className="flex space-x-6">
                  {/* Custom Social Media Icons - Desktop */}
                  <div className=" flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                    <Image src="/facebook.png" alt="Facebook" width={20} height={20} />
                  </div>
                  <div className="flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                    <Image src="/instagram.png" alt="Instagram" width={20} height={20} />
                  </div>
                  <div className=" flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                    <Image src="/youtube.png" alt="YouTube" width={20} height={20} />
                  </div>
                  <div className="flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                    <Image src="/x.png" alt="Twitter" width={20} height={20} />
                  </div>
                </div>
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
      fill                            // ← this lets Next fill the parent
      style={{
        objectFit: 'cover',
        objectPosition: '20% center',
        zIndex: 45,                  // above video, below controls
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
                {/*<div className="absolute inset-x-50 h-[100vh] bg-gradient-to-r from-black to-transparent pointer-events-none rounded"></div>*/}

              </div>
            </div>
          </>
        )}

        {/* ====== MOBILE SPECIFIC LAYOUT ====== */}
        {isMobile && (
          <div className="w-full flex flex-col items-center text-center space-y-6 z-10 relative">
            {/* Mobile: bg-logo.png positioned on the right side, half visible */}
            <Image
              src="/bg-logo.png"
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
            <div className="relative w-full max-w-[250px] sm:max-w-[270px]  z-10 self-start">
              <Image
                src="/eex.png"
                alt="Descriptive image for main content"
                width={270}
                height={174}
                className="w-full h-auto rounded shadow-lg"
                style={{
                  transform: 'translateX(5%)', // Shift left

                }}
                priority
              />
            </div>
            
            {/* Mobile: text content with framer motion animations */}
            <motion.div 
              className="relative z-10"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.5 } }
              }}
            >
              <motion.h2 
                className=" mb-2 tracking-wide"
                style={{fontSize:'15px', fontFamily: 'Aboreto' }}
                variants={textVariants}
                custom={0}
              >
                AN ANCIENT SECRET SO POWERFUL...
              </motion.h2>
              <motion.h3 
                className=" mb-4 tracking-wide"
                style={{ fontSize:'15px', fontFamily: 'Aboreto' }}
                variants={textVariants}
                custom={1}
              >
                IT GAVE RISE TO MODERN CIVILIZATION.
              </motion.h3>
             
             <motion.p
  className="text-[15px] mb-[14px] tracking-wide text-[#E9D6A9]"
  style={{ fontFamily: 'Raleway' }}
  variants={textVariants}
  custom={2}
>
  Join us as we rediscover the mystery of earth energy.
</motion.p>

            </motion.div>
             <div className="relative flex space-x-4 justify-center pt-2 z-10">
              {/* Custom Social Media Icons - Mobile */}
              <div className=" flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                <Image src="/facebook.png" alt="facebook" width={16} height={16} />
              </div>
              <div className=" flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                <Image src="/instagram.png" alt="instagram" width={16} height={16} />
              </div>
              <div className="flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                <Image src="/youtube.png" alt="youTube" width={16} height={16} />
              </div>
              <div className=" flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                <Image src="/x.png" alt="Twitter" width={16} height={16} />
              </div>
            </div>

            {/* Mobile: The building image (bg-image.png) as a content image */}
            

            {/* Mobile: video appears below the building image */}
            <div className="relative w-full max-w-[550px] sm:max-w-[320px] mt-6 z-10">
              <video
                ref={videoRef}
                src="https://firebasestorage.googleapis.com/v0/b/invictaa-f3ba8.appspot.com/o/EEX%20Teaser%20With%20end%20logo%20text%20Desktop.mp4?alt=media&token=27a65aae-161d-4d92-b4b7-47e702797b0a"
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

            {/* Mobile: social icons */}
           
          </div>
        )}
      </div>
    </div>
  );
};

const TeamPage = ({
  currentPage,
  setCurrentPage,
  teamMembers,
  isMobile,
  menuOpen,
  setMenuOpen,
}: TeamPageProps) => {

  return (
    <div className={`min-h-screen bg-black text-white relative ${isMobile ? 'overflow-auto' : 'overflow-hidden'}`} style={{ fontFamily: 'Radley' }}>
      {/* Top to Bottom Overlay for Team Page */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40 pointer-events-none z-5"></div>

      {/* Background image for Team Page */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
            backgroundImage: 'url("/ourTeamBg.png")',
            filter: 'brightness(250%)',
            zIndex: 0
        }}
      />
      {/* Semi-transparent black overlay */}
      <div className="absolute inset-0 bg-black/50" style={{ zIndex: 0 }} />
      <nav
        className={`relative z-50 flex items-center ${isMobile ? 'justify-between' : 'justify-start'} p-4 md:p-8`}
        style={isMobile ? { width: '100%', height: '50px', position: 'absolute', top: 0, left: 0 } : {}}
      >
        <div className="flex items-center space-x-3 sm:space-x-4 md:space-x-8">
          {/* Logo */}
          <div style={isMobile ? { position: 'absolute', left: '10px', top: '9px' } : {}}>
            <Image
              src="/logoEEx.png"
              alt="Logo"
              width={isMobile ? 40 : 58}
              height={isMobile ? 40.6 : 76}
              className="rounded-full"
            />
          </div>
          {/* Desktop Navigation Links */}
          {!isMobile && (
            <>
              <button
                onClick={() => setCurrentPage('home')}
                className={`text-sm sm:text-base md:text-lg font-light cursor-pointer ${
                  currentPage === 'home' ? 'border-b-2 border-white pb-1 text-amber-100' : ''
                }`}
              >
                Home
              </button>
              <button
                onClick={() => setCurrentPage('team')}
                className={`text-sm sm:text-base md:text-lg font-light cursor-pointer ${
                  currentPage === 'team' ? 'border-b-2 border-white pb-1 text-amber-100' : ''
                }`}
              >
                Team
              </button>
            </>
          )}
        </div>
        {/* Hamburger Menu Button for Mobile */}
        {isMobile && (
          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="text-amber-100 focus:outline-none z-50" 
            style={{ 
              position: 'absolute', 
              right: '10px', 
              top: '9px',
              backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add semi-transparent background
              borderRadius: '4px',
              padding: '4px'
            }}
          >
            {menuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        )}

        {/* Mobile Menu Dialog - TeamPage */}
        {isMobile && menuOpen && (
          <div className="absolute top-full right-4 mt-2 w-40 bg-black/90 rounded-md shadow-lg p-4 flex flex-col items-end z-50">
            <button
              onClick={() => { setCurrentPage('home'); setMenuOpen(false); }}
              className={`text-lg py-2 ${currentPage === 'home' ? 'text-amber-100' : 'text-white'} hover:text-amber-100 transition-colors w-full text-right`}
            >
              Home
            </button>
            <button
              onClick={() => { setCurrentPage('team'); setMenuOpen(false); }}
              className={`text-lg py-2 ${currentPage === 'team' ? 'text-amber-100' : 'text-white'} hover:text-amber-100 transition-colors w-full text-right`}
            >
              Team
            </button>
          </div>
        )}
      </nav>

      <div className="relative z-10 px-2 md:px-8 pb-8">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/3 md:pr-8 flex flex-col items-center md:items-start mb-8 md:mb-0">
            <div className="mb-12 md:mb-16 pt-0 md:pt-18 text-center md:text-left" style={isMobile ? { position: 'absolute', left: '10px', top: '85px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' } : {}}>
              {/* "OUR" text image with mobile spacing adjustment */}
              <div className="inline-block max-w-[100px] md:max-w-[200px]" style={{ marginBottom: isMobile ? '7px' : '0' }}>
                <img
                  src="/our.png"
                  alt="OUR text image"
                 // width={200}
                 // height={106}
                  className="w-full h-auto" // Using Tailwind for responsive image
                />
              </div>
              {/* "TEAM" text image with mobile spacing adjustment */}
              <div className="inline-block max-w-[150px] md:max-w-[280px] mt-2">
                <img
                  src="/team.png"
                  alt="TEAM text image"
                  //width={280}
                  //height={140}
                  className="w-full h-auto" // Using Tailwind for responsive image
                />
              </div>
            </div>
            {/* Social Media Icons - Team Page */}
            <div className="flex space-x-4 md:space-x-6 justify-center md:justify-start" style={isMobile ? { position: 'absolute', left: '20px', top: '224px' } : {}}>
              <div className=" flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                <img src="/facebook.png" alt="Facebook" width={13.38} height={13.04} />
              </div>
              <div className="flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                <img src="/instagram.png" alt="Instagram" width={13.38} height={13.04} />
              </div>
              <div className=" flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                <img src="/youtube.png" alt="YouTube" width={13.38} height={13.04} />
              </div>
              <div className=" flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                <img src="/x.png" alt="Twitter" width={13.38} height={13.04} />
              </div>
            </div>
          </div>
          {/* Team Members Grid */}
         <div
  className="w-full md:w-2/3 md:pl-8"
  style={
    isMobile
      ? {
          marginTop: '250px', // Use margin instead of absolute positioning
          width: '100%',
          paddingBottom: '50px' // Add padding at bottom for mobile
        }
      : {}
  }
>
  <div className={`grid gap-x-2 gap-y-8 justify-items-center px-2 ${isMobile ? 'grid-cols-2' : 'grid-cols-3'}`}>
    {teamMembers.map((member: TeamMember, index: number) => (
      <div
        key={index}
        className="text-center"
        style={isMobile ? { width: '120px' } : {}}
      >
        <div className="mb-3 md:mb-5">
          <div
            className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto rounded-full overflow-hidden"
            style={isMobile ? { width: '80px', height: '80px' } : {}}
          >
            <img
              src={member.image}
              alt={member.name}
              width={isMobile ? 80 : 128}
              height={isMobile ? 80 : 128}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <h3 
          className="font-light tracking-wider mb-1 sm:mb-2"
          style={{ 
            fontFamily: 'Aboreto',
            fontSize: isMobile ? '14.32px' : '28.99px'
          }}
        >
          {member.name}
        </h3>
        <p 
          className="text-amber-200 font-light tracking-wide"
          style={{ 
            fontFamily: 'Raleway',
            fontSize: isMobile ? '12px' : '19.33px'
          }}
        >
          {member.role}
        </p>
      </div>
    ))}
  </div>
</div>

        </div>
      </div>
    </div>
  );
};

const EarthEnergyXplorers = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const teamMembers: TeamMember[] = [
    { name: 'MICHAEL', role: 'Narrative & Creative Direction', image: '/profile6.png' },
    { name: 'SANJAY', role: 'Concept & Visual Development', image: '/profile5.png' },
    { name: 'ABHISHEK', role: 'Cinematography & Story Design', image: '/profile4.png' },
    { name: 'CHARU', role: 'Photography & Tech Innovation', image: '/profile3.png' },
    { name: 'NISHA', role: 'Cinematography & Story Design', image: '/profile2.png' },
    { name: 'ARYAN', role: 'Research & Field Logistics', image: '/profile1.png' },
  ];

  return currentPage === 'home' ? (
    <HomePage
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      isMobile={isMobile}
      menuOpen={menuOpen}
      setMenuOpen={setMenuOpen}
    />
  ) : (
    <TeamPage
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      teamMembers={teamMembers}
      isMobile={isMobile}
      menuOpen={menuOpen}
      setMenuOpen={setMenuOpen}
    />
  );
};

export default EarthEnergyXplorers;