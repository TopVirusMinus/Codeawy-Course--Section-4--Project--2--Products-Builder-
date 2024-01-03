interface IInput {
  title: string;
  description: string;
  imageURL: string;
  price: string;
  colors: string[];
}
interface IError extends Omit<IInput, "colors"> {
  colors: string;
}

/**
 * Validates the input for a product.
 *
 * @param {object} product - The product input object.
 * @param {string} product.title - The title of the product.
 * @param {string} product.description - The description of the product.
 * @param {string} product.imageURL - The image URL of the product.
 * @param {string} product.price - The price of the product.
 * @param {string[]} product.colors - The colors of the product.
 *
 * @returns {object} errors - Object containing validation errors.
 * @returns {string} errors.title - Validation error for the title.
 * @returns {string} errors.description - Validation error for the description.
 * @returns {string} errors.imageURL - Validation error for the image URL.
 * @returns {string} errors.price - Validation error for the price.
 * @returns {string[]} errors.colors - Validation error for colors.
 */

export const ValidateProductInput = (product: IInput) => {
  const errors: IError = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: "",
  };

  const imgUrlRegex =
    /\b(?:https?|ftp|http):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]*[-A-Za-z0-9+&@#/%=~_|]/;

  if (
    !product.title.trim() ||
    product.title.length < 10 ||
    product.title.length > 80
  ) {
    errors.title = "Title must be between 10 and 80 characters!";
  }

  if (
    !product.description.trim() ||
    product.description.length < 10 ||
    product.description.length > 900
  ) {
    errors.description = "Description must be between 10 and 900 characters!";
  }

  if (!product.imageURL.trim() || !imgUrlRegex.test(product.imageURL)) {
    errors.imageURL = "Image URL is not valid!";
  }

  if (!product.price.trim() || isNaN(Number(product.price))) {
    errors.price = "Price is not valid!";
  }
  console.log(product);
  if (product.colors.length < 1) {
    errors.colors = "You must choose a color!";
  }
  console.log("errors");
  console.log(errors);

  return errors;
};
