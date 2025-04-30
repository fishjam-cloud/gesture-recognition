import { createContext } from "react";
import { HandLandmarker } from "@mediapipe/tasks-vision";

export const HandLandmarkContext = createContext<HandLandmarker | null>(null);
