import prisma from '@/lib/prisma'
import classes from '@/components/dashboard/createProductForm/index.module.css'
import { updateProduct } from '@/lib/actions'
import UploadImages from '@/components/dashboard/createProductForm/UploadImages'
import SelectCategory from '@/components/dashboard/createProductForm/SelectCategory'
import { SubmitButton } from '@/components/dashboard/createProductForm/SubmitButton'

export default async function EditProduct({ searchParams }: { searchParams: { [key: string]: string } }) {
  const product = await prisma.product.findUnique({ where: { id: searchParams.id }, include: { category: { select: { name: true, id: true } } } })
  const categories = await prisma.category.findMany()
  if (!product) return

  const updateProductAction = updateProduct.bind(null, product)

  return (
    <form action={updateProductAction} className={classes.form}>
      <div className={classes.formGroup}>
        <label htmlFor="title">Product Title</label>
        <input type='text' name='title' id='title' placeholder='Title of title Product' defaultValue={product.title} />
      </div>

      <div className={classes.formGroup}>
        <label htmlFor="desc">Product Description</label>
        <textarea name="desc" id="desc" placeholder='Type here' defaultValue={product.desc}></textarea>
      </div>

      <div className={classes.uploadedImages}>
        <UploadImages images={product.images} />
      </div>

      <div className={classes.selectCategories}>
        <SelectCategory categories={categories} initialCategory={product.category} />
      </div>

      <div className={classes.formGroup}>
        <label htmlFor="price">Price (DZD)</label>
        <input type='number' name='price' id='price' placeholder='2002 😄' defaultValue={product.price} />
      </div>

      <div className={classes.formGroup}>
        <input type='checkbox' name='publish' id='publish' value="true" defaultChecked={product.published} />
        <label htmlFor="publish">Publish on site</label>
      </div>

      <SubmitButton>Update</SubmitButton>
    </form>
  )
}
