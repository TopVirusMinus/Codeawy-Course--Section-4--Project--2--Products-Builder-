import { InputHTMLAttributes } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = ({ ...rest }: IProps) => {
  return (
    <input
      className="border-[1px] p-3 text-md rounded-md focus:outline-none focus:ring-1 focus:border-indigo-500 focus:ring-indigo-500 border-gray-300 shadow-md"
      {...rest}
    />
  );
};

export default Input;
