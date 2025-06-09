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
      className={`align-center grid w-full flex-1 grid-flow-row grid-cols-1 justify-center md:grid-cols-${cols} gap-4 lg:gap-8`}
    >
      <PeerTile name="You" stream={stream ?? cameraStream} showHelp />
      {remotePeers.map((peer) => (
        <PeerTile
          name={peer.metadata?.peer?.name ?? peer.id}
          key={peer.id}
          stream={peer.customVideoTracks[0]?.stream ?? peer.cameraTrack?.stream}
        />
      ))}
    </section>
  );
}
