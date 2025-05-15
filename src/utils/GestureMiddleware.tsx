import VideoWithEffects from "../components/smelter/VideoWithEffects";
import Smelter from "@swmansion/smelter-web-wasm";
import timer from "../assets/timer.svg";

const timerUrl = new URL(timer, import.meta.url).href;

const getNewId = (() => {
  let x = 1;
  return () => `stream-${x++}`;
})();

export default class GestureMiddleware {
  track: MediaStreamTrack;
  private smelter: Smelter;
  private initPromise: Promise<void>;

  constructor(track: MediaStreamTrack) {
    this.track = track;
    this.smelter = new Smelter();
    this.initPromise = this.init();
  }

  async init() {
    console.log("initializing smelter");
    const id = getNewId();

    await this.smelter.init();

    await this.smelter.registerImage("timer", {
      assetType: "svg",
      url: timerUrl,
      resolution: { width: 1920, height: 1080 },
    } as unknown as { assetType: "svg"; url: string });

    await this.smelter.registerInput(id, {
      type: "stream",
      stream: new MediaStream([this.track]),
    });

    const settings = this.track.getSettings();
    const width = settings.width!;
    const height = settings.height!;

    const { stream } = await this.smelter.registerOutput(
      id,
      <VideoWithEffects
        track={this.track}
        inputId={id}
        width={width}
        height={height}
      />,
      {
        type: "stream",
        video: { resolution: { width, height } },
      },
    );
    const [track] = stream!.getVideoTracks();
    this.track = track;

    console.log("starting smelter");
    await this.smelter.start();
  }

  close() {
    console.log("closing smelter");
    this.initPromise.finally(() => {
      console.log("terminating smelter");
      return this.smelter.terminate();
    });
  }
}
