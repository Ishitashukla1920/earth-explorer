// pages/vision.tsx

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import SocialLinks from "@/components/SocialLinks";
import { motion } from "framer-motion";

const VisionContent = ({ isMobile }: { isMobile: boolean }) => {
  const textVariants = {
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 2, duration: 1, ease: "easeOut" },
    }),
    hidden: { opacity: 0, y: 20 },
  };

  return (
    <div className="standard-container">
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        <Navbar />

        <div
          className={`relative ${
            isMobile ? "pt-24" : "min-h-[calc(100vh-120px)] flex items-center"
          }`}
        >
          {/* ===== Desktop & Tablet ===== */}
          {!isMobile && (
            <>
              <Image
                src="/bg-logo2.png"
                alt="Background decorative logo"
                width={350}
                height={320}
                className="centered-bg-logo"
                style={{
                  objectFit: "contain",
                  filter: "grayscale(100%) brightness(200%)",
                }}
                priority
              />

              <Image
                src="/ouVision.png"
                alt="Our Vision logo"
                width={270}
                height={180}
                className="centered-ourVision"
                priority
              />

              {/* Slogans (moved up, and smaller font sizes) */}
              <motion.div
                className="absolute inset-x-0 top-[25%] flex flex-col items-center justify-center px-4 z-70 space-y-4"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 3.5 } },
                }}
              >
                <motion.h2
                  className="
                    font-Aboreto font-light drop-shadow-md
                    text-sm sm:text-base md:text-lg lg:text-xl
                    text-center
                  "
                  style={{ fontFamily: "Aboreto, sans-serif" }}
                  variants={textVariants}
                  custom={0}
                >
                  IF WE SHARE A BIG DREAM, TOGETHER WE CAN
                  <br />
                  MAKE IT A REALITY.
                </motion.h2>

                <motion.h3
                  className="
                    font-Aboreto font-light drop-shadow-md
                    text-sm sm:text-base md:text-lg lg:text-xl
                    text-center
                  "
                  style={{ fontFamily: "Raleway, sans-serif",color: "#92856C", fontSize: '19px' }}
                  variants={textVariants}
                  custom={1}
                >
                  Our dream is to transform the world from
                  <br />
                  seeing life as ordinary, to seeing life as an
                  <br />
                  extraordinary exploration!
                </motion.h3>
              </motion.div>

              {/* Video */}
              <div className="absolute -right-8 top-[40%] transform -translate-y-1/2 z-10 w-[clamp(380px,40vw,800px)]">
                <video
                  src="/visionBlack.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto object-contain rounded shadow-lg"
                />
              </div>
            </>
          )}

          {/* ===== Mobile ===== */}
          {isMobile && (
            <div className="w-full flex flex-col items-center text-center -mt-4  relative space-y-6">
              <Image
                src="/bg-logo2.png"
                alt="Background logo"
                width={200}
                height={180}
                className="absolute top-0 bg-logo-mobile -mt-4"
                style={{
                  filter: "grayscale(100%) brightness(150%) opacity(0.7)",
                }}
                priority
              />
              
              <div className="relative w-full max-w-[200px] mb-16 -mt-2 self-start ml-6">
                <Image
                  src="/ouVision.png"
                  alt="Our Vision logo"
                  width={200}
                  height={130}
                  className="w-full h-auto rounded shadow-lg"
                  priority
                />
                 <div className="mt-6 justify-start md:justify-start" 
              style={{
                  marginTop: '20%',
                  marginLeft: '12%',
                  marginBottom: '1%',
                  }}>
            <SocialLinks  /></div>
              </div>

              <motion.div
                className="w-full px-6 mb-18 space-y-3"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 3 } },
                }}
              >
                <motion.h2
                  className="
                    font-Aboreto font-light drop-shadow-md
                    text-sm sm:text-base md:text-lg
                    text-center
                  "
                  style={{ fontFamily: "Aboreto, sans-serif",fontSize: '18px' }}
                  variants={textVariants}
                  custom={0}
                >
                  IF WE SHARE A BIG DREAM, 
                  <br />
                 TOGETHER WE CAN MAKE IT A REALITY.
                </motion.h2>

                <motion.h3
                  className="
                    font-Aboreto font-light drop-shadow-md
                    text-sm sm:text-base md:text-lg
                    text-center p-2
                  "
                  style={{ fontFamily: "Raleway, sans-serif",color: "#92856C" }}
                  variants={textVariants}
                  custom={1}
                >
                  Our dream is to transform the world from
                  seeing life as ordinary, to seeing life as an
                  Extraordinary exploration!
                </motion.h3>
              </motion.div>

              <div className="w-full max-w-[90vw] -mt-12">
                <video
                  src="/visionBlack.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto object-cover rounded shadow-lg"
                />
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const VisionPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return <VisionContent isMobile={isMobile} />;
};

export default VisionPage;
