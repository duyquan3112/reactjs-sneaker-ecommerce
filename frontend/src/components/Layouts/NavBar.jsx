import { Link } from "react-router";
import {
  HiOutlineUserCircle,
  HiOutlineShoppingBag,
  HiMiniBars3BottomRight,
} from "react-icons/hi2";
import { SearchBar } from "../Common/Forms/SearchBar.jsx";
import { useState } from "react";
import CartDrawer from "./CartDrawer.jsx";
import AppConstants from "../../constants/AppConstants.js";
import MobileMenuDrawer from "./MobileMenuDrawer.jsx";

function NavBar() {
  const mainCategories = AppConstants.mainCategories;

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  const [isMobileNavBarOpen, setIsMobileNavBarOpen] = useState(false);

  const handleToggleCartDrawer = () => {
    setIsCartDrawerOpen((isCartDrawerOpen) => !isCartDrawerOpen);
  };

  const handleOpenMobileNavBar = () => {
    setIsMobileNavBarOpen((isMobileNavBarOpen) => !isMobileNavBarOpen);
  };

  return (
    <>
      <nav className="container mx-auto flex items-center justify-between px-6 py-4">
        <div>
          <Link
            to="/"
            className="flex items-center justify-center space-x-4 group"
          >
            <img
              src="/logo-2x.png"
              alt="Brand Logo"
              className="object-contain h-8 w-8 scale-125 md:group-hover:scale-150 md:group-hover:rotate-12 transition-all duration-300 ease-in-out min-h-8 min-w-8"
            />
            <span className="font-title font-semibold text-lg">Dee Vu</span>
          </Link>
        </div>
        <div className="hidden md:flex gap-6">
          {mainCategories.map((cat) => (
            <Link
              key={cat.index}
              to={cat.route}
              className="relative text-icon-gray md:hover:text-black text-sm font-medium uppercase group"
            >
              {cat.name}
              <span className="absolute left-1/2 -bottom-1 h-0.5 w-full bg-gray-600 scale-x-0 origin-center transition-transform duration-300 group-hover:scale-x-100 -translate-x-1/2"></span>
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-6">
          <Link to="/profile">
            <HiOutlineUserCircle className="h-7 w-7 text-icon-gray md:hover:text-black md:hover:scale-105" />
          </Link>
          <button onClick={handleToggleCartDrawer} className="relative">
            <HiOutlineShoppingBag className="h-6 w-6 text-icon-gray  md:hover:text-black md:hover:scale-105" />
            <span className="absolute -top-1 bg-red-600 text-white text-xs rounded-full px-2 py-0.5">
              4
            </span>
          </button>
          <div className="overflow-hidden">
            <SearchBar />
          </div>
          <button onClick={handleOpenMobileNavBar} className="md:hidden">
            <HiMiniBars3BottomRight className="h-6 w-6 text-icon-gray" />
          </button>
        </div>
      </nav>
      <CartDrawer
        isCartDrawerOpen={isCartDrawerOpen}
        toggleCartDrawer={handleToggleCartDrawer}
      />
      <MobileMenuDrawer
        isMobileNavBarOpen={isMobileNavBarOpen}
        handleOpenMobileNavBar={handleOpenMobileNavBar}
      />
    </>
  );
}

export default NavBar;
