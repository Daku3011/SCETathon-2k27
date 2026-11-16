import { ImageResponse } from "next/og";
import { event } from "@/data/event";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          width: "100%",
          height: "100%",
          background: "#172C67",
          color: "#F5EFE2",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle Mandana-inspired framing border */}
        <div
          style={{
            position: "absolute",
            top: 24,
            left: 24,
            right: 24,
            bottom: 24,
            border: "2px solid rgba(245, 239, 226, 0.3)",
            borderRadius: 4,
            pointerEvents: "none",
          }}
        />

        {/* Top Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                background: "rgba(245, 239, 226, 0.12)",
                border: "1px solid rgba(245, 239, 226, 0.25)",
                borderRadius: 2,
                padding: "8px 18px",
                fontSize: 16,
                fontWeight: 600,
                color: "#F5EFE2",
                letterSpacing: 2,
              }}
            >
              SARVAJANIK COLLEGE OF ENGINEERING &amp; TECHNOLOGY · SURAT
            </div>
          </div>

          <div
            style={{
              background: "#963E29",
              borderRadius: 2,
              padding: "8px 22px",
              fontSize: 18,
              fontWeight: 700,
              color: "#F5EFE2",
              letterSpacing: 1,
            }}
          >
            28–29 JANUARY 2027
          </div>
        </div>

        {/* Middle Main Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <div
            style={{
              fontSize: 92,
              fontWeight: 900,
              letterSpacing: -3,
              lineHeight: 0.95,
              color: "#F5EFE2",
            }}
          >
            SCETATHON 2.0
          </div>

          <div
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: "#F5EFE2",
              opacity: 0.9,
              letterSpacing: 0,
            }}
          >
            A 24-hour student hackathon at SCET, Surat.
          </div>

          <div
            style={{
              fontSize: 20,
              color: "#F5EFE2",
              opacity: 0.75,
              maxWidth: 820,
              lineHeight: 1.4,
            }}
          >
            Student teams turn urgent regional, industrial, and social challenges into verified working software and hardware prototypes.
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(245, 239, 226, 0.2)",
            paddingTop: 24,
            width: "100%",
          }}
        >
          <div style={{ fontSize: 18, color: "#F5EFE2", fontWeight: 600 }}>
            SCET Campus, Athwalines, Surat, Gujarat
          </div>

          <div
            style={{
              fontSize: 16,
              color: "#F5EFE2",
              fontWeight: 700,
              letterSpacing: 1.5,
              opacity: 0.9,
            }}
          >
            24 HOURS · TEAMS OF 3–5 · EIGHT PROBLEM STATEMENTS
          </div>
        </div>
      </div>
    ),
    size
  );
}
