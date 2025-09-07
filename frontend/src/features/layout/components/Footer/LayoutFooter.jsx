import React from "react";
import LayoutFooterSupportCenter from "./LayoutFooterSupportCenter.jsx";
import LayoutFooterNavLink from "./LayoutFooterNavLink.jsx";
import LayoutFooterStoreInfo from "./LayoutFooterStoreInfo.jsx";
import LayoutFooterSubscribe from "./LayoutFooterSubscribe.jsx";
import LayoutFooterCopyRight from "./LayoutFooterCopyRight.jsx";

const LayoutFooter = () => {
  return (
    <footer className="mt-auto border-t py-8 md:px-20 px-4 w-full bg-white">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-6 gap-12 px-4 lg:px-0">
        <LayoutFooterStoreInfo />
        <LayoutFooterNavLink />
        <LayoutFooterSupportCenter />
        <LayoutFooterSubscribe />
      </div>
      <div className="mt-12 border-t border-gray-200 pt-4">
        <LayoutFooterCopyRight />
      </div>
    </footer>
  );
};

export default React.memo(LayoutFooter);
