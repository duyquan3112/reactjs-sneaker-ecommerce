import React from "react";
import { IoLogoInstagram, IoLogoFacebook } from "react-icons/io";
import { IoLogoTiktok } from "react-icons/io5";

function TopBar() {
  return (
    <div className="bg-topbar-black text-white">
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        <div className="hidden md:flex items-center space-x-4">
          <a href="#" className="hover:text-gray-300">
            <IoLogoFacebook className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-gray-300">
            <IoLogoInstagram className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-gray-300">
            <IoLogoTiktok className="h-4 w-4" />
          </a>
        </div>
        <div className="text-sm text-center flex-grow">
          <span>We Don't Just Sell Shoes, We Walk With You</span>
        </div>
        <div className="hidden md:block text-sm">
          <a href="tel:+84778906231" className="hover:text-gray-300 ">
            +84 77 890 6231
          </a>
          <span className="mx-2 italic">(Mr. Quan)</span>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
