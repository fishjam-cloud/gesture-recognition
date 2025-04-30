import { useConnection } from "@fishjam-cloud/react-client";
import RoomView from "./views/RoomView";
import HomeView from "./views/HomeView";

function App() {
  const { peerStatus } = useConnection();
  const isConnected = peerStatus === "connected";

  return (
    <main className="flex h-screen w-screen bg-stone-100">
      {isConnected ? <RoomView /> : <HomeView />}
    </main>
  );
}

export default App;
