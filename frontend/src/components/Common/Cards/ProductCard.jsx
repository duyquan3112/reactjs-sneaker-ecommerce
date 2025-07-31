import FormatUtil from "../../../utils/FormatUtil.js";

const ProductCard = ({ product, isShowActionPanel = true }) => {
  return (
    <div className="col-span-1 min-w-[12rem] shadow-sm rounded-md overflow-hidden">
      <div className="w-full h-[19rem]">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full flex flex-col gap-2 bg-gray-100 p-2">
        <p className="text-md font-bold">{product.title}</p>
        <p className="text-sm text-gray-500">{product.description}</p>
        <p className="text-sm space-x-2">
          <span className="text-black font-semibold">
            {FormatUtil.formatPrice(product.price)}
          </span>
          <span className="text-xs italic line-through text-gray-400">
            {FormatUtil.formatPrice(product.comparePrice)}
          </span>
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
