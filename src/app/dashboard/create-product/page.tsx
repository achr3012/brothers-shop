"use client"

import classes from './page.module.css'
import { createProduct } from '@/lib/actions'
import { UploadButton } from '@/lib/uploadthing'
import Image from 'next/image'
import { useState } from 'react'

export default function AddProduct() {
  const [uploadedImages, setUploadedImages] = useState<string[]>([])

  const createProductWithImages = createProduct.bind(null, uploadedImages)

  return (
    <>
      <h2 className="page-title">Create a new Product</h2>

      <form action={createProductWithImages} className={classes.form}>
        <div className={classes.formGroup}>
          <label htmlFor="title">Product Title</label>
          <input type='text' name='title' id='title' placeholder='IPhone 15Pro Max' />
        </div>

        <div className={classes.formGroup}>
          <label htmlFor="desc">Product Description</label>
          <textarea name="desc" id="desc" placeholder='Type here'></textarea>
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
          <input type='number' name='price' id='price' placeholder='40Mlyoun 😄' />
        </div>

        <div className={classes.formGroup}>
          <input type='checkbox' name='publish' id='publish' value="true" />
          <label htmlFor="publish">Publish on site</label>
        </div>

        <button type='submit' className={classes.submit}>Submit</button>
      </form>
    </>
  )
}