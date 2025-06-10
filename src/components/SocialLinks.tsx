// components/SocialLinks.tsx
const SocialLinks = () => {
  return (
    <div
        className="
          flex items-center space-x-4 left-4

          /* tablet (≥768px): nudge into place */
          md:static md:mt-4 md:justify-start md:space-x-6

          /* desktop (≥1024px): flow under headings */
          lg:mt-2 lg:space-x-8
          
        "
       
      >
  
  <div className="flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
    <img src="/facebook.png" alt="Facebook" width={20} height={20} />
  </div>
  <div className="flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
    <img src="/instagram.png" alt="Instagram" width={20} height={20} />
  </div>
  <div className="flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
    <img src="/youtube.png" alt="YouTube" width={20} height={20} />
  </div>
  <div className="flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
    <img src="/x.png" alt="Twitter" width={20} height={20} />
  </div>
</div>
  );
};

export default SocialLinks;