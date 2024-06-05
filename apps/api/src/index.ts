import { logAPI } from "@repo/logger";
import createServer from "./server.ts";

const port = process.env.PORT || 5001;
const server = createServer();

server.listen(port, () => {
  logAPI(`api running on ${port}`);
});
