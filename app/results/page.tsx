import { copy } from "@/data/event";
import { Results } from "@/components/sections/Inner";
export const metadata = { title: "Qualified teams" };
export default function Page() {
  return (
    <div className="page wrap">
      <small>{copy.textScetathon2027}</small>
      <h1>{copy.textQualifiedTeams}</h1>
      <Results />
    </div>
  );
}
