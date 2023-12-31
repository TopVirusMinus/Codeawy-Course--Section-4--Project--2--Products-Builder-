import { HTMLAttributes } from "react";

interface IProps extends HTMLAttributes<HTMLSpanElement> {
  hex: string;
}

const Color = ({ hex, ...rest }: IProps) => {
  return (
    <span
      className={`inline-block w-5 h-5 rounded-full cursor-pointer`}
      style={{ backgroundColor: hex }}
      {...rest}
    />
  );
};

export default Color;
