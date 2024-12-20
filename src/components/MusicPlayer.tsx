import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import uuid from 'uuid';

interface MusicPlayerProps {
  playlist: Record<string, string>;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ playlist }) => {
  const trackNames = Object.keys(playlist);
  const [currentTrack, setCurrentTrack] = useState(0);

  const audioPlayerRef = useRef<HTMLAudioElement>(null);

  const playTrack = React.useMemo(
    () => async (index: number) => {
      setCurrentTrack(index);
      if (audioPlayerRef.current) {
        audioPlayerRef.current.src = playlist[trackNames[index]];
        await audioPlayerRef.current.play();
      }
    },
    [playlist, trackNames],
  );

  useEffect(() => {
    const audioPlayer = audioPlayerRef.current;
    if (audioPlayer) {
      const handleEnded = async () => {
        const nextTrack = (currentTrack + 1) % trackNames.length;
        setCurrentTrack(nextTrack);
        audioPlayer.src = playlist[trackNames[nextTrack]];
        await audioPlayer.play();
      };

      audioPlayer.addEventListener('ended', handleEnded);

      // Set the initial track when the component mounts
      if (!audioPlayer.src) {
        audioPlayer.src = playlist[trackNames[0]];
        setCurrentTrack(0);
      }
    }
  }, [playlist, currentTrack, trackNames]);

  return (
    <div className="music-player">
      <audio ref={audioPlayerRef} controls>
        <track kind="captions" src="" label="English captions" />
        Your browser does not support the audio element.
      </audio>
      <div className="playlist">
        {trackNames.map((trackName, index) => (
          <Button
            key={uuid.v4()}
            onClick={() => playTrack(index)}
            variant="outline-primary"
            className="m-1"
          >
            {trackName}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default MusicPlayer;
