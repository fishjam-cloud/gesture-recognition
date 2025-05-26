import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { SmelterProvider } from "./components/SmelterProvider.tsx";
import { FishjamProvider } from "@fishjam-cloud/react-client";
import { setWasmBundleUrl } from "@swmansion/smelter-web-wasm";
import { BrowserRouter, Route, Routes } from "react-router";
import { Navigate } from "react-router";

setWasmBundleUrl("/assets/smelter.wasm");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FishjamProvider>
      <SmelterProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/room/:room" element={<App />} />
            <Route
              path="/*"
              element={<Navigate replace to={`/room/${crypto.randomUUID()}`} />}
            />
          </Routes>
        </BrowserRouter>
      </SmelterProvider>
    </FishjamProvider>
  </StrictMode>,
);
