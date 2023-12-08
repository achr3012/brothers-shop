import { generateComponents } from "@uploadthing/react";

import type { imagesRouter } from "@/app/api/uploadthing/core";

export const { UploadButton } =
  generateComponents<imagesRouter>();