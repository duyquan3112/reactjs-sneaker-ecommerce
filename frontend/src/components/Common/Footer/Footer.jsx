import React from "react";
import FooterSupportCenter from "./FooterSupportCenter.jsx";
import FooterNavLink from "./FooterNavLink.jsx";
import FooterStoreInfo from "./FooterStoreInfo.jsx";
import FooterSubscribe from "./FooterSubscribe.jsx";
import FooterCopyRight from "./FooterCopyRight.jsx";

const Footer = () => {
  return (
    <footer className="mt-auto border-t py-12 md:px-24 px-4 w-full bg-white">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-6 gap-12 px-4 lg:px-0">
        <FooterStoreInfo />
        <FooterNavLink />
        <FooterSupportCenter />
        <FooterSubscribe />
      </div>
      <div className="mt-12 border-t border-gray-200 pt-4">
        <FooterCopyRight />
      </div>
    </footer>
  );
};

export default React.memo(Footer);
