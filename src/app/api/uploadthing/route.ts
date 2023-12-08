import { createNextRouteHandler } from "uploadthing/next";

import { imagesRouter } from "./core";

// Export routes for Next App Router
export const { GET, POST } = createNextRouteHandler({
  router: imagesRouter,
});