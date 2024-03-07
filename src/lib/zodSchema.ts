import { z } from 'zod'

export const productSchema = z.object(
  {
    title: z.string({
      invalid_type_error: 'Invalid Title',
    })
      .min(3, { message: "Title Must be 3 or more characters long" })
      .max(250, { message: "Title Must be 250 or fewer characters long" }),

    desc: z.string({
      invalid_type_error: 'Invalid Description',
    })
      .min(30, { message: "Description Must be 30 or more characters long" })
      .max(1250, { message: "Description Must be 200 or fewer words long" }),
    price: z.number({
      invalid_type_error: 'Invalid Price',
    })
      .gte(50, "Price must be greater than or equal 50").int(),
    published: z.boolean()
  },
)

export const orderSchema = z.object({
  name: z.string(),
  phone: z.string(),
  wilaya: z.string(),
  commune: z.string(),
  delivery: z.string(),
  productId: z.string()
})