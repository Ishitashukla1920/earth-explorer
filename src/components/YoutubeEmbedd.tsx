import React from 'react';

interface YouTubeEmbedProps {
  videoId: string;
  width?: number;
  height?: number;
  autoplay?: boolean;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({
  videoId,
  width =690,
  height = 1200,
  autoplay = false,
}) => {
  const autoplayParams = autoplay ? '?autoplay=1&mute=1' : '';

  return (
    <div className="flex justify-center items-center">
      <iframe
        width={width}
        height={height}
        src={`https://www.youtube.com/embed/${videoId}${autoplayParams}`}
        title="YouTube video player"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YouTubeEmbed;
