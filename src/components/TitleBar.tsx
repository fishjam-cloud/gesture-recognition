import { FC } from "react";
import handImg from "../assets/hands.svg";
import fishjam from "../assets/fishjam.svg";
import smelter from "../assets/smelter.svg";
import mediapipe from "../assets/mediapipe.png";
import { Separator } from "./ui/separator";
import { Link } from "react-router";

const TitleBar: FC = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 py-2 lg:h-24 w-full lg:w-auto justify-between mx-auto items-center">
      <span className="grow flex min-h-0 h-12 gap-6 self-start lg:self-center items-center">
        <Link to="https://fishjam.io" target="_blank">
          <img src={fishjam} className="h-10" />
        </Link>
        <Link to="https://smelter.dev" target="_blank">
          <img src={smelter} className="h-6" />
        </Link>
        <Link to="https://ai.google.dev/edge/mediapipe" target="_blank">
          <img src={mediapipe} className="h-12 object-contain" />
        </Link>
      </span>
      <Separator orientation="vertical" className="hidden lg:inline" />
      <Separator orientation="horizontal" className="inline lg:hidden" />
      <div className="flex justify-between items-center">
        <p className="text-sm text-center sm:text-base lg:text-lg">
          Try out gesture recognition by making the following hand gesture:
        </p>
        <img
          className="size-16"
          src={handImg}
          aria-placeholder="hand-timeout-pose"
        />
      </div>
      <Separator orientation="vertical" className="hidden lg:inline" />
      <Separator orientation="horizontal" className="inline lg:hidden" />
      <p className="text-sm text-center sm:text-base lg:text-lg">
        Share the{" "}
        <Link target="_blank" to="" className="text-blue-800 hover:underline">
          URL
        </Link>{" "}
        with someone to invite them to join!
      </p>
      <Separator orientation="horizontal" className="inline lg:hidden" />
    </div>
  );
};

export default TitleBar;
