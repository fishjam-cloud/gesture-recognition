import {
  useCamera,
  useCustomSource,
  usePeers,
} from "@fishjam-cloud/react-client";
import { PeerTile } from "../components/PeerTile";
import { useGestureEffects } from "../hooks/useGestureEffects";
import { useEffect } from "react";

export default function RoomView() {
  const { toggleCamera, cameraStream, isCameraOn } = useCamera();
  const effectStream = useGestureEffects({ stream: cameraStream });
  const { setStream, stream } = useCustomSource("custom-camera");
  const { remotePeers } = usePeers<{ name: string }>();

  const peerCount = remotePeers.length + 1;
  const cols = Math.ceil(Math.sqrt(peerCount));

  if (!isCameraOn) toggleCamera();

  useEffect(() => {
    setStream(effectStream);
  }, [effectStream, setStream]);

  return (
    <section
      className={`h-full w-full grid grid-flow-row gap-4 p-4`}
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      <PeerTile name="You" stream={stream ?? null} showHelp />
      {remotePeers.map((peer) => (
        <PeerTile
          name={peer.metadata?.peer?.name ?? peer.id}
          key={peer.id}
          stream={peer.customVideoTracks[0]?.stream}
        />
      ))}
    </section>
  );
}
