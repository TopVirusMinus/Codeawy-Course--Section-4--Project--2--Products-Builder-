import "./App.css";
import { useState } from "react";
import ProductCard from "./components/ProductCard";
import { productList } from "./data";
import Modal from "./components/ui/Modal";
import Button from "./components/ui/Button";

const App = () => {
  let [isOpen, setIsOpen] = useState(true);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const productCardsList = productList.map((product) => (
    <ProductCard product={product} key={product.id} />
  ));

  return (
    <main className="container mx-auto">
      <div className="mt-2">
        <Button onClick={openModal} className="bg-indigo-600 text-white">
          Add new Product
        </Button>
      </div>
      <Modal
        title="ADD A NEW PRODUCT"
        isOpen={isOpen}
        closeModal={closeModal}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-4">
        {productCardsList}
      </div>
    </main>
  );
};

export default App;
