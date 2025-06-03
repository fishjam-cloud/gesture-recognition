import { InputStream, Rescaler, View } from "@swmansion/smelter";
import Animation from "./Animation";
import { useGesture } from "../../hooks/useGesture";
import { useEffect, useState } from "react";

export type VideoWithEffectsProps = {
  stream: MediaStream;
  inputId: string;
  width: number;
};

const DURATION = 5000;

export default function VideoWithEffects({
  stream,
  inputId,
  width,
}: VideoWithEffectsProps) {
  const gesture = useGesture(stream);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (gesture === "TIMEOUT" && !running) {
      setRunning(true);
      setTimeout(() => setRunning(false), DURATION + 500);
    }
  }, [gesture, running]);

  return (
    <View>
      <Rescaler>
        <InputStream inputId={inputId} />
      </Rescaler>
      {running && <Animation width={width} duration={DURATION} />}
    </View>
  );
}
