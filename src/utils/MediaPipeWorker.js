let landmarker;

const init = async () => {
  const { FilesetResolver, HandLandmarker } = await import(
    "@mediapipe/tasks-vision"
  );
  const vision = await FilesetResolver.forVisionTasks("/assets/wasm");

  landmarker = await HandLandmarker.createFromOptions(vision, {
    baseOptions: { modelAssetPath: "/hand_landmark.task" },
    runningMode: "VIDEO",
    numHands: 2,
    minHandDetectionConfidence: 0.4,
    minHandPresenceConfidence: 0.4,
    minTrackingConfidence: 0.4,
  });
};

const promise = init();

const cleanup = () => {
  promise?.finally(() => {
    landmarker?.close();
    self.close();
  });
};

self.onmessage = ({ data }) => {
  switch (data.type) {
    case "close":
      return cleanup();
    case "frame":
      return processFrame(data.frame, data.ts);
    default:
      console.error(`Unknown message type ${data.type}`);
  }
};

const processFrame = (frame, ts) => {
  const detections = landmarker?.detectForVideo(frame, ts);
  frame.close();
  postMessage(detections?.landmarks ?? []);
};
