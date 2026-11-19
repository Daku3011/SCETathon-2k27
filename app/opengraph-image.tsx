import { ImageResponse } from "next/og";

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
          background: "#111210",
          color: "#F2F0E8",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Border overlay */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: 24,
            left: 24,
            right: 24,
            bottom: 24,
            border: "1px solid rgba(255, 255, 255, 0.19)",
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
            }}
          >
            <div
              style={{
                display: "flex",
                background: "#232422",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                padding: "8px 18px",
                fontSize: 15,
                fontWeight: 700,
                color: "#D8FF50",
                letterSpacing: 2,
              }}
            >
              SCETATHON 2.0 // SURAT, INDIA
            </div>
          </div>

          <div
            style={{
              display: "flex",
              background: "#D8FF50",
              padding: "8px 22px",
              fontSize: 17,
              fontWeight: 800,
              color: "#111210",
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
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "baseline",
              fontSize: 88,
              fontWeight: 900,
              letterSpacing: -4,
              lineHeight: 0.88,
              color: "#F2F0E8",
            }}
          >
            <span>MAKE WHAT'S </span>
            <span style={{ color: "#D8FF50", marginLeft: 16 }}>NEXT</span>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 26,
              fontWeight: 600,
              color: "#FF7358",
              marginTop: 16,
            }}
          >
            A 24-hour engineering hackathon at SCET, Surat.
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 18,
              color: "#C6C8BE",
              maxWidth: 820,
              lineHeight: 1.5,
              marginTop: 12,
            }}
          >
            Where code meets chemistry, ambitious ideas become real prototypes, and the next generation builds.
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255, 255, 255, 0.15)",
            paddingTop: 24,
            width: "100%",
          }}
        >
          <div style={{ display: "flex", fontSize: 16, color: "#93958E", fontWeight: 600 }}>
            Sarvajanik College of Engineering &amp; Technology · 28–29 January 2027
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 15,
              color: "#D8FF50",
              fontWeight: 700,
              letterSpacing: 1.5,
            }}
          >
            24 HOURS · TEAMS OF 3–5 · EIGHT CHALLENGE SLOTS
          </div>
        </div>
      </div>
    ),
    size
  );
}
