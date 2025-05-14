import { useEffect, useMemo, useState } from "react";
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
  const [inputId, setInputId] = useState<string>();
  const { width, height } = useMemo(() => {
    const settings = stream?.getVideoTracks()[0].getSettings();
    return {
      width: settings?.width,
      height: settings?.height,
    };
  }, [stream]);

  useEffect(() => {
    if (!smelter || !stream) return;

    let cancel = false;
    const id = getNewId();

    const promise = (async () => {
      await smelter.registerInput(id, {
        type: "stream",
        stream: stream.clone(),
      });
      if (!cancel) setInputId(id);
    })();

    return () => {
      cancel = true;
      promise.finally(() => {
        smelter.unregisterInput(id);
      });
    };
  }, [stream, smelter]);

  useEffect(() => {
    if (!smelter || !stream || !inputId) return;
    const id = getNewId();
    let cancel = false;

    const promise = (async () => {
      const { stream: output } = await smelter.registerOutput(
        id,
        <VideoWithEffects
          stream={stream}
          inputId={inputId}
          width={width!}
          height={height!}
        />,
        {
          type: "stream",
          video: { resolution: { width: width!, height: height! } },
        },
      );
      if (output && !cancel) setOutputStream(output);
    })();

    return () => {
      cancel = true;
      setOutputStream(null);
      promise.finally(() => {
        smelter.unregisterOutput(id);
      });
    };
  }, [stream, smelter, width, height, inputId]);

  return outputStream;
};
