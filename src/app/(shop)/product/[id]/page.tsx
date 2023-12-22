
export default async function Product({ params }: { params: { id: string } }) {

  return (
    <div>Product :: {params.id}</div>
  )
}
