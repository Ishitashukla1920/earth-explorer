// pages/about.tsx
import Image from 'next/image';
import Navbar from '../components/Navbar';
import SocialLinks from '../components/SocialLinks';

const AboutPage = () => {
  return (
    <div className="standard-container">
      <div className="min-h-screen bg-white relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-image-responsive">
          <Image
            src="/monument.png"
            alt="Parthenon Background"
            fill
                    style={{
                      objectFit: 'contain',
                      objectPosition: 'right center',
                      filter: 'brightness(100%)',
                      zIndex:0
                    }}
            priority
          />
          {/* Overlay */}
          <div className="absolute inset-0 pointer-events-none 
                bg-gradient-to-r 
                bg-[linear-gradient(to_right,white_50%,rgba(255,255,255,0)_100%)]" />
        </div>

        {/* Background Logo */}
        <div className="absolute h-[25vh] w-[100px] bg-logo-responsive z-1">
          <Image
            src="/bg-logo.png"
            alt="Background Logo"
            width={800}
            height={800}
            className="object-contain opacity-100 filter -brightness-280 -contrast-100%" // Much more visible/darker
          />
        </div>

        <Navbar />

        {/* Main Content */}
        <div className="relative z-10 min-h-screen flex items-center">
          <div className="w-full px-6 md:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              
              {/* Left Side - Text Content */}
              <div className="order-2 lg:order-1">
                {/* Title */}
                

<div className="mb-8 md:mb-12 flex flex-col items-start space-y-1  transform translate-x-26 mt-3">
  {/* ABOUT */}
  <Image
    src="/about.png"
    alt="About"
    width={160}              // *intrinsic* width
    height={80}              // *intrinsic* height
    className="w-59 h-auto object-contain"
  />

  {/* US */}
  <Image
    src="/us.png"
    alt="Us"
    width={160}
    height={60}
    className="w-47 h-auto object-contain"
  />
  <div className="mb-8 mt-4 md:mb-12">
                  <SocialLinks />
                </div>
</div>



                {/* Social Links */}
                
              </div>

              {/* Right Side - Content */}
             <div
  className="
    order-1 lg:order-2
    flex flex-col justify-center items-center
    h-full 
    ml-[-370px]
    mt-[-60px]
    space-y-4 md:space-y-6 lg:space-y-8
    w-full max-w-[1080px] mx-auto     /* horizontal padding to align with grid */
  "
>
  {/* Main Headings */}
  <div className="text-center space-y-2 md:space-y-3">
    
    <h2
  className="
    font-[600]                        /* font-weight: 600 */
    text-black
    [font-family:'Aboreto',sans-serif]  /* font-family: Aboreto */
    text-[17px]                       /* exactly 20px font-size */
    leading-snug
  "
>
  EXPLORING THE EARTH'S SURFACE
</h2>
<h3
  className="
    font-[600]
    text-black
    [font-family:'Aboreto',sans-serif]
    text-[17px]
    leading-snug
  "
>
  AWAKENING THE SPIRIT WITHIN.
</h3>

    {/* Description */}
  <p
  className="
    w-[60%]   
    ml-[120px]     /* width: 60% */
    max-w-[60%]       /* max-width: 60% */
    flex-grow-0       /* --container-widget-flex-grow: 0 */
    text-center       /* text-align: center */
    font-[Raleway]    /* font-family: Raleway */
    text-[17px]       /* font-size: 17px */
    font-medium       /* font-weight: 500 */
    text-[#92856C]    /* color: #92856C */
    leading-relaxed   /* your existing leading-relaxed */
    mx-auto           /* center block inside parent */
  "
>
  We travel across sacred lands, tracing energy lines and connecting with the spiritual essence of the Earth.
</p>

  </div>

  
</div>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;