import { FC } from "react";
import fishjam from "../assets/fishjam.svg";
import smelter from "../assets/smelter.svg";
import mediapipe from "../assets/mediapipe.svg";
import github from "../assets/github.svg";
import { Link } from "react-router";

const Footer: FC = () => {
  return (
    <div className="flex flex-col md:flex-row w-full md:w-2/3 gap-4 md:pb-10 items-center md:items-end justify-between">
      <div className="flex gap-4 h-10 items-center">
        <p className="text-sm sm:text-base lg:text-lg shrink-0">
          Make sure to check out:
        </p>
        <Link to="https://fishjam.io" target="_blank">
          <img src={fishjam} className="h-8" />
        </Link>
        <Link to="https://smelter.dev" target="_blank">
          <img src={smelter} className="h-6" />
        </Link>
        <Link to="https://ai.google.dev/edge/mediapipe" target="_blank">
          <img src={mediapipe} className="h-8" />
        </Link>
      </div>
      <div className="flex gap-4 h-10 items-center">
        <p className="text-sm sm:text-base lg:text-lg shrink-0">Source code:</p>
        <Link
          to="https://github.com/fishjam-cloud/gesture-recognition"
          target="_blank"
        >
          <img src={github} className="h-8" />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
