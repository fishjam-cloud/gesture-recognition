import { useEffect, useState } from "react";
import { GestureDetector, HandGesture } from "../utils/GestureDetector";
import { useHandLandmarker } from "./useHandLandmarker";

export const useGesture = (video: HTMLVideoElement | null) => {
  const landmarker = useHandLandmarker(video);
  const [gesture, setGesture] = useState<HandGesture>("NONE");

  useEffect(() => {
    if (!video || !landmarker) return;
    const detector = new GestureDetector(landmarker, video, setGesture);

    return () => {
      detector.close();
      setGesture("NONE");
    };
  }, [landmarker, video]);

  return gesture;
};
