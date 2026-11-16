import { event } from "@/data/event";

export const metadata = { title: "Privacy notice" };

export default function Privacy() {
  return (
    <article className="wrap page policy py-16 max-w-3xl mx-auto px-4">
      <h1 className="font-display text-4xl font-bold text-[#182239] mb-6">Privacy notice</h1>
      <div className="prose text-[#182239]/90 text-lg leading-relaxed space-y-6">
        <p>
          You can browse this official SCETATHON 2.0 programme without creating an account. Search terms and challenge filters stay in your browser during your session. The countdown preview simulates event timeline milestones locally.
        </p>
        <h2 className="font-display text-2xl font-bold text-[#182239] pt-4">Hosting and maps</h2>
        <p>
          This event website is hosted securely. Campus maps load directly from Google Maps, subject to Google privacy terms. No personal telemetry or user credentials are submitted without explicit consent.
        </p>
        <h2 className="font-display text-2xl font-bold text-[#182239] pt-4">Questions</h2>
        <p>
          For privacy inquiries regarding SCETATHON 2.0, contact the organizing secretariat at:{" "}
          <a
            href={"mailto:" + event.email}
            className="text-[#172C67] underline underline-offset-4 font-semibold"
          >
            {event.email}
          </a>.
        </p>
      </div>
    </article>
  );
}
