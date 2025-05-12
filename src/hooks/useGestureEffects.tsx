import { useEffect, useMemo, useRef, useState } from "react";
import { useSmelter } from "../hooks/useSmelter";
import VideoWithEffects from "../components/smelter/VideoWithEffects";

export type GestureEffects = {
  stream: MediaStream | null;
};

const getNewId = (() => {
  let x = 1;
  return () => `stream-${x++}`;
})();

export const useGestureEffects = ({ stream }: GestureEffects) => {
  const smelter = useSmelter();
  const [outputStream, setOutputStream] = useState<MediaStream | null>(null);
  const inputIdRef = useRef<string>("");
  const { width, height } = useMemo(() => {
    const settings = stream?.getVideoTracks()[0].getSettings();
    return {
      width: settings!.width!,
      height: settings!.height!,
    };
  }, [stream]);

  useEffect(() => {
    if (!smelter || !stream) return;
    if (inputIdRef.current) smelter.unregisterInput(inputIdRef.current);

    const id = getNewId();
    inputIdRef.current = id;

    (async () => {
      await smelter.registerInput(id, {
        type: "stream",
        stream: stream.clone(),
      });
    })();
  }, [stream, smelter]);

  useEffect(() => {
    if (!smelter || !stream) return;
    const id = getNewId();
    let cancel = false;

    const promise = (async () => {
      const { stream: output } = await smelter.registerOutput(
        id,
        <VideoWithEffects
          stream={stream}
          inputId={inputIdRef.current}
          width={width}
          height={height}
        />,
        {
          type: "stream",
          video: { resolution: { width, height } },
        },
      );
      if (output && !cancel) setOutputStream(output);
    })();

    return () => {
      cancel = true;
      setOutputStream(null);
      promise.then(() => smelter.unregisterOutput(id));
    };
  }, [stream, smelter, width, height]);

  return outputStream;
};
