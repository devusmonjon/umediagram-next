import { PlayIcon, Volume2, VolumeOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const VideoPlayer = ({ content, className, isActive }: { content: { url: string }, className?: string, isActive: boolean }) => {
  const [videoPlayed, setVideoPlayed] = useState<boolean>(false);
  const [videoMuted, setVideoMuted] = useState<boolean>(true);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isActive) {
      video.current?.play();
    } else {
      video.current?.pause();
    }
  }, [isActive]);

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {!videoPlayed && (
        <button title="play"
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
        className={`w-full h-[520px] mb-[20px] flex-1 object-cover ${!videoPlayed ? "-z-10" : "cursor-pointer"}`}
        onClick={() => video.current?.pause()}
        ref={video}
        onPlay={() => setVideoPlayed(true)}
        onPause={() => setVideoPlayed(false)}
        muted={videoMuted}
        autoPlay={isActive}
      >
        <source
          src={content.url.replace("files.moontv.uz", "proxy-tau-one.vercel.app")}
          type={`video/${content.url.split(".").pop()}`}
        />
      </video>
    </div>
  );
};

export default VideoPlayer;
