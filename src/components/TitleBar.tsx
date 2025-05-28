import { FC } from "react";
import handImg from "../assets/hands.svg";
import logo from "../assets/logo.svg";
import { Separator } from "./ui/separator";
import { Link } from "react-router";

const TitleBar: FC = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 py-2 md:h-24 w-full md:w-auto justify-between mx-auto items-center">
      <Link to="https://fishjam.io" className="self-start md:self-center">
        <img src={logo} className="h-12 min-h-0 w-auto" />
      </Link>
      <Separator orientation="vertical" className="hidden md:inline" />
      <Separator orientation="horizontal" className="inline md:hidden" />
      <div className="flex justify-between items-center">
        <p className="text-sm text-center sm:text-base md:text-lg">
          Try out gesture recognition by making the following hand gesture:
        </p>
        <img
          className="size-16"
          src={handImg}
          aria-placeholder="hand-timeout-pose"
        />
      </div>
      <Separator orientation="vertical" className="hidden md:inline" />
      <Separator orientation="horizontal" className="inline md:hidden" />
      <p className="text-sm text-center sm:text-base md:text-lg">
        Share the{" "}
        <Link target="_blank" to="" className="text-blue-800 hover:underline">
          URL
        </Link>{" "}
        with someone to invite them to join!
      </p>
      <Separator orientation="horizontal" className="inline md:hidden" />
    </div>
  );
};

export default TitleBar;
