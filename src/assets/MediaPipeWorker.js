let landmarker;

const promise = import("@mediapipe/tasks-vision").then((vision) =>
  setupLandmarker(vision),
);

const setupLandmarker = async ({ FilesetResolver, HandLandmarker }) => {
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm",
  );

  landmarker = await HandLandmarker.createFromOptions(vision, {
    baseOptions: { modelAssetPath: "/hand_landmark.task" },
    runningMode: "IMAGE",
    numHands: 2,
  });
};

self.onclose = () => {
  promise.finally(() => landmarker?.close());
};

self.onmessage = async ({ data: frame }) => {
  await promise;
  run(frame);
};

const run = (frame) => {
  const detections = landmarker.detect(frame);
  frame.close();
  postMessage(detections.landmarks);
};
