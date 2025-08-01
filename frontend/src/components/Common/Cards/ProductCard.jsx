import React from "react";
import FormatUtil from "../../../utils/FormatUtil.js";
import { classMerge } from "../../../utils/twMerge.js";

const ProductCard = ({
  product,
  onClick,
  className = "",
  imageClassName = "",
  contentClassName = "",
  titleClassName = "",
  descriptionClassName = "",
  priceClassName = "",
  comparePriceClassName = "",
}) => {
  return (
    <button
      className={classMerge(
        "col-span-1 min-w-[12rem] shadow-sm rounded-md overflow-hidden",
        className
      )}
      onClick={onClick}
    >
      <div className={classMerge("w-full h-[19rem]", imageClassName)}>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div
        className={classMerge(
          "w-full flex flex-col items-start gap-2 bg-gray-100 p-2",
          contentClassName
        )}
      >
        <p className={classMerge("text-md font-bold", titleClassName)}>
          {product.title}
        </p>
        <p
          className={classMerge("text-sm text-gray-500", descriptionClassName)}
        >
          {product.description}
        </p>
        <p className="text-sm space-x-2">
          <span
            className={classMerge("text-black font-semibold", priceClassName)}
          >
            {FormatUtil.formatPrice(product.price)}
          </span>
          <span
            className={classMerge(
              "text-xs italic line-through text-gray-400",
              comparePriceClassName
            )}
          >
            {FormatUtil.formatPrice(product.comparePrice)}
          </span>
        </p>
      </div>
    </button>
  );
};

export default React.memo(ProductCard);
