import { InputStream, Rescaler, View } from "@swmansion/smelter";
import TimerAnimation from "./TimerAnimation";
import { useGesture } from "../../hooks/useGesture";
import { useEffect, useState } from "react";

export type VideoWithEffectsProps = {
  stream: MediaStream;
  inputId: string;
  width: number;
  height: number;
};

const DURATION = 3000;

export default function VideoWithEffects({
  stream,
  inputId,
  width,
  height,
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
      <View style={{ width, height, left: 0, top: 0 }}>
        {running && (
          <TimerAnimation width={width} height={height} duration={DURATION} />
        )}
      </View>
    </View>
  );
}
