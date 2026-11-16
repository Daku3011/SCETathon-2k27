import { copy } from "@/data/event";
import { Gallery } from "@/components/sections/Inner";
export const metadata = { title: "2026 gallery" };
export default function Page() {
  return (
    <div className="page wrap">
      <small>{copy.textScetathonARCHIVE}</small>
      <h1>{copy.text2026Gallery}</h1>
      <Gallery />
    </div>
  );
}
