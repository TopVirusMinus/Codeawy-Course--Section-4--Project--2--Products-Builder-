import "./App.css";
import ProductCard from "./components/ProductCard";
import { productList } from "./data";

function App() {
  const productCardsList = productList.map((product) => (
    <ProductCard product={product} key={product.id} />
  ));

  return (
    <main className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-4">
        {productCardsList}
      </div>
    </main>
  );
}

export default App;
