import MockupData from "../../../utils/MockupData";
import { ProductLineCard } from "../../../components";

const HomeProductsGroup = () => {
  const productLineData = MockupData.productLineData;
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <p className="text-2xl font-bold">Walk in Style</p>
        <p className="text-sm text-gray-500 text-center">
          Where every step becomes a masterpiece
        </p>
      </div>
      <div className="w-full mt-4">
        <div className="flex gap-5 w-full overflow-x-auto px-3 sm:px-4">
          {productLineData.map((productLine) => (
            <div key={productLine.id} className="w-full">
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

export default HomeProductsGroup;
