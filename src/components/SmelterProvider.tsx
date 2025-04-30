import { FC, PropsWithChildren, useEffect, useState } from "react";
import { SmelterContext } from "../contexts/SmelterContext";
import Smelter from "@swmansion/smelter-web-wasm";
import timer from "../assets/timer.svg";

const timerUrl = new URL(timer, import.meta.url).href;

export const SmelterProvider: FC<PropsWithChildren> = ({ children }) => {
  const [smelter, setSmelter] = useState<Smelter | null>(null);

  useEffect(() => {
    const smelter = new Smelter();

    let cancel = false;
    const promise = (async () => {
      await smelter.init();

      await smelter.registerImage("timer", {
        assetType: "svg",
        url: timerUrl,
        resolution: { width: 1920, height: 1080 },
      } as unknown as { assetType: "svg"; url: string });

      await smelter.start();
      if (!cancel) {
        setSmelter(smelter);
      }
    })();

    return () => {
      cancel = true;
      (async () => {
        await promise.catch(() => {});
        await smelter.terminate();
      })();
    };
  }, []);

  return (
    <SmelterContext.Provider value={smelter}>
      {children}
    </SmelterContext.Provider>
  );
};
