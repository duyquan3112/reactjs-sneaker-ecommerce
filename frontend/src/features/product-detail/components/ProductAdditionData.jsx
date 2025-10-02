const ProductAdditionData = ({ skus, categories, tags }) => {
  const additionDataArr = [
    { key: "SKU", value: Array.from(skus) },
    { key: "Categories", value: Array.from(categories) },
    { key: "Tags", value: Array.from(tags) },
  ];

  return (
    <div className="space-y-3">
      {additionDataArr.map(({ key, value }) => {
        if (!value || value.length === 0) return null;
        return (
          <div
            key={key}
            className="grid grid-cols-[max-content_1fr] gap-4 items-center"
          >
            <span className="text-gray-500 text-sm font-medium">{key}:</span>
            <span className="text-gray-500 text-sm">{value.join(", ")}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ProductAdditionData;
