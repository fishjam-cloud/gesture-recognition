import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";
import { useEffect, useState } from "react";

export const useHandLandmarker = (video: HTMLVideoElement | null) => {
  const [landmarker, setLandmarker] = useState<HandLandmarker | null>(null);

  useEffect(() => {
    let cancel = false;

    const init = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm",
      );
      const landmarker = await HandLandmarker.createFromOptions(vision, {
        baseOptions: { modelAssetPath: "hand_landmark.task" },
        runningMode: "VIDEO",
        numHands: 2,
      });

      if (!cancel) setLandmarker(landmarker);
      return landmarker;
    };
    const promise = init();
    return () => {
      cancel = true;
      promise.then((landmarker) => landmarker.close());
      setLandmarker(null);
    };
  }, [video]);

  return landmarker;
};
