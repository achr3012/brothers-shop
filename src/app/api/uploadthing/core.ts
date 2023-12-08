import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const imagesRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imagesUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 6 } })
    .onUploadComplete(async ({ file }) => {
      console.log("file url", file.url);
      return { uploaded: file.url };
    })
} satisfies FileRouter;

export type imagesRouter = typeof imagesRouter;