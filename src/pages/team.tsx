'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import SocialLinks from '@/components/SocialLinks';

const teamMembers = [
  { id: 'michael', name: 'MICHAEL', role: 'Narrative & Creative Direction', image: '/profile6.png' },
  { id: 'sanjay', name: 'SANJAY', role: 'Visual Development', image: '/profile5.png' },
  { id: 'abhishek', name: 'ABHISHEK', role: 'Cinematography & Story Design', image: '/profile4.png' },
  { id: 'charu', name: 'CHARU', role: 'Technical Direction', image: '/profile3.png' },
  { id: 'nisha', name: 'NISHA', role: 'Cinematography & Story Design', image: '/profile2.png' },
  { id: 'aryan', name: 'ARYAN', role: 'Social Media', image: '/profile1.png' },
];

const TeamPage = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden" style={{ fontFamily: 'Radley' }}>
      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none z-5" />
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("/ourTeamBg.png")', filter: 'brightness(250%)', zIndex: 0 }} />
      <div className="absolute inset-0 bg-black/50" style={{ zIndex: 0 }} />

      {/* Navbar */}
      <Navbar />

      {/* Content */}
      <div className="relative z-10 px-2 md:px-8 md:mr-9">
        <div className="flex flex-col md:flex-row">
          {/* Left Title + Social */}
          <div className="w-full md:w-1/3 md:pr-8 mt-3">
           <div className=" md:mb-8 pt-0 md:pt-16 md:text-left" style={isMobile ? { left: '10px', top: '55px', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' } : {}}>
                {/* "OUR" text image with responsive sizing */}
                {!isMobile ? (
                  <div className=" " style={{ marginBottom: isMobile ? '4px' : '2px' }}>
                    <img
                      src="/ourTeam.png"
                      alt="OUR text image"
                      className=" eex-responsive"
                      style={{ width: '16vw' }}
                    />
                  </div>
                ) : (<>
                  <div
                    className="inline-block w-[180px] md:w-[100px] lg:w-[240px] xl:w-[300px] pr-8"
                    style={{ marginBottom: isMobile ? '4px' : '2px' }}
                  >
                    <img
                      src="/ourTeam.png"
                      alt="OUR text image"
                      className=""
                      style={{ width: '35vw', marginLeft: '20px' }}
                    />

                  </div>
                  {isMobile ? <div className='relative pr-4 pt-4 my-5' style={{ marginLeft: '20px' }} ><SocialLinks /></div> : ''}</>)}


              </div>
          </div>

          {/* Right Team Grid */}
          <div className="w-full md:w-2/3 md:pl-8" style={{ marginTop: isMobile ? '20%' : '2%' }}>
            <div className={`grid gap-x-2 gap-y-8 justify-items-center px-2 ${isMobile ? 'grid-cols-2' : 'grid-cols-3'}`}>
              {teamMembers.map((member, index) => (
                <Link href={`/team2/${member.id}`} key={index}>
                  <div className="text-center cursor-pointer  transition-all duration-300">
                    <div className="mb-3 md:mb-5">
                      <div
                        className="mx-auto rounded-full overflow-hidden"
                        style={{
                          width: isMobile ? '80px' : '100px',
                          height: isMobile ? '80px' : '100px',
                        }}
                      >
                        <Image
                          src={member.image}
                          alt={member.name}
                          width={100}
                          height={100}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <h3
                      className="tracking-wider mb-1"
                      style={{ fontFamily: 'Aboreto', fontSize: isMobile ? '14.32px' : '20px' }}
                    >
                      {member.name}
                    </h3>
                    <p
                      className="text-amber-200 font-light tracking-wide"
                      style={{ fontFamily: 'Raleway', fontSize: isMobile ? '10px' : '16px' }}
                    >
                      {member.role}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;