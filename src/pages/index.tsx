import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Menu, X } from 'lucide-react';
// import Image from 'next/image'; // Removed next/image as it causes compilation issues in this environment
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
  const [isMuted, setIsMuted] = useState(false); // Video is unmuted by default
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Logic to manage text animation on desktop and skip on mobile
    if (!isMobile) {
      const timer = setTimeout(() => {
        setTextAnimationCompleted(true);
      }, 3000); // Increased timeout to allow for text animations
      return () => clearTimeout(timer);
    } else {
      setTextAnimationCompleted(true);
    }
  }, [isMobile]);

  // Toggles the mute state of the video
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  // Framer Motion variants for text animation, providing a staggered reveal effect
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
    <div className="min-h-screen bg-black text-white relative overflow-hidden" style={{ fontFamily: 'Radley' }}>
      {/* Overlay for visual effect from top to bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none z-5"></div>

      {/* Navigation Bar */}
      <nav className={`relative ${isMobile ? 'z-30' : 'z-20'} flex items-center ${isMobile ? 'justify-between' : 'justify-start'} p-4 md:p-8`} style={{ fontFamily: 'Radley' }}>
        <div className="flex items-center space-x-3 sm:space-x-4 md:space-x-8">
          {/* Logo */}
          <div className="md:ml-8 lg:ml-16"> {/* Adjust left margin for larger screens */}
            <img
              src="/logoEEx.png"
              alt="Logo"
              width={isMobile ? 50 : 64}
              height={isMobile ? 67 : 85}
              className="rounded-full"
            />
          </div>
          {/* Desktop Navigation Links */}
          {!isMobile && (
            <div className="flex space-x-6 lg:space-x-10"> {/* Adjust spacing for links */}
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
                className={`text-sm sm:text-base md:text-lg cursor-pointer hover:text-amber-100 transition-colors ${
                  currentPage === 'team' ? 'border-b-2 border-white pb-1 text-amber-100' : ''
                }`}
                style={{ fontFamily: 'Radley' }}
              >
                Team
              </button>
            </div>
          )}
        </div>
        {/* Hamburger Menu Button for Mobile */}
        {isMobile && (
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-amber-100 focus:outline-none z-50">
            {menuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        )}

        {/* Mobile Menu Dialog */}
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
      <div className={`relative ${isMobile ? 'pt-4 pb-12 px-4' : 'min-h-[calc(100vh-120px)] flex items-center'}`}>
        {/* ====== DESKTOP SPECIFIC LAYOUT ====== */}
        {!isMobile && (
          <>
            {/* Background decorative logo */}
            <img
              src="/bg-logo.png"
              alt="Background decorative logo"
              width={350}
              height={320}
              className="absolute"
              style={{
                left: '300px',
                top: '79px',
                zIndex: 1,
                filter: 'grayscale(100%) brightness(200%)',
              }}
            />
            {/* Main EEX image */}
            <img
              src="/eex.png"
              alt="Descriptive image for main content"
              width={360}
              height={230}
              className="absolute"
              style={{ left: '70px', top: '50px', zIndex: 1 }}
            />
            {/* Right-aligned content container */}
            <div className="w-2/3 fixed top-0 right-0 h-screen flex flex-col justify-center z-10">
              {/* Background image for right side, removed after text animation */}
              {!textAnimationCompleted && (
                <>
                  <img
                    src="/bg-image.png"
                    alt="Background for right side"
                    className="absolute inset-0 w-full h-full"
                    style={{
                      objectFit: 'contain',
                      objectPosition: 'right center',
                      filter: 'brightness(100%)',
                    }}
                  />
                </>
              )}

              {/* Text content with Framer Motion animations */}
              <motion.div
                className="absolute inset-0 flex flex-col justify-center px-8 z-20"
                initial="hidden"
                animate={textAnimationCompleted ? "hidden" : "visible"} // Animate out when completed
                variants={{
                  hidden: { opacity: 0, transition: { duration: 0.5 } },
                  visible: { opacity: 1, transition: { staggerChildren: 0.5 } } // Stagger children for sequential reveal
                }}
              >
                <motion.h2
                  className="text-xl mb-2 tracking-wide"
                  variants={textVariants}
                  custom={0}
                >
                  AN ANCIENT SECRET SO POWERFUL...
                </motion.h2>
                <motion.h3
                  className="text-lg mb-4 tracking-wide"
                  variants={textVariants}
                  custom={1}
                >
                  IT GAVE RISE TO MODERN CIVILIZATION.
                </motion.h3>
                <motion.p
                  className="text-base mb-6 tracking-wide text-amber-100"
                  variants={textVariants}
                  custom={2}
                >
                  Join us as we rediscover the mystery of earth energy.
                </motion.p>
                <div className="flex space-x-6">
                  {/* Custom Social Media Icons - Desktop */}
                  <div className=" flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                    <img src="/facebook.png" alt="Facebook" width={20} height={20} />
                  </div>
                  <div className="flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                    <img src="/instagram.png" alt="Instagram" width={20} height={20} />
                  </div>
                  <div className=" flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                    <img src="/youtube.png" alt="YouTube" width={20} height={20} />
                  </div>
                  <div className="flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                    <img src="/x.png" alt="Twitter" width={20} height={20} />
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
                  src="https://firebasestorage.googleapis.com/v0/b/invicta-29211.firebasestorage.app/o/video1.mp4?alt=media&token=5a57ee14-1d76-4026-a9f0-a4bfdd851638"
                  autoPlay
                  muted={isMuted}
                  loop
                  playsInline
                  className="w-[75%] h-[100vh] object-cover rounded shadow-lg"
                />

                {/* Transparent image on top of the video for aesthetic effect */}
                {textAnimationCompleted && (
                  <img
                    src="/transparent.png"
                    alt="Video Overlay"
                    className="absolute inset-0 w-full h-full pointer-events-none" // Added pointer-events-none to prevent clicks
                    style={{
                      objectFit: 'contain',
                      objectPosition: '37% center',
                      zIndex: 45, // Set transparent image to a z-index of 45
                    }}
                  />
                )}
                {/* Mute/Unmute button */}
                <button
                  onClick={toggleMute}
                  className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-black/50 border border-white/30 flex items-center justify-center hover:bg-black/70 transition-colors cursor-pointer z-50" // Increased z-index to 50
                >
                  {isMuted ? <VolumeX className="w-5 h-5 text-white" /> : <Volume2 className="w-5 h-5 text-white" />}
                </button>
              </div>
            </div>
          </>
        )}

        {/* ====== MOBILE SPECIFIC LAYOUT ====== */}
        {isMobile && (
          <div className="w-full flex flex-col items-center text-center space-y-6 z-10 relative">
            {/* Mobile: bg-logo.png positioned on the right side, half visible */}
            <img
              src="/bg-logo.png"
              alt="Background decorative logo"
              width={200}
              height={180}
              className="absolute top-0 right-0 transform translate-x-1/2"
              style={{
                zIndex: 1,
                filter: 'grayscale(100%) brightness(150%) opacity(0.7)',
              }}
            />

            {/* Mobile: the eex.png image */}
            <div className="relative w-full max-w-[300px] sm:max-w-[320px] mt-4 z-10">
              <img
                src="/eex.png"
                alt="Descriptive image for main content"
                width={320}
                height={207}
                className="w-full h-auto mx-auto rounded shadow-lg"
              />
            </div>
            {/* Mobile: text content */}
            <div className="relative z-10">
              <h2 className="text-2xl mb-2 tracking-wide">
                AN ANCIENT SECRET SO POWERFUL...
              </h2>
              <h3 className="text-xl mb-4 tracking-wide">
                IT GAVE RISE TO MODERN CIVILIZATION.
              </h3>
              <p className="text-lg mb-6 tracking-wide text-amber-100">
                Join us as we rediscover the mystery of earth energy.
              </p>
            </div>

            {/* Mobile: The building image (bg-image.png) as a content image */}
            <div className="relative w-full max-w-[550px] sm:max-w-[320px] mt-6 z-10">
              <img
                src="/bg-image.png"
                alt="Building image"
                width={550}
                height={300}
                className="w-full h-auto mx-auto rounded shadow-lg object-cover"
              />
            </div>

            {/* Mobile: video appears below the building image */}
            <div className="relative w-full max-w-[550px] sm:max-w-[320px] mt-6 z-10">
              <video
                ref={videoRef}
                src="https://firebasestorage.googleapis.com/v0/b/invicta-29211.firebasestorage.app/o/video1.mp4?alt=media&token=5a57ee14-1d76-4026-a9f0-a4bfdd851638"
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
            <div className="relative flex space-x-4 justify-center pt-2 z-10">
              {/* Custom Social Media Icons - Mobile */}
              <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                <img src="/facebook.png" alt="facebook" width={16} height={16} />
              </div>
              <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                <img src="/instagram.png" alt="instagram" width={16} height={16} />
              </div>
              <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                <img src="/youtube.png" alt="youTube" width={16} height={16} />
              </div>
              <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                <img src="/x.png" alt="Twitter" width={16} height={16} />
              </div>
            </div>
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
    <div className="min-h-screen bg-black text-white relative overflow-hidden" style={{ fontFamily: 'Radley' }}>
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
        className="relative z-50 flex items-center justify-start p-4 md:p-8"
      >
        <div className="flex items-center space-x-3 sm:space-x-4 md:space-x-8">
          {/* Logo */}
          <div>
            <img
              src="/logoEEx.png"
              alt="Logo"
              width={isMobile ? 50 : 64}
              height={isMobile ? 67 : 85}
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
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-amber-100 focus:outline-none ml-auto z-50">
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

      <div className="relative z-10 px-4 md:px-8 pb-8">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/3 md:pr-8 flex flex-col items-center md:items-start mb-8 md:mb-0">
            <div className="mb-12 md:mb-16 pt-0 md:pt-18 text-center md:text-left">
              {/* "OUR" text image with mobile spacing adjustment */}
              <div className="inline-block max-w-[150px] md:max-w-[200px]" style={{ marginLeft: isMobile ? '0px' : '0', textAlign: isMobile ? 'left' : 'inherit' }}>
                <img
                  src="/our.png"
                  alt="OUR text image"
                  width={200}
                  height={106}
                  className="w-full h-auto" // Using Tailwind for responsive image
                  style={{ marginBottom: isMobile ? '10px' : '0' }}
                />
              </div>
              {/* "TEAM" text image with mobile spacing adjustment */}
              <div className="inline-block max-w-[160px] md:max-w-[280px] mt-2" style={{ marginLeft: isMobile ? '0px' : '0', textAlign: isMobile ? 'left' : 'inherit' }}>
                <img
                  src="/team.png"
                  alt="TEAM text image"
                  width={280}
                  height={140}
                  className="w-full h-auto" // Using Tailwind for responsive image
                />
              </div>
            </div>
            {/* Social Media Icons - Team Page */}
            <div className="flex space-x-4 md:space-x-6 justify-center md:justify-start">
              <div className=" flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                <img src="/facebook.png" alt="Facebook" width={isMobile ? 16 : 20} height={isMobile ? 16 : 20} />
              </div>
              <div className="flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                <img src="/instagram.png" alt="Instagram" width={isMobile ? 16 : 20} height={isMobile ? 16 : 20} />
              </div>
              <div className=" flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                <img src="/youtube.png" alt="YouTube" width={16} height={16} />
              </div>
              <div className=" flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                <img src="/x.png" alt="Twitter" width={16} height={16} />
              </div>
            </div>
          </div>
          {/* Team Members Grid */}
          <div className="w-full md:w-2/3 md:pl-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
              {teamMembers.map((member: TeamMember, index: number) => (
                <div key={index} className="text-center">
                  <div className="mb-3 md:mb-5">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto rounded-full overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        width={128} // Matched new md size
                        height={128} // Matched new md size
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-light tracking-wider mb-1 sm:mb-2">
                    {member.name}
                  </h3>
                  <p className="text-amber-200 font-light text-xs sm:text-sm tracking-wide">
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
    // Detects if the current view is mobile based on window width
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Team member data
  const teamMembers: TeamMember[] = [
    { name: 'MICHAEL', role: 'Narrative & Creative Direction', image: '/profile6.png' },
    { name: 'SANJAY', role: 'Concept & Visual Development', image: '/profile5.png' },
    { name: 'ABHISHEK', role: 'Cinematography & Story Design', image: '/profile4.png' },
    { name: 'CHARU', role: 'Photography & Tech Innovation', image: '/profile3.png' },
    { name: 'NISHA', role: 'Cinematography & Story Design', image: '/profile2.png' },
    { name: 'ARYAN', role: 'Research & Field Logistics', image: '/profile1.png' },
  ];

  // Renders either the HomePage or TeamPage based on the current page state
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
