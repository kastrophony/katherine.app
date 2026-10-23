import * as http from "node:http";
import { createRequestListener, type FetchHandler } from "remix/node-fetch-server";

import { router } from "./app/router.ts";

const port = process.env.PORT ? Number.parseInt(process.env.PORT, 10) : 44100;
const hmrProxyPort = process.env.HMR_PROXY_PORT
  ? Number.parseInt(process.env.HMR_PROXY_PORT, 10)
  : null;
const isHmr = process.env.REMIX_NODE_HMR === "1";

const handler: FetchHandler = (request, client) => {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const address = forwardedFor?.split(",").at(-1)?.trim() || client.address;

  request.headers.set("x-client-ip", address);
  return router.fetch(request);
};

const server = http.createServer(createRequestListener(handler, { trustProxy: true }));

server.listen(port, () => {
  if (isHmr) {
    import("remix/node-hmr/runtime").then((nodeHmr) => nodeHmr.emitServerReady());
  }

  console.log(`Server listening on http://localhost:${hmrProxyPort ?? port}`);
});

let shuttingDown = false;

function shutdown() {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;
  server.close(() => process.exit(0));
  server.closeAllConnections();
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
