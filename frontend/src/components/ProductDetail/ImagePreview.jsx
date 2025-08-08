import React, { useState } from "react";

const ImagePreview = ({ images }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  return (
    <div className="flex flex-col w-full lg:w-2/3 h-full gap-8 items-center justify-center">
      <div className="relative w-full h-full aspect-[16/9]">
        <div className="absolute inset-0">
          {images.map((imgage, index) => {
            return (
              <img
                key={index}
                src={imgage}
                alt={`image ${index + 1}`}
                className={`${
                  index === activeImageIndex ? "block" : "hidden"
                } w-full h-full object-cover lg:object-fill rounded-lg`}
              />
            );
          })}
        </div>
      </div>
      <div className="flex flex-row items-center gap-8 w-full h-full overflow-x-auto">
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
                    ? "border-blue-500"
                    : "border-transparent"
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ImagePreview;
