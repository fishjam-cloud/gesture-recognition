import { Loader2 } from "lucide-react";
import { FC, useEffect, useRef } from "react";

export type PeerTileProps = {
  stream: MediaStream | null;
  name: string;
  showHelp?: boolean;
};

export const PeerTile: FC<PeerTileProps> = ({ stream, name }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.srcObject = stream;
  }, [stream]);

  return (
    <div className="relative overflow-hidden rounded-xl">
      {stream ? (
        <video
          className="absolute left-1/2 top-1/2 -translate-1/2 rounded-xl w-full object-contain"
          autoPlay
          muted
          playsInline
          ref={videoRef}
        ></video>
      ) : (
        <div className="absolute flex gap-2 left-1/2 top-1/2 -translate-1/2 text-center">
          <Loader2 className="animate-spin" />
          {name}
        </div>
      )}
    </div>
  );
};
