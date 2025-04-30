import { FC, useEffect, useRef } from "react";

export type PeerTileProps = {
  stream: MediaStream | null;
  name: string;
};

export const PeerTile: FC<PeerTileProps> = ({ stream, name }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.srcObject = stream;
  }, [stream]);

  return (
    <div className="min-w-0 overflow-hidden grid place-content-center box-border border-2 rounded-xl">
      {stream ? (
        <div className="h-fit w-fit">
          <video
            className="z-10 rounded-xl"
            autoPlay
            muted
            playsInline
            ref={videoRef}
          />
        </div>
      ) : (
        <div className="m-auto text-center">{name}</div>
      )}
    </div>
  );
};
