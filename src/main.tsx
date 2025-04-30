import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { SmelterProvider } from "./components/SmelterProvider.tsx";
import { FishjamProvider } from "@fishjam-cloud/react-client";
import { setWasmBundleUrl } from "@swmansion/smelter-web-wasm";

setWasmBundleUrl("/assets/smelter.wasm");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FishjamProvider>
      <SmelterProvider>
        <App />
      </SmelterProvider>
    </FishjamProvider>
  </StrictMode>,
);
