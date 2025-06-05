import { FC, PropsWithChildren } from "react";
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
  const image = <img src={img} className="hidden sm:block size-6" />;
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
    <div className="flex flex-col md:flex-row w-full gap-4 items-center justify-between">
      <div className="flex gap-4 items-center">
        <p className="text-sm sm:text-base lg:text-lg shrink-0">Created with</p>
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
