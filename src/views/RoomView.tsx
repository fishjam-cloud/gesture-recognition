import {
  useCamera,
  useCustomSource,
  usePeers,
} from "@fishjam-cloud/react-client";
import { PeerTile } from "../components/PeerTile";
import { useGestureEffects } from "../hooks/useGestureEffects";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function RoomView() {
  const { toggleCamera, cameraStream } = useCamera();
  const effectStream = useGestureEffects({ stream: cameraStream });
  const { setStream, stream } = useCustomSource("custom-camera");
  const { remotePeers } = usePeers<{ name: string }>();

  const peerCount = remotePeers.length + 1;
  const cols = Math.ceil(Math.sqrt(peerCount));
  const rows = Math.ceil(peerCount / cols);

  useEffect(() => {
    setStream(effectStream);
  }, [effectStream, setStream]);

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <section className="flex-1 min-w-0 min-h-0">
        <div
          className={`grid grid-cols-${cols} grid-rows-${rows} h-full w-full grid-flow-row gap-4 p-4`}
        >
          {<PeerTile name="You" stream={stream ?? null} />}
          {remotePeers.map((peer) => {
            return (
              <PeerTile
                name={peer.metadata?.peer?.name ?? peer.id}
                key={peer.id}
                stream={peer.customVideoTracks[0]?.stream}
              />
            );
          })}
        </div>
      </section>
      <footer className="flex justify-center items-center h-24">
        <Button onClick={toggleCamera}>Toggle camera</Button>
      </footer>
    </div>
  );
}
