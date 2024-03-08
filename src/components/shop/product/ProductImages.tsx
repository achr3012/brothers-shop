"use client"

import Image from "next/image"
import { useState } from "react"

export default function ProductImages({ photos, alt }: { photos: string[], alt: string }) {
  const [url, setUrl] = useState("")
  return (
    <>
      {url && (
        <div>
          <img src={url} />
          <button type="button" onClick={() => setUrl("")}>&times;</button>
        </div>
      )}
      <ul>
        {photos.map((url) => (
          <li key={url}><Image src={url} width={180} height={180} alt={alt} onClick={() => setUrl(url)} /></li>
        ))}
      </ul>
    </>
  )
}
