import React from "react";
import { AbsoluteFill, Img, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Trail } from "@remotion/motion-blur";
import { ACCENT, Crop, display, sans, usePunch } from "./theme";

// DemoSample: 10 s, 300 frames. Each shot starts on a beat (multiples of 15).

// Huge label on the left, crop on the right. Whips in from the right on its beat.
const Shot: React.FC<{ label: string; big?: string; children: React.ReactNode }> = ({ label, big, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const x = spring({ frame, fps, from: 900, to: 0, config: { damping: 16, stiffness: 180, mass: 0.7 } });
  const s = usePunch(frame, 10, 280);
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <div style={{ position: "absolute", left: 80, top: 0, bottom: 0, width: 760, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        {big && (
          <div style={{ fontFamily: sans, fontWeight: 800, fontSize: 150, color: ACCENT, lineHeight: 1, transform: `scale(${s})`, transformOrigin: "left center" }}>
            {big}
          </div>
        )}
        <div style={{ fontFamily: display, fontSize: big ? 190 : 300, color: "#fff", lineHeight: 0.95, marginTop: big ? 30 : 0, transform: `scale(${s})`, transformOrigin: "left center" }}>
          {label}
        </div>
      </div>
      <div style={{ position: "absolute", left: 840, top: 0, width: 1000, height: 1080, transform: `translateX(${x}px)` }}>
        <Trail layers={8} lagInFrames={0.35} trailOpacity={0.45}>
          <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>{children}</AbsoluteFill>
        </Trail>
      </div>
    </AbsoluteFill>
  );
};

// WHERE.: the map, zooming in from a punch to full frame.
const MapShot: React.FC = () => {
  const frame = useCurrentFrame();
  const s = usePunch(frame, 14, 200);
  const label = usePunch(frame, 10, 280);
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Img src={staticFile("map.png")} style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${s})` }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(0,0,0,.85) 0%, rgba(0,0,0,.15) 60%, rgba(0,0,0,0) 100%)" }} />
      <div style={{ position: "absolute", left: 80, top: 0, bottom: 0, display: "flex", alignItems: "center" }}>
        <div style={{ fontFamily: display, fontSize: 380, color: "#fff", lineHeight: 0.9, transform: `scale(${label})`, transformOrigin: "left center" }}>
          WHERE<span style={{ color: ACCENT }}>.</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Phone crew view slides up from below and stays.
const PhoneShot: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const y = spring({ frame, fps, from: 1200, to: 0, config: { damping: 18, stiffness: 150, mass: 0.9 } });
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Trail layers={8} lagInFrames={0.4} trailOpacity={0.4}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <div style={{ transform: `translateY(${y}px)`, padding: 14, borderRadius: 64, background: "#1c1c1c", boxShadow: `0 0 0 3px ${ACCENT}` }}>
            <Crop src="crew.png" dpr={2} srcW={780} x={0} y={0} w={390} h={844} width={460} />
          </div>
        </AbsoluteFill>
      </Trail>
    </AbsoluteFill>
  );
};

export const DemoSample: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      {/* 0-2 s WHERE: the map */}
      <Sequence from={0} durationInFrames={60}>
        <MapShot />
      </Sequence>

      {/* 2-4 s: the hotspot's numbers from the side panel */}
      <Sequence from={60} durationInFrames={60}>
        <Shot label="REPORTS." big="+160%">
          <Crop src="crop-stats.png" dpr={2} srcW={780} x={0} y={0} w={390} h={110} width={1000} />
        </Shot>
      </Sequence>

      {/* 4-6 s WHEN: the report times */}
      <Sequence from={120} durationInFrames={60}>
        <Shot label="WHEN." big="5am–8am">
          <Crop src="crop-times.png" dpr={2} srcW={780} x={0} y={0} w={390} h={120} width={1000} />
        </Shot>
      </Sequence>

      {/* 6-8 s WHAT TO DO: a few lines of the plan */}
      <Sequence from={180} durationInFrames={60}>
        <Shot label="WHAT TO DO.">
          <Crop src="crop-actions.png" dpr={2} srcW={770} x={0} y={0} w={385} h={195} width={1000} />
        </Shot>
      </Sequence>

      {/* 8-10 s: the crew list on a phone, sliding up */}
      <Sequence from={240} durationInFrames={60}>
        <PhoneShot />
      </Sequence>
    </AbsoluteFill>
  );
};
