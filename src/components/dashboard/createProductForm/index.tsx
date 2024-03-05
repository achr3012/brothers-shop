"use client"

import { useEffect, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import Image from 'next/image'
import { createProduct } from '@/lib/actions'
import { UploadButton } from '@/lib/uploadthing'
import classes from './index.module.css'
import { Category } from '@prisma/client'

const initialState: {
  errors: {
    title?: string[] | undefined;
    desc?: string[] | undefined;
    images?: string[] | undefined;
    price?: string[] | undefined;
    publish?: string[] | undefined;
  }
} = {
  errors: {}
}

const CreateProductForm = ({ categories }: { categories: Category[] }) => {
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [imagesError, setImagesError] = useState("")
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [category, setCategory] = useState(0)
  const [state, formAction] = useFormState(createProduct, initialState)
  const { pending } = useFormStatus()

  useEffect(() => {
    if (formSubmitted) {
      uploadedImages.length ? setImagesError("") : setImagesError("Please insert at least one image")
    }
  }, [uploadedImages, formSubmitted])

  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormSubmitted(true)
    if (uploadedImages.length == 0) return

    const formData = new FormData(e.currentTarget as HTMLFormElement)
    formAction(formData)
  }
  return (
    <form onSubmit={handelSubmit} action={formAction} className={classes.form}>
      <div className={classes.formGroup}>
        <label htmlFor="title">Product Title</label>
        <input type='text' name='title' id='title' placeholder='IPhone 15Pro Max' />
        {state.errors.title && <p className={classes.error}>{state.errors.title[0]}</p>}
      </div>

      <div className={classes.formGroup}>
        <label htmlFor="desc">Product Description</label>
        <textarea name="desc" id="desc" placeholder='Type here' ></textarea>
        {state.errors.desc && <p className={classes.error}>{state.errors.desc[0]}</p>}
      </div>

      <UploadButton
        className={classes.uploadButton}
        endpoint="imagesUploader"
        onClientUploadComplete={(res) => res.map(img => setUploadedImages([...uploadedImages, img.url]))}
        onUploadError={(error: Error) => alert(`ERROR! ${error.message}`)}
      />

      {imagesError && <p className={classes.error}>{imagesError}</p>}

      {uploadedImages.length > 0 && (
        <ul className={classes.uploadedImages}>
          {uploadedImages.map(url => <li key={url}><Image src={url} width={120} height={120} alt="product" /></li>)}
        </ul>
      )}

      <h4>Select category</h4>
      <ul className={classes.categories}>
        {categories.map(cate => (
          <li
            key={cate.id}
            onClick={() => setCategory(cate.id)}
            className={cate.id === category ? classes.selectedCategory : ''}>
            {cate.name}
          </li>
        ))}
      </ul>

      <div className={classes.formGroup}>
        <label htmlFor="price">Price (DZD)</label>
        <input type='number' name='price' id='price' placeholder='14 Mlyoun 😄' />
        {state.errors.price && <p className={classes.error}>{state.errors.price[0]}</p>}
      </div>

      <div className={classes.formGroup}>
        <input type='checkbox' name='publish' id='publish' value="true" />
        <label htmlFor="publish">Publish on site</label>
      </div>

      <input type="hidden" name="images" value={uploadedImages} />
      <input type="hidden" name="category" value={category} />

      <button type='submit' className={classes.submit} aria-disabled={pending} disabled={pending}>Submit</button>
    </form>
  )
}

export default CreateProductForm;