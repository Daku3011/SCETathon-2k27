import { event, navigation } from "@/data/event";
export default function sitemap() {
  return [...navigation, ["Timeline", "/timeline"]].map(([, url]) => ({
    url: event.site + url,
  }));
}
