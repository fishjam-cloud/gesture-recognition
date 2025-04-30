import { useContext } from "react";
import { SmelterContext } from "../contexts/SmelterContext";

export const useSmelter = () => {
  const smelter = useContext(SmelterContext);
  return smelter;
}
