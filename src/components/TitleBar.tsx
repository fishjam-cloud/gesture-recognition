import { FC, useCallback } from "react";
import handImg from "../assets/hands.svg";
import { Check, Share2 } from "lucide-react";
import CopyButton from "./CopyButton";
import { toast } from "./ui/sonner";

const TitleBar: FC = () => {
  const onCopy = useCallback(() => {
    toast("URL Copied", Check);
  }, []);

  return (
    <div className="flex flex-col gap-2 md:flex-row w-full justify-between items-center">
      <div className="flex gap-4 justify-between items-center">
        <img
          className="size-18"
          src={handImg}
          aria-placeholder="hand-timeout-pose"
        />
        <p className="text-xs sm:text-sm lg:text-base text-center font-june">
          Try out gesture recognition by making the “Time Out” gesture!
        </p>
      </div>
      <div className="flex gap-4 items-center">
        <p className="text-sm text-center sm:text-base lg:text-lg">
          Share the with someone to invite them to join!
        </p>
        <CopyButton value={window.location.href} onCopy={onCopy}>
          <Share2 size={24} />
          Share
        </CopyButton>
      </div>
    </div>
  );
};

export default TitleBar;
