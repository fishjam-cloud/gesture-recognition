import { FC, useEffect, useRef } from "react";
import { useGestureEffects } from "../hooks/useGestureEffects";

export type PeerTileProps = {
  stream: MediaStream;
};

export const PeerTile: FC<PeerTileProps> = ({ stream }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const effectStream = useGestureEffects({ stream });

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.srcObject = effectStream;
  }, [effectStream]);

  return <video autoPlay muted playsInline ref={videoRef} />;
};
