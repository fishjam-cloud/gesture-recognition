import { Image, Rescaler, View } from "@swmansion/smelter";
import { useEffect, useState } from "react";

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
  const bottom = done ? 30 : height;
  const right = done ? 0 : width;

  useEffect(() => {
    setTimeout(() => setDone(true), 100)
  }, []);

  return (
    <View
      style={{ width, height: height / 3, bottom, left: 0 }}
      transition={{ durationMs: 0.5 * duration, easingFunction: "bounce" }}
    >
      <Rescaler
        style={{ bottom: 0, right, width: width / 3, height: height / 3 }}
        transition={{ durationMs: duration }}
      >
        <Image imageId="timer" />
      </Rescaler>
    </View>
  );
}
