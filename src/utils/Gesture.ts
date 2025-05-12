import { NormalizedLandmark } from "@mediapipe/tasks-vision";

export type HandGesture = "NONE" | "TIMEOUT";

export type GestureCallback = (gesture: HandGesture) => void;

class Vector {
  x: number;
  y: number;

  constructor(x: number, y: number, normalize: boolean = true) {
    this.x = x;
    this.y = y;
    if (normalize) this.normalize();
  }

  normalize() {
    const denom = Math.hypot(this.x, this.y);
    this.x /= denom;
    this.y /= denom;
  }

  static deviation(k: Vector, l: Vector) {
    return Math.abs(k.x * l.y - k.y * l.x);
  }

  static through(p: NormalizedLandmark, q: NormalizedLandmark) {
    return new Vector(p.y - q.y, q.x - p.x);
  }

  static average(vectors: Vector[]) {
    const sum = vectors.reduce(
      (acc, vec) => new Vector(acc.x + vec.x, acc.y + vec.y, false),
    );
    sum.normalize();
    return sum;
  }

  static meanDeviation(center: Vector, vectors: Vector[]) {
    return (
      vectors
        .map((vec) => Vector.deviation(center, vec))
        .reduce((acc, det) => acc + det, 0) / vectors.length
    );
  }
}

const INDEX_FINGER = [5, 6, 7, 8];
const MIDDLE_FINGER = [9, 10, 11, 12];
const RING_FINGER = [13, 14, 15, 16];
const PINKY = [17, 18, 19, 20];

const MIDDLE_FINGER_TIP = 12;
const MIDDLE_FINGER_BASE = 9;
const MIDDLE_FINGER_JOINT = 10;

const JOINT_DEVIATION = 0.4;
const FINGER_DEVIATION = 0.1;
const HAND_DEVIATION = 0.75;
const HAND_DISTANCE = 1;

const FINGERS = [INDEX_FINGER, MIDDLE_FINGER, RING_FINGER, PINKY];

const fingerDirection = (landmarks: NormalizedLandmark[]) => {
  const directions: Vector[] = [];
  for (let idx = 1; idx < landmarks.length; ++idx) {
    directions.push(Vector.through(landmarks[idx], landmarks[idx - 1]));
  }
  for (let idx = 1; idx < directions.length; ++idx) {
    const deviation = Vector.deviation(directions[idx], directions[idx - 1]);
    if (deviation > JOINT_DEVIATION) return null;
  }
  return Vector.average(directions);
};

const handDirection = (landmarks: NormalizedLandmark[]) => {
  const fingers = FINGERS.map((finger) => finger.map((idx) => landmarks[idx]));
  const fingerDirections = fingers.map(fingerDirection);
  if (!fingerDirections.every((line) => line !== null)) return null;

  const avg = Vector.average(fingerDirections);
  if (Vector.meanDeviation(avg, fingerDirections) > FINGER_DEVIATION)
    return null;
  return avg;
};

const distance = (lhs: NormalizedLandmark, rhs: NormalizedLandmark) =>
  Math.hypot(lhs.x - rhs.x, lhs.y - rhs.y);

const fingerInPalm = (lhs: NormalizedLandmark[], rhs: NormalizedLandmark[]) =>
  distance(lhs[MIDDLE_FINGER_TIP], rhs[MIDDLE_FINGER_BASE]) <
  distance(rhs[MIDDLE_FINGER_BASE], rhs[MIDDLE_FINGER_JOINT]) * HAND_DISTANCE;

const isTimeoutPose = (hands: NormalizedLandmark[][]): boolean => {
  if (hands.length !== 2) return false;
  const [d1, d2] = hands.map(handDirection);
  if (d1 === null || d2 === null) return false;
  const deviation = Vector.deviation(d1, d2);
  if (deviation < HAND_DEVIATION) return false;

  const [h1, h2] = hands;
  const ret = fingerInPalm(h1, h2) || fingerInPalm(h2, h1);
  return ret;
};

export const findGesture = (hands: NormalizedLandmark[][]): HandGesture => {
  if (isTimeoutPose(hands)) return "TIMEOUT";

  return "NONE";
};
