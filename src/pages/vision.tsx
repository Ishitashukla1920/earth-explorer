// pages/about.tsx
import Image from 'next/image';
import Navbar from '../components/Navbar';
import SocialLinks from '../components/SocialLinks';

const VisionPage = () => {
  return (
    <div className="standard-container">
      <div className="min-h-screen bg-white relative overflow-hidden">
        {/* Background Image */}
        

        {/* Background Logo */}
        <div className="absolute h-[25vh] w-[100px] bg-logo-responsive  z-1">
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
    src="/ouVision.png"
    alt="About"
    width={160}              // *intrinsic* width
    height={80}              // *intrinsic* height
    className="w-59 h-auto object-contain"
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
    flex flex-col items-start     /* 1 & 2 */
    
    mt-[-40px]
    space-y-5 md:space-y-7 lg:space-y-9
    w-full max-w-[78%]
    ml-[-300px]       /* horizontal padding to align with grid */
  "
>
  {/* Main Headings */}
  <div className="text-center space-y-1 md:space-y-2">
    
    <h2
  className="
    font-[600]                        /* font-weight: 600 */
    text-black
    [font-family:'Aboreto',sans-serif]  /* font-family: Aboreto */
    text-[17px]                       /* exactly 20px font-size */
    leading-snug
  "
>
 If we share a big dream, together we can <br></br> make it a reality.
</h2>
<h3
  className="
    font-[600]
    text-black
    [font-family:'Aboreto',sans-serif]
    text-[17px]
    leading-snug
    space-y-1
  "
>
 OUR DREAM IS TO TRANSFORM THE WORLD FROM SEEING LIFE AS ORDINARY,
      TO SEEING LIFE AS AN EXTRAORDINARY EXPLORATION!</h3>

  
  

  </div>

  
</div>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisionPage;