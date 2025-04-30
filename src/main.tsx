import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { SmelterProvider } from "./components/SmelterProvider.tsx";
import { FishjamProvider } from "@fishjam-cloud/react-client";
import { setWasmBundleUrl } from "@swmansion/smelter-web-wasm";
import { HandLandmarkProvider } from "./components/HandLandmarkProvider.tsx";

setWasmBundleUrl("/assets/smelter.wasm");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FishjamProvider>
      <SmelterProvider>
        <HandLandmarkProvider>
          <App />
        </HandLandmarkProvider>
      </SmelterProvider>
    </FishjamProvider>
  </StrictMode>,
);
