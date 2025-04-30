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
    <div className="flex w-full flex-col items-center justify-between gap-2 md:flex-row">
      <div className="flex items-center justify-between gap-4">
        <img
          className="size-18"
          src={handImg}
          aria-placeholder="hand-timeout-pose"
        />
        <p className="font-june text-center text-xs sm:text-sm lg:text-base">
          Try out gesture recognition by making the “Time Out” gesture!
        </p>
      </div>
      <div className="flex items-center gap-4">
        <p className="text-center text-sm sm:text-base lg:text-lg">
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
