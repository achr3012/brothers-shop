import DeleteCategory from "./DeleteCategory";

type CategoryType = { id: number; name: string; products: { title: string; }[]; }
export default function CategoriesList({ categories, className }: { categories: CategoryType[], className: string }) {
  if (!categories.length) return <h2>No categories, <label htmlFor="cateName">Add one</label>.</h2>
  return (
    <div className={className}>
      {categories.map(categorie => {
        const productsTitles = categorie.products.map(product => product.title).join('\n')
        return (
          <div key={categorie.name}>
            <h3>
              <a href={`/category/${categorie.name}`} target="_blank">{categorie.name}</a>
              <p title={productsTitles}>{categorie.products.length} products</p>
            </h3>
            <DeleteCategory id={categorie.id} />
          </div>
        )
      })}
    </div>
  )
}
