import { event } from "@/data/event";
export const metadata = { title: "Privacy notice" };
export default function Privacy() {
  return (
    <article className="wrap page policy">
      <h1>Privacy notice</h1>
      <p>
        This site does not provide accounts or collect registration submissions. The contact form prepares an email draft in your mail application; it is only sent if you choose to send it. Registration details will be added here if the event begins collecting participant information.
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
