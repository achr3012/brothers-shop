
export default async function EditProduct({ searchParams }: { searchParams: { [key: string]: string } }) {

  const product = await prisma?.product.findUnique({ where: { id: searchParams.id } })

  if (!product) return

  return (
    <>
      <h2 className="page-title">Edit this product</h2>
    </>
  )
}
