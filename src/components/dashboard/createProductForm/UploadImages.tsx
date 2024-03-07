"use client"

import { useState } from "react"
import Image from "next/image"
import { UploadButton } from "@/lib/uploadthing"

export default function UploadImages({ images }: { images: string[] }) {
  const [uploadedImages, setUploadedImages] = useState<string[]>(images)

  return (
    <>
      <UploadButton
        endpoint="imagesUploader"
        onClientUploadComplete={(res) => res.map(img => setUploadedImages([...uploadedImages, img.url]))}
        onUploadError={(error: Error) => alert(`ERROR! ${error.message}`)}
      />

      {uploadedImages.length > 0 && (
        <ul>
          {uploadedImages.map(url => (
            <li key={url}>
              <Image src={url} width={120} height={120} alt="" />
              <button type="button" onClick={() => setUploadedImages(uploadedImages.filter(img => img !== url))}>&times;</button>
            </li>
          ))}
        </ul>
      )}
      {uploadedImages.length == 0 && images.length > 0 && (
        <button type="button" onClick={() => setUploadedImages(images)}>Restore images</button>
      )}
      <input type="hidden" name="images" value={uploadedImages} />
    </>
  )
}