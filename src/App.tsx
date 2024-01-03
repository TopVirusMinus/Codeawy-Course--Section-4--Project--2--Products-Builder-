import "./App.css";
import { FormEvent, useState, ChangeEvent } from "react";
import ProductCard from "./components/ProductCard";
import { productList } from "./data";
import Modal from "./components/ui/Modal";
import Button from "./components/ui/Button";
import { IProduct } from "./interfaces";
import { colors, formInputsList } from "./data";
import Input from "./components/ui/Input";
import { ValidateProductInput } from "./validation";
import ErrorMessage from "./components/ui/ErrorMessage";
import Color from "./components/ui/Color";
import { v4 as uuid } from "uuid";

const App = () => {
  const defaultInputObj = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  };
  interface IErrorObj {
    title: string;
    description: string;
    imageURL: string;
    price: string;
  }
  const defaultErrorObj: IErrorObj = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
  };

  /* ------ States ------ */
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [inputData, setInputData] = useState<IProduct>(defaultInputObj);
  const [errorData, setErrorData] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });

  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  /* ------ Handlers ------ */
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInputData((prev) => ({ ...prev, [name]: value }));
    setErrorData((prev) => ({ ...prev, [name]: "" }));
  };
  const handleClose = () => {
    console.log("closing modal");
    setInputData(defaultInputObj);
    setErrorData(defaultErrorObj);
    closeModal();
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const errorObj = ValidateProductInput(inputData);
    const isError = !Object.values(errorObj).every((value) => value === "");

    if (isError) {
      setErrorData(errorObj);
      return;
    }

    console.log("No Validation Errors");
    setProducts((prev) => [
      { ...inputData, colors: selectedColors, id: uuid() },
      ...prev,
    ]);
  };

  /* ------ Data ------ */
  const inputFormData = formInputsList.map((input) => {
    return (
      <div className="flex flex-col mb-2" key={input.id}>
        <label htmlFor={input.id}>{input.label}</label>
        <Input
          onChange={(e) => handleInputChange(e)}
          value={inputData[input.name]}
          id={input.id}
          type={input.type}
          name={input.name}
        />
        <ErrorMessage msg={errorData[input.name]} />
      </div>
    );
  });

  const colorData = colors.map((c) => (
    <Color
      key={c}
      hex={c}
      onClick={() => {
        if (selectedColors.includes(c)) {
          setSelectedColors((prev) => prev.filter((color) => color !== c));
          return;
        }
        setSelectedColors((prev) => [...prev, c]);
      }}
    />
  ));

  const colorLabels = selectedColors.map((c) => (
    <span
      key={uuid()}
      className="px-1 text-center text-white rounded-md"
      style={{ backgroundColor: c }}
    >
      {c}
    </span>
  ));
  const productCardsList = products.map((product) => (
    <ProductCard product={product} key={product.id} />
  ));

  return (
    <main className="container mx-auto">
      <div className="mt-2 flex justify-center">
        <Button
          onClick={openModal}
          className="bg-indigo-600 text-white"
          width="w-fit"
        >
          Add new Product
        </Button>
      </div>
      <Modal title="ADD A NEW PRODUCT" isOpen={isOpen} closeModal={closeModal}>
        <form className="space-y-3" onSubmit={submitHandler}>
          {inputFormData}
          <div className="flex flex-wrap space-x-1">{colorData}</div>
          <div className="grid grid-cols-5 gap-2">{colorLabels}</div>
          <div className="flex text-white gap-2">
            <Button className="bg-indigo-600">Add Product</Button>
            <Button onClick={handleClose} type="button" className="bg-gray-400">
              Close
            </Button>
          </div>
        </form>
      </Modal>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-4">
        {productCardsList}
      </div>
    </main>
  );
};

export default App;
