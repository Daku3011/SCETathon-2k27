import { event } from "@/data/event";

export const metadata = { title: "Terms of use" };

export default function Terms() {
  return (
    <article className="wrap page policy py-16 max-w-3xl mx-auto px-4">
      <h1 className="font-display text-4xl font-bold text-[#182239] mb-6">Terms of use</h1>
      <div className="prose text-[#182239]/90 text-lg leading-relaxed space-y-6">
        <p>
          This public platform provides event information, problem tracks, and schedule details for SCETATHON 2.0 (28–29 January 2027 at Sarvajanik College of Engineering & Technology, Surat). Exploring a challenge or previewing registration does not constitute official team enrollment.
        </p>
        <h2 className="font-display text-2xl font-bold text-[#182239] pt-4">Archive & Institutional Marks</h2>
        <p>
          The SCET college crest, event wordmark, and previous-edition photographs are intellectual property of Sarvajanik University and SCET Surat. Reproduction or commercial reuse without written permission is strictly prohibited.
        </p>
        <h2 className="font-display text-2xl font-bold text-[#182239] pt-4">Participation</h2>
        <p>
          Final team qualification, code of conduct rules, and lab safety requirements will be ratified prior to campus check-in.
        </p>
        <p className="pt-2">
          Contact:{" "}
          <a
            href={"mailto:" + event.email}
            className="text-[#172C67] underline underline-offset-4 font-semibold"
          >
            {event.email}
          </a>
        </p>
      </div>
    </article>
  );
}
