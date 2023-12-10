"use client"

import { useState } from 'react'
import { useFormStatus } from 'react-dom'
import { useFormState } from 'react-dom'
import { UploadButton } from '@/lib/uploadthing'
import Image from 'next/image'
import { createProduct } from '@/lib/actions'
import classes from './page.module.css'


const initialState: any = {
  message: "",
}

export default function AddProduct() {
  const [uploadedImages, setUploadedImages] = useState<string[]>([])

  const [state, formAction] = useFormState(createProduct, initialState)
  const { pending } = useFormStatus()

  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (uploadedImages.length == 0) {
      return alert("Upload at least one image")
    }

    const formData = new FormData(e.currentTarget as HTMLFormElement)

    formAction(formData)
  }
  console.log(state)

  return (
    <>
      <h2 className="page-title">Create a new Product</h2>
      <p aria-live="polite" className={classes.error}>
        {state?.message}
      </p>
      <form onSubmit={handelSubmit} action={formAction} className={classes.form}>
        <div className={classes.formGroup}>
          <label htmlFor="title">Product Title</label>
          <input type='text' name='title' id='title' placeholder='IPhone 15Pro Max' required />
        </div>

        <div className={classes.formGroup}>
          <label htmlFor="desc">Product Description</label>
          <textarea name="desc" id="desc" placeholder='Type here' required></textarea>
        </div>

        <UploadButton
          className={classes.uploadButton}
          endpoint="imagesUploader"
          onClientUploadComplete={(res) => res.map(img => setUploadedImages([...uploadedImages, img.url]))}
          onUploadError={(error: Error) => alert(`ERROR! ${error.message}`)}
        />

        {uploadedImages.length > 0 && (
          <ul className={classes.uploadedImages}>
            {uploadedImages.map(url => <li key={url}><Image src={url} width={120} height={120} alt="product" /></li>)}
          </ul>
        )}

        <div className={classes.formGroup}>
          <label htmlFor="price">Price (DZD)</label>
          <input type='number' name='price' id='price' placeholder='40Mlyoun 😄' required />
        </div>

        <div className={classes.formGroup}>
          <input type='checkbox' name='publish' id='publish' value="true" />
          <label htmlFor="publish">Publish on site</label>
        </div>

        <input type="hidden" name="images" value={uploadedImages} />

        <button type='submit' className={classes.submit} disabled={pending}>Submit</button>
      </form>
    </>
  )
}