
'use client'; 

import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

interface HlsPlayerProps {
  src: string;
  poster?: string;
  autoPlay?: boolean;
  controls?: boolean;
}

const HlsPlayer: React.FC<HlsPlayerProps> = ({
  src,
  poster,
  autoPlay = false,
  controls = true,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(videoRef.current);

        return () => {
          hls.destroy();
        };
      } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        videoRef.current.src = src;
      }
    }
  }, [src]);

  return (
    <video
      ref={videoRef}
      controls={controls}
      autoPlay={autoPlay}
      poster={poster}
      className="w-full rounded-lg shadow-lg"
    />
  );
};

export default HlsPlayer;
