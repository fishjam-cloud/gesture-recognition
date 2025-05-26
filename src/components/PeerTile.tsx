import { FC, useEffect, useRef } from "react";
import HelpTooltip from "./HelpTooltip";

export type PeerTileProps = {
  stream: MediaStream | null;
  name: string;
  showHelp?: boolean;
};

export const PeerTile: FC<PeerTileProps> = ({ stream, name, showHelp }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.srcObject = stream;
  }, [stream]);

  return (
    <div className="min-w-0 overflow-hidden grid place-content-center box-border border-2 rounded-xl">
      {stream ? (
        <div className="relative w-fit h-fit overflow-hidden">
          <video
            className="rounded-xl"
            autoPlay
            muted
            playsInline
            ref={videoRef}
          />
          {showHelp && <HelpTooltip />}
        </div>
      ) : (
        <div className="m-auto text-center">{name}</div>
      )}
    </div>
  );
};
