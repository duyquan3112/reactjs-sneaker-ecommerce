import { IoMdClose } from "react-icons/io";

const CartDrawer = ({ isCartDrawerOpen, toggleCartDrawer }) => {
  return (
    <div
      className={`fixed top-0 right-0 w-3/4 h-full sm:w-1/2 md:w-1/4 bg-white flex flex-col transition-transform duration-300 shadow-lg z-10 ${
        isCartDrawerOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-end p-4">
        <button onClick={toggleCartDrawer}>
          <IoMdClose className="h-6 w-6 text-icon-gray hover:scale-105 hover:text-black" />
        </button>
      </div>
    </div>
  );
};

export default CartDrawer;
