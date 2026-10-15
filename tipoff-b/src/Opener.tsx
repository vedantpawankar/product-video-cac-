import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Trail } from "@remotion/motion-blur";
import { ACCENT, display, sans, usePunch } from "./theme";

// Opener: 8 s, 240 frames. Every cut lands on a beat (multiples of 15 frames).
const Word: React.FC<{ text: string; size?: number; color?: string }> = ({ text, size = 230, color = "#fff" }) => {
  const frame = useCurrentFrame();
  const s = usePunch(frame);
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <div style={{ fontFamily: display, fontSize: size, color, transform: `scale(${s})`, lineHeight: 1, textTransform: "uppercase", textAlign: "center" }}>
        {text}
      </div>
    </AbsoluteFill>
  );
};

const Counter: React.FC = () => {
  const frame = useCurrentFrame();
  const n = Math.round(interpolate(frame, [0, 30], [0, 15342], { easing: Easing.out(Easing.cubic), extrapolateRight: "clamp" }));
  const s = usePunch(frame, 9, 320);
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <div style={{ fontFamily: display, fontSize: 400, color: "#fff", transform: `scale(${s})`, lineHeight: 1 }}>
        {n.toLocaleString("en-US")}
      </div>
    </AbsoluteFill>
  );
};

const CountLabel: React.FC = () => {
  const frame = useCurrentFrame();
  const s = usePunch(frame - 30);
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-end", paddingBottom: 170 }}>
      <div style={{ fontFamily: sans, fontWeight: 800, fontSize: 84, color: ACCENT, transform: `scale(${s})` }}>
        illegal dumping reports.
      </div>
    </AbsoluteFill>
  );
};

const Photo: React.FC = () => {
  const frame = useCurrentFrame();
  const flash = interpolate(frame, [0, 6], [0, 0.3], { easing: Easing.out(Easing.cubic), extrapolateRight: "clamp" });
  return (
    <AbsoluteFill>
      <Img src={staticFile("flytipping.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: flash }} />
      <div style={{ position: "absolute", right: 36, bottom: 28, fontFamily: sans, fontSize: 22, color: "#bbb" }}>
        Photo: Frances Mc Fadden, CC BY-SA 3.0
      </div>
    </AbsoluteFill>
  );
};

export const Opener: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      {/* 0-2 s: the count, then its label on beat 2 */}
      <Sequence from={0} durationInFrames={60}>
        <Counter />
        <Sequence from={30} durationInFrames={30}>
          <CountLabel />
        </Sequence>
      </Sequence>

      {/* Three hard cuts, one word per beat, photo behind them at low opacity */}
      <Sequence from={60} durationInFrames={90}>
        <Photo />
      </Sequence>
      <Sequence from={60} durationInFrames={30}>
        <Word text="Same streets." size={200} />
      </Sequence>
      <Sequence from={90} durationInFrames={30}>
        <Word text="Same mornings." size={200} />
      </Sequence>
      <Sequence from={120} durationInFrames={30}>
        <Word text="Every week." size={200} />
      </Sequence>

      {/* Stat beat, then the logo slams in and holds for the last 1.5 s */}
      <Sequence from={150} durationInFrames={45}>
        <Word text="1,173 hotspots." size={200} color={ACCENT} />
      </Sequence>
      <Sequence from={195} durationInFrames={45}>
        <Trail layers={6} lagInFrames={0.4} trailOpacity={0.5}>
          <Word text="TipOff" size={420} />
        </Trail>
      </Sequence>
    </AbsoluteFill>
  );
};
