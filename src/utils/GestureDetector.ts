import { findGesture, GestureCallback } from "./Gesture";

export class GestureDetector {
  private video: HTMLVideoElement;
  private canvas: OffscreenCanvas;
  private canvasCtx: OffscreenCanvasRenderingContext2D;
  private prevTime: number = 0;
  private closing: boolean = false;
  private playPromise: Promise<void>;
  private worker: Worker;

  constructor(stream: MediaStream, detectionCallback: GestureCallback) {
    this.video = document.createElement("video");
    this.video.muted = true;
    this.video.srcObject = stream;
    this.playPromise = this.video.play().catch(() => {});

    const { width, height } = stream.getVideoTracks()[0].getSettings();
    this.canvas = new OffscreenCanvas(width!, height!);
    this.canvasCtx = this.canvas.getContext("2d", {
      willReadFrequently: true,
    })!;

    this.worker = new Worker(new URL("./MediaPipeWorker.js", import.meta.url));
    this.worker.onmessage = ({ data }) => {
      detectionCallback(findGesture(data));
      this.video.requestVideoFrameCallback(() => this.detect());
    };
    this.video.requestVideoFrameCallback(() => this.detect());
  }

  detect() {
    if (this.closing) return;

    const currentTime = this.video.currentTime;
    if (this.prevTime >= currentTime) {
      this.video.requestVideoFrameCallback(() => this.detect());
      return;
    }

    this.prevTime = currentTime;
    this.canvasCtx.drawImage(this.video, 0, 0);
    const frame = this.canvas.transferToImageBitmap();
    this.worker.postMessage({ type: "frame", frame }, [frame]);
  }

  close() {
    this.closing = true;
    this.playPromise.finally(() => this.video.remove());
    this.worker.postMessage({ type: "close" });
  }
}
