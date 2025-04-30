import { FC, PropsWithChildren, useEffect, useState } from "react";
import { SmelterContext } from "../contexts/SmelterContext";
import Smelter from "@swmansion/smelter-web-wasm";

export const SmelterProvider: FC<PropsWithChildren> = ({ children }) => {
  const [smelter, setSmelter] = useState<Smelter | null>(null);

  useEffect(() => {
    const smelter = new Smelter();

    let cancel = false;
    const promise = (async () => {
      await smelter.init();
      await smelter.start();
      if (!cancel) {
        setSmelter(smelter);
      }
    })();

    return () => {
      cancel = true;
      (async () => {
        await promise.catch(() => { });
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
