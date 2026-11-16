import { copy } from "@/data/event";
import Problems from "@/components/sections/Problems";
export const metadata = { title: "Problem statements" };
export default function Page() {
  return (
    <div className="page wrap">
      <small>{copy.textScetathon2027}</small>
      <h1>{copy.textProblemStatements}</h1>
      <Problems />
    </div>
  );
}
