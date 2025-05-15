import {
  TrackMiddleware,
  useCamera,
  usePeers,
} from "@fishjam-cloud/react-client";
import { PeerTile } from "@/components/PeerTile";
import { useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import GestureMiddleware from "@/utils/GestureMiddleware";

export default function RoomView() {
  const { toggleCamera, setCameraTrackMiddleware, cameraStream } = useCamera();
  const { remotePeers } = usePeers<{ name: string }>();

  const peerCount = remotePeers.length + 1;
  const cols = Math.ceil(Math.sqrt(peerCount));
  const rows = Math.ceil(peerCount / cols);

  const trackMiddleware: TrackMiddleware = useCallback(
    (track: MediaStreamTrack) => {
      const middleware = new GestureMiddleware(track);
      return {
        track: middleware.track,
        onClear: () => middleware.close(),
      };
    },
    [],
  );

  useEffect(() => {
    setCameraTrackMiddleware(trackMiddleware);
  }, [setCameraTrackMiddleware, trackMiddleware]);

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <section className="flex-1 min-w-0 min-h-0">
        <div
          className={`grid grid-cols-${cols} grid-rows-${rows} h-full w-full grid-flow-row gap-4 p-4`}
        >
          {<PeerTile name="You" stream={cameraStream} />}
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
