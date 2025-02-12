import getProducts from "./actions/get-products";
import ProductGrid from "./products-grid";

export default async function Products() {
  const products = await getProducts();

  return <ProductGrid products={products} />;
}
