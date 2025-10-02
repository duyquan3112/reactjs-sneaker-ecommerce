import { useEffect, useState } from "react";
import { OutlineButton, PrimaryButton } from "../../../components";
import { useDebounce } from "../../../hooks";
import { AppLogger } from "../../../utils";
import AppConstants from "../../../constants/AppConstants";

const ProductAction = ({ onAddToCart, onBuyNow, quantityCallback }) => {
  const [quantity, setQuantity] = useState(1);
  const debounceQuantity = useDebounce(quantity);

  useEffect(() => {
    quantityCallback(debounceQuantity);
  }, [debounceQuantity, quantityCallback]);

  function onIncreaseQuantity() {
    setQuantity((prev) => ++prev);
  }

  function onDecreaseQuantity() {
    setQuantity((prev) => Math.max(AppConstants.minProductQuantity, --prev));
  }

  function onInputQuantity(quantity) {
    setQuantity(
      Math.min(Math.max(1, quantity), AppConstants.maxProductQuantity)
    );
  }

  return (
    <div className="flex gap-4 w-full">
      <div className="flex w-32 justify-between items-center gap-4 border rounded-xl px-4 py-3">
        <button onClick={onDecreaseQuantity}>-</button>
        <input
          name="quantity"
          className="w-full text-center"
          value={quantity}
          type="number"
          onChange={(event) => onInputQuantity(event.currentTarget.value)}
        />
        <button onClick={onIncreaseQuantity}>+</button>
      </div>
      <OutlineButton onClick={onAddToCart}>Add To Cart</OutlineButton>
      <PrimaryButton onClick={onBuyNow}>Buy Now</PrimaryButton>
    </div>
  );
};

export default ProductAction;
