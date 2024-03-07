"use client"

import { useFormState } from 'react-dom'
import { Category } from '@prisma/client'
import { createProduct } from '@/lib/actions'
import classes from './index.module.css'
import UploadImages from './UploadImages'
import SelectCategory from './SelectCategory'
import { SubmitButton } from './SubmitButton'

const initialState: {
  errors: {
    title?: string[] | undefined;
    desc?: string[] | undefined;
    price?: string[] | undefined;
    publish?: string[] | undefined;
  }
} = {
  errors: {}
}

export default function CreateProductForm({ categories }: { categories: Category[] }) {
  const [state, formAction] = useFormState(createProduct, initialState)

  const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget as HTMLFormElement)
    formAction(formData)
  }

  return (
    <form onSubmit={handelSubmit} className={classes.form}>
      <div className={classes.formGroup}>
        <label htmlFor="title">Product Title</label>
        <input type='text' name='title' id='title' placeholder='Product Pro Max' />
        {state.errors.title && <p className={classes.error}>{state.errors.title[0]}</p>}
      </div>

      <div className={classes.formGroup}>
        <label htmlFor="desc">Product Description</label>
        <textarea name="desc" id="desc" placeholder='Type here' ></textarea>
        {state.errors.desc && <p className={classes.error}>{state.errors.desc[0]}</p>}
      </div>

      <div className={classes.uploadedImages}>
        <UploadImages images={[]} />
      </div>

      <div className={classes.selectCategories}>
        <SelectCategory categories={categories} initialCategory={{ name: "Uncategorized", id: 0 }} />
      </div>

      <div className={classes.formGroup}>
        <label htmlFor="price">Price (DZD)</label>
        <input type='number' name='price' id='price' placeholder='14 Mlyoun 😄' />
        {state.errors.price && <p className={classes.error}>{state.errors.price[0]}</p>}
      </div>

      <div className={classes.formGroup}>
        <input type='checkbox' name='publish' id='publish' value="true" />
        <label htmlFor="publish">Publish on site</label>
      </div>

      <SubmitButton>Create</SubmitButton>
    </form>
  )
}