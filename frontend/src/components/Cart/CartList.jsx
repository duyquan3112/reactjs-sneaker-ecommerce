import MockupData from "../../mocks/MockupData";
import CartItem from "./CartItem";

const CartList = () => {
  const items = MockupData.cartListItemData;
  return (
    <div className="w-full">
      {items.map((items, index) => (
        <CartItem key={index} item={items} />
      ))}
    </div>
  );
};

export default CartList;
