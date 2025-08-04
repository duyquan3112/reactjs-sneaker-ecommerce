import ProductCard from "../Common/Cards/ProductCard.jsx";

const ProductList = ({ productList }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-[20rem] sm:w-full px-4 sm:px-0">
      {productList.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
