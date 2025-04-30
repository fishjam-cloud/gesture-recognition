import { FC, PropsWithChildren, useEffect, useState } from "react";
import { HandLandmarkContext } from "../contexts/HandLandmarkContext";
import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";

export const HandLandmarkProvider: FC<PropsWithChildren> = ({ children }) => {
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
    };
  }, []);

  return (
    <HandLandmarkContext.Provider value={landmarker}>
      {children}
    </HandLandmarkContext.Provider>
  );
};
