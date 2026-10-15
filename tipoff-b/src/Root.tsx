import React from "react";
import { Composition } from "remotion";
import { Opener } from "./Opener";
import { DemoSample } from "./DemoSample";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="Opener" component={Opener} durationInFrames={240} fps={30} width={1920} height={1080} />
      <Composition id="DemoSample" component={DemoSample} durationInFrames={300} fps={30} width={1920} height={1080} />
    </>
  );
};
