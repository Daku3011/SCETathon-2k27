import { copy } from "@/data/event";
import { Results } from "@/components/sections/Inner";

export const metadata = { title: "Qualified teams" };

export default function Page() {
  return (
    <div className="wrap page py-14 max-w-4xl mx-auto px-4">
      <small className="font-mono text-xs text-[#963E29] uppercase tracking-wider font-semibold block mb-2">
        {copy.textScetathon2027}
      </small>
      <h1 className="font-display text-4xl font-bold text-[#182239] mb-8">
        {copy.textQualifiedTeams}
      </h1>
      <Results />
    </div>
  );
}
