import { useConnection } from "@fishjam-cloud/react-client";
import RoomView from "./views/RoomView";
import { useParams } from "react-router";
import { useEffect, useMemo } from "react";
import useRoomCredentials from "./hooks/useRoomCredentials";

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
    <main className="flex h-screen w-screen bg-stone-100">{<RoomView />}</main>
  );
}

export default App;
