'use client';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  descriptionImage: {
    desktop: string;
    tablet: string;
    mobile: string;
  };
}

const ProfilePage = ({
  member,
  team,
}: {
  member: TeamMember;
  team: TeamMember[];
}) => {
  const router = useRouter();
  const idx = team.findIndex((m) => m.id === member.id);

  const [vp, setVp] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  useEffect(() => {
    const upd = () => {
      const w = window.innerWidth;
      setVp(w < 768 ? 'mobile' : w < 1024 ? 'tablet' : 'desktop');
    };
    upd();
    window.addEventListener('resize', upd);
    return () => window.removeEventListener('resize', upd);
  }, []);
  const descSrc = member.descriptionImage[vp];

  const prev = () => {
    const i = (idx - 1 + team.length) % team.length;
    router.push(`/team2/${team[i].id}`);
  };
  const next = () => {
    const i = (idx + 1) % team.length;
    router.push(`/team2/${team[i].id}`);
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* fixed navbar */}
      <div className="fixed inset-x-0 top-0 z-50">
        <Navbar />
      </div>

      {/* background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("/ourTeamBg.png")' }}
      >
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* main content: top padding varies by viewport */}
      <div
        className="
          relative z-10
          px-4
          pt-40 sm:pt-48 lg:pt-[30vh]
          flex flex-col lg:flex-row items-center lg:items-start justify-center
          gap-8 max-w-7xl mx-auto
        "
      >
        {/* PROFILE */}
        <div className="flex flex-col items-center text-center gap-4 w-full lg:w-1/3">
          <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8">
            <button
              onClick={prev}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition"
            >
              <ChevronLeft
                size={20}
                className="text-white/80 sm:text-white/90 md:text-white"
              />
            </button>
            <Image
              src={member.image}
              alt={member.name}
              width={96}
              height={96}
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full object-cover"
            />
            <button
              onClick={next}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition"
            >
              <ChevronRight
                size={20}
                className="text-white/80 sm:text-white/90 md:text-white"
              />
            </button>
          </div>
          <h1 className="font-Aboreto text-lg sm:text-xl md:text-2xl lg:text-3xl">
            {member.name}
          </h1>
          <p className="font-Raleway text-base sm:text-lg md:text-lg lg:text-xl text-amber-200">
            {member.role}
          </p>
        </div>

        {/* DESCRIPTION (moved up and enlarged) */}
<div className="flex justify-center items-center w-full lg:w-2/3 px-2 sm:px-4 md:px-8 lg:-mt-20">
          {descSrc ? (
            <Image
              src={descSrc}
              alt={`${member.name} description`}
              width={1400}
              height={1000}
              className="
                object-contain
                w-full
                max-h-[90vh]
              "
            />
          ) : (
            <p className="text-white">Description not available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
