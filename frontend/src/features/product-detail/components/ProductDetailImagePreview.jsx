import React, { useState } from "react";

const ImagePreview = ({ images }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  return (
    <div className="flex flex-col w-full lg:w-[50%] h-full gap-8 items-center justify-center">
      <div className="relative w-full h-full aspect-[16/9]">
        <div className="absolute inset-0 rounded-lg">
          {images.map((imgage, index) => {
            return (
              <div
                key={`${imgage} ${index}`}
                className={`${
                  index === activeImageIndex ? "block" : "hidden"
                } w-full h-full relative z-10 rounded-lg`}
              >
                <img
                  src={imgage}
                  alt={`image ${index + 1}`}
                  className={`w-full h-full object-center object-cover lg:object-contain rounded-lg`}
                />
              </div>
            );
          })}
          <div className="absolute bg-black/50 inset-0 z-0 rounded-lg">
            <img
              src={images[activeImageIndex]}
              alt={`image ${activeImageIndex + 1}`}
              className={`w-full h-full object-center object-cover opacity-30 rounded-lg`}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center gap-2 md:gap-8 w-full h-full overflow-x-auto">
        {images.map((imgage, index) => {
          return (
            <button
              key={index}
              className="w-[4rem] h-[4rem] md:w-[5rem] md:h-[5rem] lg:w-[6rem] lg:h-[6rem] border-2 border-transparent rounded-lg aspect-square"
              onClick={() => setActiveImageIndex(index)}
            >
              <img
                src={imgage}
                alt={`image ${index + 1}`}
                className={`w-full h-full object-cover rounded-lg border-2 ${
                  index === activeImageIndex
                    ? "border-topbar-black"
                    : "border-transparent opacity-70"
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(ImagePreview);
