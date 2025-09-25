import {
  ProductDetailImagePreview,
  ProductDetailInfo,
  ProductVariantSelect
} from "./index.js";

const ProductDetailData = ({ product }) => {
  const images = product.images || [];
  return (
    <div className="w-full flex flex-col lg:flex-row gap-12 lg:gap-20 px-4 py-2 bg-white lg:px-24 lg:py-8">
      <ProductDetailImagePreview images={images} />
      <div className="flex-1 flex flex-col gap-4">
        <ProductDetailInfo product={product} />
        <ProductVariantSelect variantTemplate={product.attributesTemplate} />
      </div>
    </div>
  );
};

export default ProductDetailData;
