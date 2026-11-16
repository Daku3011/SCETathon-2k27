import { event } from "@/data/event";
export const metadata = { title: "Privacy notice" };
export default function Privacy() {
  return (
    <article className="wrap page policy">
      <h1>Privacy notice</h1>
      <p>
        You can browse this demo without an account. Search terms and sample
        reservations stay in the page while you use it. The countdown preview stores its end time in this browser tab. The contact form opens
        an email draft in your mail app. You decide whether to send it.
      </p>
      <h2>Hosting and maps</h2>
      <p>
        Vercel serves the site and receives browser request information such as
        IP addresses. The map on the About page loads from Google Maps, which
        receives a request from your browser. External services apply their own
        privacy policies.
      </p>
      <h2>Questions</h2>
      <a href={"mailto:" + event.email}>{event.email}</a>
    </article>
  );
}
