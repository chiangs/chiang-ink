import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("work", "routes/work/index.tsx"),
  route("work/:slug", "routes/work/$slug.tsx"),
  route("writing", "routes/writing/index.tsx"),
  route("writing/:slug", "routes/writing/$slug.tsx"),
  route("contact", "routes/contact.tsx"),
] satisfies RouteConfig;
