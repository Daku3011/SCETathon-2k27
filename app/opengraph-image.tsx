import { copy } from "@/data/event";
import { ImageResponse } from "next/og";
import { event } from "@/data/event";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 72,
        width: "100%",
        height: "100%",
        background: "#101719",
        color: "#dbed9e",
      }}
    >
      <div style={{ fontSize: 28 }}>{copy.textScetSURAT}</div>
      <div style={{ fontSize: 100 }}>{event.name}</div>
      <div style={{ fontSize: 46, color: "#dbed9e" }}>{event.displayDate}</div>
    </div>,
    size,
  );
}
