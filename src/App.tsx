import "./App.css";
import { useCamera } from "@fishjam-cloud/react-client";
import { AnimatedVideoPlayer } from "./components/AnimatedVideoPlayer";

function App() {
  const { toggleCamera, cameraStream } = useCamera();

  return (
    <>
      <button onClick={toggleCamera}>Toggle camera</button>
      {cameraStream && <AnimatedVideoPlayer stream={cameraStream} />}
    </>
  );
}

export default App;
