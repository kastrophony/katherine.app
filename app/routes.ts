import { get, route } from "remix/routes";

export const routes = route({
  assets: get("/assets/*path"),
  home: "/",
  pronouns: "/pronouns",
  ip: "/ip",
});
