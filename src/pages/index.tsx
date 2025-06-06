import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Menu, X } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion'; // Import motion from framer-motion
import YouTubeEmbed from '@/components/YoutubeEmbedd';


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
      setTextAnimationCompleted(true);
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
    <div className="min-h-screen bg-black text-white relative overflow-hidden" style={{ fontFamily: 'Radley' }}>
      {/* Top to Bottom Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none z-5"></div>

      {/* Navigation */}
      <nav className={`relative ${isMobile ? 'z-30' : 'z-20'} flex items-center ${isMobile ? 'justify-between' : 'justify-start'} p-4 md:p-8`} style={{ fontFamily: 'Radley' }}>
        <div className="flex items-center space-x-3 sm:space-x-4 md:space-x-8">
          <div>
            <Image
              src="/logoEEx.png"
              alt="Logo"
              width={isMobile ? 50 : 64}
              height={isMobile ? 67 : 85}
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
      <div className={`relative ${isMobile ? 'pt-4 pb-12 px-4' : 'min-h-[calc(100vh-120px)] flex items-center'}`}>
        {/* ====== DESKTOP SPECIFIC LAYOUT ====== */}
        {!isMobile && (
          <>
            <Image
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
              priority
            />
            <Image
              src="/eex.png"
              alt="Descriptive image for main content"
              width={360}
              height={230}
              className="absolute"
              style={{ left: '70px', top: '50px', zIndex: 1 }}
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
                    }}
                    priority
                  />
               {/*   <div className="absolute inset-5 bg-gradient-to-l from-black/40 to-transparent"></div>*/}
                </>
              )}

              {/* Desktop: Text content - fade out when animation completes */}
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
                  src="https://firebasestorage.googleapis.com/v0/b/invicta-29211.firebasestorage.app/o/video1.mp4?alt=media&token=5a57ee14-1d76-4026-a9f0-a4bfdd851638"
                  autoPlay
                  muted={isMuted}
                  loop
                  playsInline
                  className="w-[75%] h-[100vh] object-cover rounded shadow-lg"
                />
                
                {/* Transparent image on top of the video */}
               {textAnimationCompleted && (
  <Image
    src="/transparent.png" // Replace with your transparent image path
    alt="Video Overlay"
    fill
    style={{
      objectFit: 'contain',
       objectPosition: '37% center',
       zIndex: 45, // Ensure it's above the video but below the mute button
    }}
        className="pointer-events-none"

    priority
  />
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
              className="absolute top-0 right-0 transform translate-x-1/2"
              style={{
                zIndex: 1,
                filter: 'grayscale(100%) brightness(150%) opacity(0.7)',
              }}
              priority
            />

            {/* Mobile: the eex.png image */}
            <div className="relative w-full max-w-[300px] sm:max-w-[320px] mt-4 z-10">
              <Image
                src="/eex.png"
                alt="Descriptive image for main content"
                width={320}
                height={207}
                className="w-full h-auto mx-auto rounded shadow-lg"
                priority
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
              <Image
                src="/bg-image.png"
                alt="Building image"
                width={550}
                height={300}
                className="w-full h-auto mx-auto rounded shadow-lg object-cover"
                priority
              />
            </div>

            {/* Mobile: video appears below the building image */}
            <div className="relative w-full max-w-[550px] sm:max-w-[320px] mt-6 z-10">
              <video
                ref={videoRef}
                src="https://firebasestorage.googleapis.com/v0/b/invicta-29211.firebasestorage.app/o/video1.mp4?alt=media&token=5a57ee14-1d76-4026-a9f0-a4bfdd851638"
                autoPlay
                
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
                <Image src="/facebook.png" alt="facebook" width={16} height={16} />
              </div>
              <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                <Image src="/instagram.png" alt="instagram" width={16} height={16} />
              </div>
              <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                <Image src="/youtube.png" alt="youTube" width={16} height={16} />
              </div>
              <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                <Image src="/x.png" alt="Twitter" width={16} height={16} />
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

      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
            backgroundImage: 'url("/ourTeamBg.png")',
            filter: 'brightness(250%)', // <-- CHANGE: Made background brighter
            zIndex: 0
        }}
      />
      <div className="absolute inset-0 bg-black/50" style={{ zIndex: 0 }} />
      <nav
        className="relative z-50 flex items-center justify-start p-4 md:p-8"
      >
        <div className="flex items-center space-x-3 sm:space-x-4 md:space-x-8">
          <div>
            <Image
              src="/logoEEx.png"
              alt="Logo"
              width={isMobile ? 50 : 64}
              height={isMobile ? 67 : 85}
              className="rounded-full"
              priority
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
              <div className="inline-block max-w-[150px] md:max-w-[200px] ml-[-20px] sm:ml-0 md:ml-0"> {/* <--- MODIFIED OUR.PNG HERE */}
                <Image
                  src="/our.png"
                  alt="OUR text image"
                  width={200}
                  height={106}
                  layout="responsive"
                  priority
                />
              </div>
              <div className="inline-block max-w-[160px] md:max-w-[280px] mt-2 ml-[-20px] sm:ml-0 md:ml-0">
                <Image
                  src="/team.png"
                  alt="TEAM text image"
                  width={280}
                  height={140}
                  layout="responsive"
                  priority
                />
              </div>
            </div>
            <div className="flex space-x-4 md:space-x-6 justify-center md:justify-start">
              {/* Custom Social Media Icons - Team Page */}
              <div className=" flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                <Image src="/facebook.png" alt="Facebook" width={isMobile ? 16 : 20} height={isMobile ? 16 : 20} />
              </div>
              <div className="flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                <Image src="/instagram.png" alt="Instagram" width={isMobile ? 16 : 20} height={isMobile ? 16 : 20} />
              </div>
              <div className=" flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                <Image src="/youtube.png" alt="YouTube" width={isMobile ? 16 : 20} height={isMobile ? 16 : 20} />
              </div>
              <div className=" flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                <Image src="/x.png" alt="Twitter" width={isMobile ? 16 : 20} height={isMobile ? 16 : 20} />
              </div>
            </div>
          </div>
          <div className="w-full md:w-2/3 md:pl-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
              {teamMembers.map((member: TeamMember, index: number) => (
                <div key={index} className="text-center">
                  <div className="mb-3 md:mb-5">
                    {/* CHANGE: Reduced image container size */}
                    <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto rounded-full overflow-hidden">
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={128} // <-- CHANGE: Matched new md size
                        height={128} // <-- CHANGE: Matched new md size
                        className="w-full h-full object-cover"
                        priority
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