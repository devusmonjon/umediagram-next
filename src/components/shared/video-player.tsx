import { PlayIcon, Volume2, VolumeOff } from "lucide-react";
import { useRef, useState } from "react";

const VideoPlayer = ({ content }: { content: { url: string } }) => {
  const [videoPlayed, setVideoPlayed] = useState<boolean>(false);
  const [videoMuted, setVideoMuted] = useState<boolean>(true);
  const video = useRef<HTMLVideoElement>(null);

  console.log(videoPlayed);

  return (
    <div className="relative flex items-center justify-center">
      {!videoPlayed && (
        <button
          className="absolute"
          onClick={() => {
            video.current?.play();
          }}
        >
          <PlayIcon size={40} />
        </button>
      )}
      <button
        className="absolute bottom-[20px] right-[20px] z-10"
        onClick={() => setVideoMuted(!videoMuted)}
      >
        {videoMuted ? <VolumeOff /> : <Volume2 />}
      </button>
      <video
        className={`w-full h-[520px] mb-[20px] flex-1 object-cover ${
          !videoPlayed ? "-z-10" : "cursor-pointer"
        }`}
        onClick={() => video.current?.pause()}
        ref={video}
        onPlay={() => setVideoPlayed(true)}
        onPause={() => setVideoPlayed(false)}
        muted={videoMuted}
        autoPlay
      >
        <source
          src={content.url}
          type={`video/${content.url.split(".").pop()}`}
        />
      </video>
    </div>
  );
};

export default VideoPlayer;
