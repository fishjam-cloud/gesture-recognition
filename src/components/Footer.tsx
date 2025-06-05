import { FC } from "react";
import fishjam from "../assets/fishjam.svg";
import smelter from "../assets/smelter.svg";
import mediapipe from "../assets/mediapipe.svg";
import github from "../assets/github.svg";
import { Link } from "react-router";
import { Button } from "./ui/button";

type LinkButtonProps = {
  to: string;
  img: string;
  text: string;
  swapped?: boolean;
};

const LinkButton: FC<LinkButtonProps> = ({ to, img, text, swapped }) => {
  const image = <img src={img} className="hidden size-6 sm:block" />;
  return (
    <Link to={to} target="_blank">
      <Button variant="outline" size="responsive">
        {swapped ? (
          <>
            {text} {image}
          </>
        ) : (
          <>
            {image} {text}
          </>
        )}
      </Button>
    </Link>
  );
};

const Footer: FC = () => {
  return (
    <div className="flex w-full flex-col items-center justify-between gap-4 md:flex-row">
      <div className="flex items-center gap-4">
        <p className="shrink-0 text-sm sm:text-base lg:text-lg">Created with</p>
        <LinkButton to="https://fishjam.io" img={fishjam} text="Fishjam" />
        <LinkButton to="https://smelter.dev" img={smelter} text="Smelter" />
        <LinkButton
          to="https://ai.google.dev/edge/mediapipe"
          img={mediapipe}
          text="MediaPipe"
        />
      </div>
      <LinkButton
        to="https://github.com/fishjam-cloud/gesture-recognition"
        img={github}
        text="Source code"
        swapped
      />
    </div>
  );
};

export default Footer;
