import Smelter from "@swmansion/smelter-web-wasm";
import { createContext } from "react";

export const SmelterContext = createContext<Smelter | null>(null);
