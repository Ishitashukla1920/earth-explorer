import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/router";
import { label } from "framer-motion/client";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<string>("home");
  const router = useRouter();

  useEffect(() => {
    const path = router.asPath;
    const page = path === "/" ? "home" : path.replace("/", "");
    setCurrentPage(page);
  }, [router.asPath]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = [
    // { href: '/', label: 'Home', id: 'home' },
    { href: "/team", label: "Team", id: "team" },
    { href: "/watch", label: "Watch", id: "watch" },
    // { href: '/vision', label: 'Vision', id: 'vision' },
    //      { href: '/about', label: 'About Us', id: 'about' },
  ];

  const isLightBg =
    ["home", "team", "watch"].includes(currentPage) ||
    router.asPath.startsWith("/team2");
  const linkTextColor = isLightBg ? "text-white" : "text-black";
  const border = isLightBg ? "border-white" : "border-black";

  return (
    <nav
      className={`relative z-50 flex items-center padding-new ${
        isMobile ? "justify-between" : "justify-start"
      } p-2 md:p-8`}
      style={{
        fontFamily: "Radley",
        ...(isMobile
          ? {
              width: "100%",
              height: "40px",
              position: "absolute",
              top: 0,
              left: 0,
            }
          : {}),
      }}
    >
      <div className="flex items-center space-x-3 sm:space-x-4 md:space-x-8">
        <div
          style={
            isMobile ? { position: "absolute", left: "10px", top: "9px" } : {}
          }
        >
          <Link href="/">
            {" "}
            <Image
              src={isLightBg ? "/logoEEx.png" : "/logo-black.png"}
              alt="Logo"
              width={isMobile ? 47 : 58}
              height={isMobile ? 47.6 : 76}
              className="rounded-full opacity-80"
            />
          </Link>
        </div>

        {!isMobile &&
          navLinks.map((link) => (
            <Link href={link.href} key={link.id}>
              <button
                style={{
                  fontFamily: "Aboreto, Sans-serif",
                }}
                className={`
       text-sm 
       sm:text-base 
       md:text-lg 
       lg:text-lg 
       xl:text-xl 
       2xl:text-2xl 
       font-medium 
       cursor-pointer 
       opacity-80 
       sm:opacity-80 
       md:opacity-80 
       ${linkTextColor} ${
                  currentPage === link.id ? `border-b-2 ${border} pb-1` : ""
                }`}
              >
                {link.label}
              </button>
            </Link>
          ))}
      </div>
      {isMobile && (
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="ml-auto mr-4 focus:outline-none z-50"
        >
          {menuOpen ? (
            <X size={28} className="text-white opacity-80" />
          ) : (
            <Menu size={28} className="text-white opacity-80" />
          )}
        </button>
      )}

      {isMobile && menuOpen && (
        <div className="fixed top-14 left-0 w-full bg-white z-40 shadow-lg">
          {navLinks.map((link) => (
            <Link key={link.id} href={link.href}>
              <button
                onClick={() => setMenuOpen(false)}
                className="w-full py-3 text-center font-Aboreto text-amber-800 hover:bg-amber-200 border-b border-gray-300"
              >
                {link.label}
              </button>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
