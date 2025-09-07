import { IoMdClose } from "react-icons/io";
import { CartList } from "../../../cart/components";
import { useEffect } from "react";
import { PrimaryButton } from "../../../../components";

const LayoutHeaderCartDrawer = ({ isCartDrawerOpen, toggleCartDrawer }) => {
  useEffect(() => {
    if (isCartDrawerOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    // Cleanup khi component unmount
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isCartDrawerOpen]);

  return (
    <>
      {/* Overlay */}
      {isCartDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-40 transition-opacity duration-300"
          onClick={toggleCartDrawer}
        ></div>
      )}
      <div
        className={`fixed top-0 right-0 w-3/4 h-full sm:w-1/2 md:w-[30rem] bg-white flex flex-col transition-transform duration-300 shadow-lg z-50 ${
          isCartDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-row justify-between p-4 bg-gray-100">
          <p className="font-semibold text-lg text-black"> Your Cart</p>
          <button onClick={toggleCartDrawer}>
            <IoMdClose className="h-6 w-6 text-icon-gray md:hover:scale-105 md:hover:text-black" />
          </button>
        </div>
        <div className="flex flex-grow w-full px-4 py-2 overflow-y-auto overflow-x-clip">
          <CartList />
        </div>
        <div className="sticky bottom-0 bg-white p-4 w-full mx-auto">
          <PrimaryButton className="w-full">Check Out</PrimaryButton>
          <p className="italic tracking-tighter text-xs text-gray-700 mt-2 text-center">
            Shipping, taxes and discount voucher will be displayed in checkout
            page.
          </p>
        </div>
      </div>
    </>
  );
};

export default LayoutHeaderCartDrawer;
