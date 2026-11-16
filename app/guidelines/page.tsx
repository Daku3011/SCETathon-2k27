import { copy } from "@/data/event";
import { Guidelines } from "@/components/sections/Inner";
export const metadata = { title: "Guidelines & rules" };
export default function Page() {
  return (
    <div className="page wrap">
      <small>{copy.textScetathon2027}</small>
      <h1>{copy.textGuidelinesRules}</h1>
      <Guidelines />
    </div>
  );
}
