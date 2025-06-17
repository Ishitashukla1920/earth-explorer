import React, { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import SocialLinks from "@/components/SocialLinks";
import { motion } from "framer-motion"; // Import motion from framer-motion


const VisionContent = ({ isMobile }: { isMobile: boolean }) => {
  const isTablet =
    typeof window !== "undefined" &&
    window.innerWidth <= 1024 &&
    window.innerWidth > 768;

   const textVariants = {
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 3, // show line 0 at 0s, line1 at 3s, line2 at 6s
        duration: 1, // 1s fade
        ease: "easeOut",
      },
    }),
    hidden: { opacity: 0, y: 20 }, // initial state
  };

  return (
    <div className="standard-container">
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* Navbar */}
        <Navbar />

        <div
          className={`relative ${isMobile
              ? "pt-12"
              : "min-h-[calc(100vh-120px)] flex items-center"
            }`}
        >
          {/* ===== Desktop View ===== */}
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
                  alignItems: "center",
                  zIndex: 5,
                  filter: "grayscale(100%) brightness(200%)",
                }}
                priority
              />

              <Image
                src="/ouVision.png"
                alt="Descriptive image"
                width={300}
                height={210}
                className="centered-ourVision"
                priority
              />

              {/* Shared Vision Text - Centered between logo and image */}
              {/* <div className="absolute inset-0 flex items-center justify-center z-16 px-15 md:px-9">
                <div
                  className="flex flex-col items-center text-center
      ml-[1rem] lg:ml-[3rem] xl:ml-[6rem] 2xl:ml-[8rem]
      mr-[3rem] lg:mr-[5rem] xl:mr-[6rem] 2xl:mr-[8rem]
      max-w-[80%] md:max-w-[300px] lg:max-w-[600px]"
                >
                  <p
                    style={{
                      fontFamily: "Aboreto, Sans-serif",
                      color: "#fff",
                      fontWeight: "500",
                    }}
                    className="font-aboreto mb-3
        text-sm md:text-sm lg:text-lg
        leading-tight"
                  >
                    IF WE SHARE A BIG DREAM, TOGETHER WE CAN <br />
                    MAKE IT A REALITY.
                  </p>

                  <p
                    style={{
                      fontFamily: "Aboreto, Sans-serif",
                      color: "#fff",
                      fontWeight: 400,
                    }}
                    className="text-xs md:text-sm lg:text-base
        leading-snug"
                  >
                    Our dream is to transform the world from <br />
                    seeing life as ordinary, to seeing life as an <br />
                    Extraordinary exploration!
                  </p>
                </div>
              </div> */}
            <div className="w-2/3 ml-[15%] mr-[10%] px-8 md:px-12 lg:px-16 flex flex-col text-center space-y-3 pt-1 pb-4 relative">
  <div className="relative z-16 pl-4 pr-4">
    <motion.div
      className="flex flex-col justify-center transform -translate-y-8 space-y-4 mr-6 pr-7"
      variants={{
        hidden: { opacity: 0, transition: { duration: 1 } },
        visible: {
          opacity: 1,
          transition: {
            duration: 3.5,
            staggerChildren: 4,
            staggerDirection: -1,
          },
        },
      }}
    >
      <motion.h5
        className="text-[clamp(0.60rem,1.2vw,1.1rem)] ml-[15%] mr-[12%]"
        style={{ fontFamily: "Aboreto, Sans-serif" }}
        variants={textVariants}
        custom={0}
      >
        IF WE SHARE A BIG DREAM, TOGETHER WE CAN <br></br>MAKE IT A REALITY.
      </motion.h5>

      <motion.h5
        className="text-[clamp(0.60rem,1.2vw,1rem)] "
        style={{ fontFamily: "Aboreto" }}
        variants={textVariants}
        custom={1}
      >
        Our dream is to transform the world from <br />
        seeing life as ordinary, to seeing life as an <br />
        Extraordinary exploration!
      </motion.h5>
    </motion.div>
  </div>
</div>

              <div className="absolute right-0 top-[40%] transform -translate-y-1/2 z-10">
  <div className="ml-10 lg:ml-12 xl:ml-16">
    <video
      src="/visionBlack.mp4"
      autoPlay
      loop
      muted
      playsInline
      className="rounded shadow-lg object-contain
        w-[300px] sm:w-[400px] md:w-[470px] lg:w-[500px] xl:w-[600px] 2xl:w-[700px]
        h-auto"
    />
  </div>
</div>


            </>
          )}

          {/* ===== Mobile View ===== */}
          {isMobile && (
            <div className="w-full flex flex-col items-center text-center z-10 relative mt-2">
              {/* Background Logo */}
              <Image
                src="/bg-logo2.png"
                alt="Background logo"
                width={200}
                height={180}
                className="absolute top-0 bg-logo-mobile"
                style={{
                  zIndex: 1,
                  filter: "grayscale(100%) brightness(150%) opacity(0.7)",
                }}
                priority
              />

              {/* OUR VISION Logo */}
              <div className="relative w-full max-w-[160px] sm:max-w-[240px] mb-[3px] z-10 self-start mt-3 ml-3">
                <Image
                  src="/ouVision.png"
                  alt="Descriptive image"
                  width={250}
                  height={154}
                  className="w-full h-auto rounded shadow-lg"
                  priority
                />
                <div
                  className="relative pr-4 pt-4 my-2 z-10 ml-6"

                >
                  <SocialLinks />
                </div>
              </div>

              {/* Social Links */}


              {/* Text: Quote and Paragraph */}
              <div className="relative w-full flex flex-col justify-center items-center text-center px-4 mt-2 z-10">
                <p
                  style={{
                    fontFamily: "Aboreto, Sans-serif",
                    color: "#fff",
                    fontSize: "15px",
                  }}
                  className="font-medium mb-2 text-base px-3"
                >
                  IF WE SHARE A BIG DREAM, TOGETHER WE CAN  MAKE IT A
                  REALITY.
                </p>

                <p
                  style={{
                    fontFamily: "Aboreto, Sans-serif",
                    color: "#92856C",
                    fontSize: "12px",
                    fontWeight: 400,
                  }}
                  className="leading-relaxed mt-4 text-sm px-3"
                >
                  Our dream is to transform the world  <br />
                  from seeing life as ordinary, to seeing  <br />
                  life as an Extraordinary exploration!
                </p>
              </div>

              {/* Vision Image */}
              <div className="relative w-full max-w-[550px] md:max-w-[450px] sm:max-w-[90vw] mb-2 mt-6 pl-5 pr-4 z-10">
                <video
                  src="/visionBlack.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  width={500}
                  height={600}
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
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return <VisionContent isMobile={isMobile} />;
};

export default VisionPage;