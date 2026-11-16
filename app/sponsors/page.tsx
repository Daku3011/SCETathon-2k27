import { copy } from "@/data/event";
import { Sponsors } from "@/components/sections/HomeSections";
export const metadata = { title: "Event partners" };
export default function Page() {
  return (
    <div className="page wrap">
      <small>{copy.textScetathon2027}</small>
      <h1>{copy.textEventPartners}</h1>
      <Sponsors />
    </div>
  );
}
