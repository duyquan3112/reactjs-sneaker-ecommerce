import React from "react";

const PageBanner = ({ title, bannerImage }) => {
  return (
    <div
      id="page-banner"
      className="relative w-full max-h-[20rem] aspect-[16/9] overflow-hidden"
    >
      <img
        src={bannerImage}
        alt="Page Banner"
        className="w-full h-full object-cover object-center blur-sm"
      />
      <div className="absolute inset-0 bg-black/0 flex items-center justify-center">
        <p className="text-black text-2xl md:text-3xl font-bold text-center lg:text-4xl">
          {title}
        </p>
      </div>
    </div>
  );
};

export default React.memo(PageBanner);
