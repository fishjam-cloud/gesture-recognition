import { useConnection, useSandbox } from "@fishjam-cloud/react-client";
import RoomView from "./views/RoomView";
import { useParams } from "react-router";
import { useEffect, useMemo } from "react";
import TitleBar from "./components/TitleBar";
import Footer from "./components/Footer";
import { Toaster } from "./components/ui/sonner";

function App() {
  const { joinRoom } = useConnection();
  const { room } = useParams();
  const peer = useMemo(() => crypto.randomUUID(), []);
  const { getSandboxPeerToken } = useSandbox();

  useEffect(() => {
    if (!room) return;
    getSandboxPeerToken(room, peer).then((peerToken) => joinRoom({ peerToken, peerMetadata: { name: peer } }))
  }, [joinRoom, getSandboxPeerToken, room, peer]);

  return (
    <>
      <main className="flex h-screen w-screen flex-col items-center gap-8 px-4 pt-4 pb-4 md:px-6 md:pt-8 md:pb-16 xl:px-20">
        <TitleBar />
        <RoomView />
        <Footer />
      </main>
      <Toaster />
    </>
  );
}

export default App;
