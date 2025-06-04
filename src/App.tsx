import { useConnection } from "@fishjam-cloud/react-client";
import RoomView from "./views/RoomView";
import { useParams } from "react-router";
import { useEffect, useMemo } from "react";
import useRoomCredentials from "./hooks/useRoomCredentials";
import TitleBar from "./components/TitleBar";
import Footer from "./components/Footer";
import { Separator } from "./components/ui/separator";

function App() {
  const { joinRoom } = useConnection();
  const { room } = useParams();
  const peer = useMemo(() => crypto.randomUUID(), []);
  const creds = useRoomCredentials(room, peer);

  useEffect(() => {
    if (!creds) return;
    joinRoom({ ...creds, peerMetadata: { name: peer } });
  }, [joinRoom, creds, peer]);

  return (
    <main className="flex flex-col items-center px-4 pb-4 gap-4 xl:px-16 h-screen w-screen bg-background">
      <TitleBar />
      <RoomView />
      <Separator orientation="horizontal" />
      <Footer />
    </main>
  );
}

export default App;
