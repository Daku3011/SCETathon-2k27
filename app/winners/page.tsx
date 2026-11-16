import { copy } from "@/data/event";
import { Winners } from "@/components/sections/Inner";
export const metadata = { title: "Winners" };
export default function Page() {
  return (
    <div className="page wrap">
      <small>{copy.textScetathon2027}</small>
      <h1>{copy.textWinners}</h1>
      <Winners />
    </div>
  );
}
