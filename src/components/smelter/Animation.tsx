import { Image, Rescaler, View } from "@swmansion/smelter";
import { useEffect, useMemo, useState } from "react";
import timeoutText from "../../assets/timeout.gif";

const timeoutTextUrl = new URL(timeoutText, import.meta.url).href;

export type AnimationProps = {
  duration: number;
  width: number;
};

type AnimationState = "before" | "pause" | "after";

const START_DELAY = 100;

export default function Animation({ duration, width }: AnimationProps) {
  const [animationState, setAnimationState] =
    useState<AnimationState>("before");

  const durationMs = (duration - START_DELAY) / 3;

  const right = useMemo(() => {
    switch (animationState) {
      case "before":
        return width;
      case "pause":
        return 0;
      default:
        return -2 * width;
    }
  }, [animationState, width]);

  const rotation = useMemo(() => {
    switch (animationState) {
      case "before":
        return 90;
      case "pause":
        return 0;
      default:
        return -90;
    }
  }, [animationState]);

  useEffect(() => {
    setTimeout(() => {
      setAnimationState("pause");
      setTimeout(() => setAnimationState("after"), 2 * durationMs);
    }, START_DELAY);
  }, [durationMs]);

  return (
    <View style={{ top: 0, left: 0 }}>
      <Rescaler
        style={{ bottom: 0, right, rotation }}
        transition={{ durationMs, easingFunction: "bounce" }}
      >
        <Image source={timeoutTextUrl} />
      </Rescaler>
    </View>
  );
}
