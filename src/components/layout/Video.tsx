import { useEffect, useState } from 'react';
import YouTube from 'react-youtube';

interface Props {
  embedLink: string | undefined;
}

const VideoApp = ({ embedLink }: Props) => {
  const EmbedID = embedLink?.split('?v=');

  const opts = {
    height: '100%',
    width: '100%',
  };

  const [clickVideo, setClickVideo] = useState(false);

  const onPlayerReady = (event: any) => {
    if (clickVideo) {
      event.target.playVideo();
    }
  };

  return (
    <div className="relative">
      <YouTube
        videoId={`${EmbedID?.[1]}`}
        opts={opts}
        className="aspect-square p-4"
        onReady={onPlayerReady}
      />
      <span
        className={`absolute top-0 left-0 right-0 bottom-0 w-full h-full ${
          clickVideo ? 'hidden' : 'block'
        }`}
        onClick={() => setClickVideo(true)}
      ></span>
    </div>
  );
};

export default VideoApp;
