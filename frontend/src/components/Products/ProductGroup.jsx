import MockupData from "../../mocks/MockupData";
import ProductLineCard from "../Common/Cards/ProductLineCard.jsx";

const ProductGroup = () => {
  const productLineData = MockupData.productLineData;
  return (
    <div className="w-full">
      <div className="flex flex-col items-center gap-2">
        <p className="text-2xl font-bold">Walk in Style</p>
        <p className="text-sm text-gray-500 text-center">
          Where every step becomes a masterpiece
        </p>
      </div>
      <div className="w-full overflow-x-auto mt-4 scrollbar-hide">
        <div className="flex w-fit gap-5 mx-auto">
          {productLineData.map((productLine) => (
            <div key={productLine.id}>
              <ProductLineCard
                title={productLine.title}
                image={productLine.image}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGroup;
