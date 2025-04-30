let landmarker;

const init = async () => {
  const { FilesetResolver, HandLandmarker } = await import(
    "@mediapipe/tasks-vision"
  );
  const vision = await FilesetResolver.forVisionTasks("/assets/mediapipe-wasm");

  landmarker = await HandLandmarker.createFromOptions(vision, {
    baseOptions: { modelAssetPath: "/hand_landmark.task" },
    runningMode: "VIDEO",
    numHands: 2,
    minHandDetectionConfidence: 0.03,
    minHandPresenceConfidence: 0.3,
    minTrackingConfidence: 0.3,
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
      return processFrame(data.frame);
    default:
      console.error(`Unknown message type ${data.type}`);
  }
};

const processFrame = (frame) => {
  const detections = landmarker?.detectForVideo(frame, frame.timestamp);
  frame.close();
  postMessage(detections?.landmarks ?? []);
};
