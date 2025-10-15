import React, { forwardRef, useEffect } from 'react';
import './VideoPlayer.css';

const VideoPlayer = forwardRef(({ streamUrl, onPlay, onPause }, ref) => {
  useEffect(() => {
    if (ref.current && streamUrl) {
      // For RTSP streams, we'll use a video element
      // In a production environment, you might want to use WebRTC or HLS conversion
      ref.current.src = streamUrl;
      ref.current.load();
    }
  }, [streamUrl, ref]);

  return (
    <video
      ref={ref}
      className="video-player"
      controls={true}
      autoPlay
      playsInline
      onPlay={onPlay}
      onPause={onPause}
      poster="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcgU3RyZWFtLi4uPC90ZXh0Pjwvc3ZnPg=="
    >
      <source src={streamUrl} type="video/mp4" />
      <source src={streamUrl} type="application/x-mpegURL" />
      Your browser does not support the video tag.
    </video>
  );
});

VideoPlayer.displayName = 'VideoPlayer';

export default VideoPlayer;

