"use server"

export async function createProduct(images: string[], formData: FormData) {
  console.log(formData.get('title'), images)
}