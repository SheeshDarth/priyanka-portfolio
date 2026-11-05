import { ImageResponse } from "next/og";

export const alt = "Priyanka H. — Forward Deployed Engineer Intern";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Drawn entirely in code: no photographs, no likeness.
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b1220",
          color: "#eef1f6",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", color: "#f04438", fontSize: 28, letterSpacing: 4 }}>
          FORWARD DEPLOYED ENGINEER INTERN
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 168, fontWeight: 800, lineHeight: 0.9 }}>PRIYANKA H.</div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 38, color: "#aab6c8" }}>
            I turn real-world requirements into working software.
          </div>
        </div>
        <div style={{ display: "flex", height: 6, width: 220, background: "#f04438" }} />
      </div>
    ),
    size,
  );
}
