import { useContext, useEffect, useState } from "react";
import { HandLandmarkContext } from "../contexts/HandLandmarkContext";
import { GestureDetector, HandGesture } from "../utils/GestureDetector";

export const useGesture = (video: HTMLVideoElement | null) => {
  const landmarker = useContext(HandLandmarkContext);
  const [detection, setDetection] = useState<HandGesture>("NONE");

  useEffect(() => {
    console.log("useEffect!");
    if (!video || !landmarker) return;
    const detector = new GestureDetector(landmarker, video, setDetection);
    console.log("set detector!");
    video.addEventListener("loadeddata", detector.detect);
  }, [landmarker, video]);

  return detection;
};
