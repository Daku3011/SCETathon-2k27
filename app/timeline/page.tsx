import { copy } from "@/data/event";
import { Timeline } from "@/components/sections/HomeSections";
export const metadata = { title: "Event timeline" };
export default function Page() {
  return (
    <div className="page wrap">
      <small>{copy.textScetathon2027}</small>
      <h1>{copy.textEventTimeline}</h1>
      <Timeline />
    </div>
  );
}
