import { Image, Rescaler, View } from "@swmansion/smelter";
import { useEffect, useMemo, useState } from "react";

export type TimerAnimationProps = {
  duration: number;
  width: number;
  height: number;
};

export default function TimerAnimation({
  duration,
  width,
  height,
}: TimerAnimationProps) {
  const [done, setDone] = useState(false);
  const right = done ? -width : width;
  const rotation = done ? -1440 : 0;

  const sz = useMemo(() => Math.min(width, height), [width, height]);

  useEffect(() => {
    setTimeout(() => setDone(true), 100);
  }, []);

  return (
    <View style={{ width, height, top: 0, left: 0 }}>
      <Rescaler
        style={{ bottom: 0, right, width: sz, height: sz, rotation }}
        transition={{ durationMs: duration }}
      >
        <Image imageId="timer" />
      </Rescaler>
    </View>
  );
}
