import { event, isPublishedRoute } from "@/data/event";

const siteRoutes = [
  "/",
  "/about",
  "/guidelines",
  "/evaluation",
  "/gallery",
  "/problems",
  "/sponsors",
  "/timeline",
  "/privacy",
  "/terms",
  "/results",
  "/winners",
];

export default function sitemap() {
  return siteRoutes
    .filter((route) => isPublishedRoute(route))
    .map((route) => ({
      url: `${event.site}${route === "/" ? "" : route}`,
      lastModified: new Date(),
    }));
}
