import "./App.css";
import { FormEvent, useState, ChangeEvent } from "react";
import ProductCard from "./components/ProductCard";
import { categories, productList } from "./data";
import Modal from "./components/ui/Modal";
import Button from "./components/ui/Button";
import { IProduct } from "./interfaces";
import { colors, formInputsList } from "./data";
import Input from "./components/ui/Input";
import { ValidateProductInput } from "./validation";
import ErrorMessage from "./components/ui/ErrorMessage";
import Select from "./components/ui/Select";
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
    colors: "";
  }
  const defaultErrorObj: IErrorObj = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: "",
  };

  /* ------ States ------ */
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setEditIsOpen] = useState(false);
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [inputData, setInputData] = useState<IProduct>(defaultInputObj);
  const [currEditData, setCurrEditData] = useState<IProduct>(defaultInputObj);
  const [currEditDataIdx, setCurrEditDataIdx] = useState<number>(0);
  const [errorData, setErrorData] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: "",
  });
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedEditColors, setSelectedEditColors] = useState<string[]>([]);
  const [selected, setSelected] = useState(categories[0]);

  /* ------ Handlers ------ */
  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeEditModal = () => {
    setEditIsOpen(false);
  };
  const openEditModal = () => {
    setEditIsOpen(true);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInputData((prev) => ({ ...prev, [name]: value }));
    setErrorData((prev) => ({ ...prev, [name]: "" }));
  };

  const handleEditInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setCurrEditData((prev) => ({ ...prev, [name]: value }));
    setErrorData((prev) => ({ ...prev, [name]: "" }));
  };

  const clearForm = () => {
    setInputData(defaultInputObj);
    setErrorData(defaultErrorObj);
    setSelectedColors([]);
  };

  const handleClose = () => {
    console.log("closing modal");
    clearForm();
    closeModal();
  };

  const handleEditClose = () => {
    console.log("closing modal");
    clearForm();
    closeEditModal();
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const errorObj = ValidateProductInput({
      ...inputData,
      colors: selectedColors,
    });
    const isError = !Object.values(errorObj).every((value) => value === "");

    if (isError) {
      setErrorData(errorObj);
      return;
    }

    console.log("No Validation Errors");
    setProducts((prev) => [
      { ...inputData, colors: selectedColors, id: uuid(), category: selected },
      ...prev,
    ]);
    closeModal();
  };
  const submitEditHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const errorObj = ValidateProductInput({
      ...currEditData,
      colors: selectedEditColors,
    });
    const isError = !Object.values(errorObj).every((value) => value === "");

    if (isError) {
      setErrorData(errorObj);
      return;
    }

    console.log("No Validation Errors");
    const newProducts = [...products];
    newProducts[currEditDataIdx] = {
      ...currEditData,
      colors: selectedEditColors,
      category: currEditData.category,
    };

    setProducts(newProducts);
    closeEditModal();
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
  const inputEditFormData = formInputsList.map((input) => {
    return (
      <div className="flex flex-col mb-2" key={input.id}>
        <label htmlFor={input.id}>{input.label}</label>
        <Input
          onChange={(e) => handleEditInputChange(e)}
          value={currEditData[input.name]}
          id={input.id}
          type={input.type}
          name={input.name}
        />
        <ErrorMessage msg={errorData[input.name]} />
      </div>
    );
  });
  console.log(currEditData);
  const colorData = colors.map((c) => (
    <Color
      key={c}
      hex={c}
      onClick={() => {
        if (selectedColors.includes(c)) {
          setSelectedColors((prev) => prev.filter((color) => color !== c));
          return;
        }
        setErrorData((prev) => ({ ...prev, colors: "" }));
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

  const colorEditLabels = selectedEditColors.map((c) => (
    <span
      key={uuid()}
      className="px-1 text-center text-white rounded-md"
      style={{ backgroundColor: c }}
    >
      {c}
    </span>
  ));
  const colorEditData = colors.map((c) => (
    <Color
      key={c}
      hex={c}
      onClick={() => {
        if (selectedEditColors.includes(c)) {
          setSelectedEditColors((prev) => prev.filter((color) => color !== c));
          return;
        }
        setErrorData((prev) => ({ ...prev, colors: "" }));
        setSelectedEditColors((prev) => [...prev, c]);
      }}
    />
  ));

  const productCardsList = products.map((product, idx) => {
    return (
      <ProductCard
        product={product}
        key={product.id}
        openEditModal={openEditModal}
        setCurrEditData={setCurrEditData}
        setSelectedEditColors={setSelectedEditColors}
        index={idx}
        setCurrEditDataIdx={setCurrEditDataIdx}
      />
    );
  });
  console.log(currEditDataIdx);

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
          <ErrorMessage msg={errorData["colors"]} />
          <div className="grid grid-cols-5 gap-2">{colorLabels}</div>
          <Select selected={selected} setSelected={setSelected} />
          <div className="flex text-white gap-2">
            <Button className="bg-indigo-600">Add Product</Button>
            <Button onClick={handleClose} type="button" className="bg-gray-400">
              Close
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        title="EDIT THIS PRODUCT"
        isOpen={isEditOpen}
        closeModal={closeEditModal}
      >
        <form className="space-y-3" onSubmit={(e) => submitEditHandler(e)}>
          {inputEditFormData}
          <div className="flex flex-wrap space-x-1">{colorEditData}</div>
          <ErrorMessage msg={errorData["colors"]} />
          <div className="grid grid-cols-5 gap-2">{colorEditLabels}</div>
          <Select
            selected={currEditData.category}
            setSelected={(value) =>
              setCurrEditData({ ...currEditData, category: value })
            }
          />
          <div className="flex text-white gap-2">
            <Button className="bg-indigo-600">Save Changes</Button>
            <Button
              onClick={handleEditClose}
              type="button"
              className="bg-gray-400"
            >
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
