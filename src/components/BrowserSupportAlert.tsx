import { ScreenShareOff } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

export default function BrowserSupportAlert() {
  return (
    <AlertDialog defaultOpen={true}>
      <AlertDialogContent className="font-june">
        <AlertDialogHeader>
          <AlertDialogTitle asChild>
            <div className="inline-flex gap-2">
              <ScreenShareOff /> Unsupported browser
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription>
            Gesture recognition won't work on your browser, but is coming soon.
            You will still see gestures made by other people.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>OK</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
