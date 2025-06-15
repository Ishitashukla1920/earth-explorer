// pages/watch.tsx
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import SocialLinks from "../components/SocialLinks";
import { motion } from "framer-motion";

const Watch = () => {
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // slower animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,  // ↑ slower stagger
        delayChildren: 0.4     // ↑ longer initial delay
      }
    }
  };
  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,         // ↑ slower fade
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="standard-container bg-black">
      <div className="min-h-screen relative overflow-hidden standard-container">
        <Navbar />

        {!isMobile ? (
          // Desktop / Tablet
          <main className="flex justify-center items-center py-12 px-4 bg-black">
            <div className="w-full max-w-[1300px] aspect-[16/9]">
              <video
                ref={videoRef}
                src="https://firebasestorage.googleapis.com/v0/b/invicta-29211.firebasestorage.app/o/EEX%20Teaser%20Full%20Screen.mp4?alt=media&token=19acba95-544e-4c15-a5d5-904e958f402d"
                controls
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover rounded-xl shadow-xl"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </main>
        ) : (
          // Mobile
          <main className="flex flex-col items-center justify-center px-4 pt-16 pb-10 mt-7 bg-black">
            <motion.div
              className="text-center max-w-md mb-6"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.div variants={textVariants}>
                <Image
                  src="/eex.png"
                  alt="Exclusive Teaser"
                  width={300}
                  height={300}
                  className="mx-auto"
                />
              </motion.div>
              <motion.p
                variants={textVariants}
                className="text-sm text-gray-400 mt-4"
                style={{
                  fontFamily: "Raleway, sans-serif",
                  fontSize: 18,
                  padding: "1.2rem"
                }}
              >
                Watch our exclusive trailer and step into a world of hidden
                energies, ancient mysteries, and spiritual discovery.
              </motion.p>
            </motion.div>

            <div className="w-full mb-6">
              <video
                ref={videoRef}
                src="https://firebasestorage.googleapis.com/v0/b/invicta-29211.firebasestorage.app/o/EEX%20Teaser%20Full%20Screen.mp4?alt=media&token=19acba95-544e-4c15-a5d5-904e958f402d"
                controls
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover rounded-xl shadow-lg"
              >
                Your browser does not support the video tag.
              </video>
            </div>

            <div className="mt-4">
              <SocialLinks />
            </div>
          </main>
        )}
      </div>
    </div>
  );
};

export default Watch;
