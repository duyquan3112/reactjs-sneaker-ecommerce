import React from "react";
import FormatUtil from "../../utils/FormatUtil.js";
import { classMerge } from "../../utils/TwMerge.js";

const ProductCard = ({
  product,
  onClick,
  className = "",
  imageClassName = "",
  contentClassName = "",
  titleClassName = "",
  descriptionClassName = "",
  priceClassName = "",
  comparePriceClassName = ""
}) => {
  return (
    <button
      className={classMerge(
        "flex flex-col w-full min-w-[12rem] shadow-sm hover:shadow-md rounded-md overflow-hidden",
        className
      )}
      onClick={onClick}
    >
      <div className={classMerge("w-full aspect-[3/4]", imageClassName)}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div
        className={classMerge(
          "flex-1 w-full flex flex-col items-start justify-between gap-2 bg-gray-100 p-2",
          contentClassName
        )}
      >
        <p
          className={classMerge(
            "text-md font-bold truncate overflow-ellipsis",
            titleClassName
          )}
        >
          {product.name}
        </p>
        <p
          className={classMerge("text-sm text-gray-500", descriptionClassName)}
        >
          {product.shortDescription}
        </p>
        <p className="text-sm space-x-2">
          <span
            className={classMerge("text-black font-semibold", priceClassName)}
          >
            {FormatUtil.formatPrice(product.basePrice)}
          </span>
          {product.baseComparePrice && (
            <span
              className={classMerge(
                "text-xs italic line-through text-gray-400",
                comparePriceClassName
              )}
            >
              {FormatUtil.formatPrice(product.baseComparePrice)}
            </span>
          )}
        </p>
      </div>
    </button>
  );
};

export default React.memo(ProductCard);
