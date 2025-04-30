import { FC, useCallback, useEffect, useRef, useState } from "react";
import { useGesture } from "../hooks/useGesture";

type AnimatedVideoPlayerProps = {
  muted?: boolean;
  stream: MediaStream;
};

export const AnimatedVideoPlayer: FC<AnimatedVideoPlayerProps> = ({
  muted,
  stream,
}) => {
  const [video, setVideo] = useState<HTMLVideoElement | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const gesture = useGesture(video);

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.srcObject = stream;
  }, [stream]);

  const videoRefCallback = useCallback((ref: HTMLVideoElement | null) => {
    videoRef.current = ref;
    setVideo(ref);
  }, []);

  return (
    <>
      <video autoPlay playsInline muted={muted} ref={videoRefCallback} />
      <p>Current gesture: {gesture}</p>
    </>
  );
};
