import "./App.css";
import { useCamera } from "@fishjam-cloud/react-client";
import { PeerTile } from "./components/PeerTile";

function App() {
  const { toggleCamera, cameraStream } = useCamera();

  return (
    <>
      <button onClick={toggleCamera}>Toggle camera</button>
      {cameraStream && <PeerTile stream={cameraStream} />}
    </>
  );
}

export default App;
