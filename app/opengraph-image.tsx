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
        background: "#783e29",
        color: "#efebe1",
      }}
    >
      <div style={{ fontSize: 28 }}>{copy.textScetSURAT}</div>
      <div style={{ fontSize: 100 }}>{event.name}</div>
      <div style={{ fontSize: 46, color: "#efebe1" }}>{event.displayDate}</div>
    </div>,
    size,
  );
}
