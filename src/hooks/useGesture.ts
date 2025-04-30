import { useEffect, useState } from "react";
import { GestureDetector } from "../utils/GestureDetector";
import { HandGesture } from "../utils/Gesture";

export const useGesture = (stream: MediaStream | null) => {
  const [gesture, setGesture] = useState<HandGesture>("NONE");

  useEffect(() => {
    if (!stream) return;
    const detector = new GestureDetector(stream, setGesture);

    return () => {
      detector.close();
      setGesture("NONE");
    };
  }, [stream]);

  return gesture;
};
