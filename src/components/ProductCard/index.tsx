import { IProduct } from "../../interfaces";
import Button from "../ui/Button";
import { sliceText } from "../../utils/functions";

interface IProps {
  product: IProduct;
}

const ProductCard = ({ product }: IProps) => {
  const { title, description, imageURL, category } = product;

  return (
    <div className="flex flex-col space-y-3 border rounded-md p-2 max-w-sm mx-auto md:max-w-lg md:mx-0">
      <img
        src={imageURL}
        alt="car"
        className="mx-auto h-52 w-full object-cover"
      />

      <p className="mt-3 font-semibold text-lg">{title}</p>
      <p className="text-sm text-gray-500 break-words">
        {sliceText(description)}
      </p>

      <div className="flex space-x-2 mt-3">
        <div className="w-5 h-5 bg-indigo-600 rounded-full" />
        <div className="w-5 h-5 bg-yellow-600 rounded-full" />
        <div className="w-5 h-5 bg-red-600 rounded-full" />
      </div>

      <div className="flex justify-between items-center mt-3">
        <p className="text-lg text-indigo-600 font-semibold">$500,000</p>
        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold">{category.name}</span>
          <img
            src={category.imageURL}
            alt={category.name}
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
      </div>

      <div className="flex text-white space-x-2 mt-3">
        <Button className=" bg-red-600">EDIT</Button>
        <Button className="bg-indigo-600">DELETE</Button>
      </div>
    </div>
  );
};

export default ProductCard;
