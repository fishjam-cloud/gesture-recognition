import { FC } from "react";
import handImg from "../assets/hands.svg";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const HelpTooltip: FC = () => {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip defaultOpen={true}>
        <TooltipTrigger className="absolute left-4 top-4" asChild>
          <Info size={32} />
        </TooltipTrigger>
        <TooltipContent side="right" align="start">
          <div className="flex p-2 items-center">
            <p className="text-lg">
              Try out gesture recognition by making the following hand gesture:
            </p>
            <img
              className="size-20"
              src={handImg}
              aria-placeholder="hand-timeout-pose"
            />
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default HelpTooltip;
