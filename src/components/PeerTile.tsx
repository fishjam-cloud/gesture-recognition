import { Loader2 } from "lucide-react";
import { FC, useEffect, useRef } from "react";

export type PeerTileProps = {
  stream?: MediaStream | null;
  name: string;
  showHelp?: boolean;
};

export const PeerTile: FC<PeerTileProps> = ({ stream, name }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.srcObject = stream ?? null;
  }, [stream]);

  return (
    <div className="relative overflow-hidden rounded-xl">
      {stream ? (
        <video
          className="absolute top-1/2 left-1/2 w-full -translate-1/2 rounded-xl object-contain"
          autoPlay
          muted
          playsInline
          ref={videoRef}
        ></video>
      ) : (
        <div className="absolute top-1/2 left-1/2 flex -translate-1/2 gap-2 text-center">
          <Loader2 className="animate-spin" />
          {name}
        </div>
      )}
    </div>
  );
};
