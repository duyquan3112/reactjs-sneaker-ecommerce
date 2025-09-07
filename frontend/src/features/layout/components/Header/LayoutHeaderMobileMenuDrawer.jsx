import { useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router";
import AppConstants from "../../../constants/AppConstants";

const LayoutMobileMenuDrawer = ({
  isMobileNavBarOpen,
  handleOpenMobileNavBar,
}) => {
  const mainCategories = AppConstants.mainCategories;

  useEffect(() => {
    if (isMobileNavBarOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    // Cleanup khi component unmount
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isMobileNavBarOpen]);
  return (
    <>
      {isMobileNavBarOpen && (
        <div
          onClick={handleOpenMobileNavBar}
          className="fixed inset-0 bg-black bg-opacity-25 z-40 transition-opacity duration-300"
        ></div>
      )}
      <div
        className={`fixed top-0 left-0 bg-white w-3/4 sm:w-1/2 md:w-1/3 h-full shadow-lg transform transition-transform duration-300 z-50 ${
          isMobileNavBarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end w-full">
          <div className="flex justify-between w-full p-4 bg-gray-100">
            <div className="flex flex-1 justify-center">
              <p className="font-semibold text-lg text-black">Menu</p>
            </div>
            <button onClick={handleOpenMobileNavBar}>
              <IoMdClose className="h-6 w-6 text-icon-gray md:hover:scale-105 md:hover:text-black" />
            </button>
          </div>
        </div>
        <nav className="flex flex-col space-y-4 p-4">
          {mainCategories.map((cat, index) => (
            <Link
              key={cat.index}
              to={cat.route}
              className="flex justify-between items-center text-icon-gray md:hover:text-black text-sm font-medium uppercase"
            >
              {cat.name}
              <span className="ml-2 text-base text-gray-400">&gt;</span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default LayoutMobileMenuDrawer;
