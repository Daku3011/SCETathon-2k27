import { event } from "@/data/event";
export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: event.site + "/sitemap.xml",
  };
}
