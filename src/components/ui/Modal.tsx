import { ChangeEvent, FormEvent, Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { formInputsList } from "../../data";
import Button from "./Button";
import Input from "./Input";
import { IProduct } from "../../interfaces";

interface IProps {
  title: string;
  closeModal: () => void;
  isOpen: boolean;
}

export default function Modal({ title, isOpen, closeModal }: IProps) {
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

  const [inputData, setInputData] = useState<IProduct>(defaultInputObj);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInputData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClose = () => {
    setInputData(defaultInputObj);
    closeModal();
  };

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
      </div>
    );
  });

  function submitHandler(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    console.log(inputData);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 mb-4"
                  >
                    {title}
                  </Dialog.Title>
                  <form className="space-y-3" onSubmit={submitHandler}>
                    {inputFormData}
                    <div className="flex text-white gap-2">
                      <Button className="bg-indigo-600">Add Product</Button>
                      <Button onClick={handleClose} className="bg-gray-400">
                        Close
                      </Button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
