import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const imagesRouter = {
  imagesUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } }).onUploadComplete(() => { })
} satisfies FileRouter;

export type imagesRouter = typeof imagesRouter;