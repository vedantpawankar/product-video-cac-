import React from "react";
import { Img, spring, staticFile, useVideoConfig } from "remotion";
import { loadFont as loadAnton } from "@remotion/google-fonts/Anton";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

export const display = loadAnton().fontFamily;
export const sans = loadInter("normal", { weights: ["400", "600", "800"], subsets: ["latin"] }).fontFamily;

export const ACCENT = "#FF4D2E";
export const BEAT = 15; // 120 bpm at 30 fps

// Every element punches in: starts 25% big and settles with a small overshoot.
export const usePunch = (frame: number, damping = 11, stiffness = 260) => {
  const { fps } = useVideoConfig();
  return spring({ frame, fps, from: 1.25, to: 1, config: { damping, stiffness, mass: 0.6 } });
};

// Shows a slice of a screenshot. Coordinates are in 1x CSS pixels of the page
// the screenshot came from; `dpr` is the screenshot's device scale factor.
export const Crop: React.FC<{
  src: string;
  dpr: number;
  srcW: number;
  x: number;
  y: number;
  w: number;
  h: number;
  width: number;
}> = ({ src, dpr, srcW, x, y, w, h, width }) => {
  const k = width / w;
  return (
    <div style={{ position: "relative", width, height: h * k, overflow: "hidden", borderRadius: 18, background: "#111" }}>
      <Img
        src={staticFile(src)}
        style={{
          position: "absolute",
          width: (srcW / dpr) * k,
          maxWidth: "none",
          left: -x * k,
          top: -y * k,
        }}
      />
    </div>
  );
};
