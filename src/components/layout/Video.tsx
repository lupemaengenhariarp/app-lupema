import { useEffect, useState } from 'react';
import YouTube from 'react-youtube';

interface Props {
  embedLink: string | undefined;
}

const VideoApp = ({ embedLink }: Props) => {
  let EmbedID = null;

  try {
    const url = new URL(embedLink || '');

    if (url.hostname.includes('youtu.be')) {
      EmbedID = url.pathname.slice(1);
    } else {
      EmbedID = url.searchParams.get('v');
    }
  } catch (e) {
    EmbedID = null;
  }

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
        videoId={`${EmbedID}`}
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
