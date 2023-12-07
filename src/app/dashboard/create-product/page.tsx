import UploadImages from '@/components/dashboard/image-upload'
import classes from './page.module.css'

export default async function AddProduct() {
  return (
    <>
      <h2 className="page-title">Create a new Product</h2>

      <form action="" className={classes.form}>
        <div className={classes.formGroup}>
          <label htmlFor="title">Product Title</label>
          <input type='text' name='title' id='title' placeholder='IPhone 15Pro Max' />
        </div>

        <div className={classes.formGroup}>
          <label htmlFor="desc">Product Description</label>
          <textarea name="desc" id="desc" placeholder='Type here'></textarea>
        </div>

        <div className={classes.formGroup}>
          <UploadImages />
        </div>

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