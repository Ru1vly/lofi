import React, { useEffect, useRef } from "react";

function Music({ isPlaying, volume, currentSong, selectRandomSongs }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          // Autoplay was prevented.
          console.error("Audio playback failed:", error);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
        audioRef.current.src = currentSong;
        if (isPlaying) {
            audioRef.current.play().catch(error => {
                console.error("Audio playback failed:", error);
            });
        }
    }
}, [currentSong, isPlaying]);


  return (
    <audio
      ref={audioRef}
      src={currentSong}
      onEnded={selectRandomSongs}
      loop={false}
    />
  );
}

export default Music;
