import { useCallback, useContext, useEffect, useRef, useState } from "react";
import "./App.css";
import { useCamera } from "@fishjam-cloud/react-client";
import { useGesture } from "./hooks/useGesture";
import { GestureDetector, HandGesture } from "./utils/GestureDetector";
import { HandLandmarkContext } from "./contexts/HandLandmarkContext";

function App() {
  const { toggleCamera, cameraStream, isCameraOn } = useCamera();
  // const gesture = useGesture(video);
  const landmarker = useContext(HandLandmarkContext);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [gesture, setGesture] = useState<HandGesture>("NONE");

  useEffect(() => {
    if (!landmarker || !videoRef.current) return;
    const video = videoRef.current;
    video.srcObject = cameraStream;

    const detector = new GestureDetector(
      landmarker,
      videoRef.current,
      setGesture,
    );

    detector.detect();
  }, [cameraStream, landmarker]);

  // const videoRefCallback = useCallback(
  //   (videoRef: HTMLVideoElement | null) => {
  //     if (videoRef) videoRef.srcObject = cameraStream;
  //     setVideo(videoRef);
  //   },
  //   [cameraStream],
  // );

  return (
    <>
      <button onClick={() => toggleCamera()}>Toggle camera</button>
      {isCameraOn && <video autoPlay playsInline muted ref={videoRef} />}
      <p>Current gesture: {gesture}</p>
    </>
  );
}

export default App;
