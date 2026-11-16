import { event } from "@/data/event";
export const metadata = { title: "Terms of use" };
export default function Terms() {
  return (
    <article className="wrap page policy">
      <h1>Terms of use</h1>
      <p>
        This site provides information about SCETATHON 2.0. Browsing this site does not register you for the event. Organizers will publish participation rules before registration opens.
      </p>
      <h2>Archive materials</h2>
      <p>
        The college crest and previous-edition photographs identify SCET and its
        event archive. Contact the organizers before reusing those materials.
      </p>
      <a href={"mailto:" + event.email}>{event.email}</a>
    </article>
  );
}
