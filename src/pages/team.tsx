import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Menu, X } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion'; // Import motion from framer-motion
import Link from 'next/link';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import SocialLinks from '@/components/SocialLinks';

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

interface TeamPageProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  teamMembers: TeamMember[];
  isMobile: boolean;
  menuOpen: boolean;
  setMenuOpen: (isOpen: boolean) => void;
}

const teamMembers: TeamMember[] = [
    { name: 'MICHAEL', role: 'Narrative & Creative Direction', image: '/profile6.png' },
    { name: 'SANJAY', role: 'Concept & Visual Development', image: '/profile5.png' },
    { name: 'ABHISHEK', role: 'Cinematography & Story Design', image: '/profile4.png' },
    { name: 'CHARU', role: 'Photography & Tech Innovation', image: '/profile3.png' },
    { name: 'NISHA', role: 'Cinematography & Story Design', image: '/profile2.png' },
    { name: 'ARYAN', role: 'Research & Field Logistics', image: '/profile1.png' },
];

const TeamPage = ({
  currentPage,
  setCurrentPage,
  isMobile,
  menuOpen,
  setMenuOpen,
}: TeamPageProps) => {

  return (
    <div className="standard-container">
    <div className="min-h-screen bg-black text-white relative overflow-hidden standard-container" style={{ fontFamily: 'Radley' }}>
      {/* Top to Bottom Overlay for Team Page */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none z-5"></div>

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
      
 <Navbar />

      <div className="relative z-10 px-2 md:px-8">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/3 md:pr-8 flexrape flex flex-col md:items-start md:mb-0 mt-5">
            <div className=" md:mb-8 pt-0 md:pt-18 md:text-left" style={isMobile ? {  left: '10px', top: '55px',position:'relative', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' } : {}}>
              {/* "OUR" text image with responsive sizing */}
             {!isMobile ? (
                <div className="inline-block w-[120px] sm:w-[160px] md:w-[180px] lg:w-[240px] xl:w-[300px] pr-8" style={{ marginBottom: isMobile ? '4px' : '2px' }}>
                  <img
                    src="/ourTeam.png"
                    alt="OUR text image"
                    className="w-full h-auto"
                  />
                </div>
              ) : ( <>
               <div
  className="inline-block w-[180px] md:w-[100px] lg:w-[240px] xl:w-[300px] pr-8"
  style={{ marginBottom: isMobile ? '4px' : '2px' }}
>
  <img
    src="/ourTeam.png"
    alt="OUR text image"
    className="w-full h-auto"
  />

                </div>
               {isMobile ? <div className='pr-4 pt-4'><SocialLinks /></div> : ''}</>
                  
              )}
              {/* "TEAM" text image with responsive sizing */}
              {/* <div className="inline-block w-[120px] sm:w-[150px] md:w-[200px] lg:w-[240px] xl:w-[280px] mt-1">
                <img
                  src="/team.png"
                  alt="TEAM text image"
                  className="w-full h-auto"
                />
              </div> */}
            </div>
            {/* Social Media Icons - Team Page */}
            {/* <div
              className="
                flex items-center space-x-4 left-4
                md:static md:mt-4 md:justify-start md:space-x-6
                lg:mt-2 lg:space-x-8
              "
              style={isMobile ? { position: 'relative', left: '10px', top: '75px' } : {}}
            >
            
            </div> */}
            {!isMobile ? <div className='pr-4'><SocialLinks /></div> : ''}
          </div>
          
          {/* Team Members Grid */}
          <div
            className="w-full md:w-2/3 md:pl-8"
            style={
              isMobile
                ? {
                    marginTop: '150px',
                    width: '100%',
                    paddingBottom: '50px'
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
    </div>
  );
};

const Team = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('team');

  // Add the useEffect hook to properly detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
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

export default Team;