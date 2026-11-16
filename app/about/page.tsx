import { copy } from "@/data/event";
import { About } from "@/components/sections/Inner";
export const metadata = { title: "About SCETATHON" };
export default function Page() {
  return (
    <div className="page wrap">
      <small>{copy.textScetathon2027}</small>
      <h1>{copy.textAboutSCETATHON}</h1>
      <About />
    </div>
  );
}
