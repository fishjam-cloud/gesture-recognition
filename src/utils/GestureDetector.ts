import { findGesture, GestureCallback } from "./Gesture";
import workerUrl from "../assets/MediaPipeWorker.js?worker&url";

export class GestureDetector {
  private video: HTMLVideoElement;
  private canvas: OffscreenCanvas;
  private canvasCtx: OffscreenCanvasRenderingContext2D;
  private detectionCallback: GestureCallback;
  private prevTime: number = 0;
  private closing: boolean = false;
  private playPromise: Promise<void>;
  private worker = new Worker(
    new URL("../assets/MediaPipeWorker.js", import.meta.url),
  );

  constructor(stream: MediaStream, detectionCallback: GestureCallback) {
    this.detectionCallback = detectionCallback;

    this.video = document.createElement("video");
    this.video.muted = true;
    this.video.srcObject = stream;

    const { width, height } = stream.getVideoTracks()[0].getSettings();
    this.canvas = new OffscreenCanvas(width!, height!);
    this.canvasCtx = this.canvas.getContext("2d", {
      willReadFrequently: true,
    })!;

    this.playPromise = this.video.play().catch(() => {});

    this.worker.onmessage = ({ data }) => {
      this.detectionCallback(findGesture(data));
      this.video.requestVideoFrameCallback(() => this.detect());
    };

    this.video.requestVideoFrameCallback(() => this.detect());
  }

  detect() {
    if (this.closing) return;

    const currentTime = this.video.currentTime;
    if (this.prevTime < currentTime) {
      this.prevTime = currentTime;

      this.canvasCtx.drawImage(this.video, 0, 0);
      const frame = this.canvas.transferToImageBitmap();
      this.worker.postMessage(frame, [frame]);
    } else {
      this.video.requestVideoFrameCallback(() => this.detect());
    }
  }

  close() {
    this.closing = true;
    this.worker.terminate();
    this.playPromise.finally(() => this.video.remove());
  }
}
