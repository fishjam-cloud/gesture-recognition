import { useEffect, useState } from "react";
import { GestureDetector } from "../utils/GestureDetector";
import { HandGesture } from "../utils/Gesture";

export const useGesture = (track: MediaStreamTrack) => {
  const [gesture, setGesture] = useState<HandGesture>("NONE");

  useEffect(() => {
    if (!track) return;
    const detector = new GestureDetector(track, setGesture);

    return () => {
      detector.close();
      setGesture("NONE");
    };
  }, [track]);

  return gesture;
};
