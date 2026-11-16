import { copy } from "@/data/event";
import { Gallery } from "@/components/sections/Inner";
export const metadata = { title: "SCET campus archive" };
export default function Page() {
  return (
    <div className="page wrap">
      <small>{copy.textScetathonARCHIVE}</small>
      <h1>{copy.text2026Gallery}</h1>
      <Gallery />
    </div>
  );
}
