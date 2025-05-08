import { useEffect, useState } from "react";
import { GestureDetector, HandGesture } from "../utils/GestureDetector";

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
