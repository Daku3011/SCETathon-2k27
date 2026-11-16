import { copy } from "@/data/event";
import { Evaluation } from "@/components/sections/Inner";
export const metadata = { title: "How judging works" };
export default function Page() {
  return (
    <div className="page wrap">
      <small>{copy.textScetathon2027}</small>
      <h1>{copy.textHowJudgingWorks}</h1>
      <Evaluation />
    </div>
  );
}
