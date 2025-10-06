import React from "react";
import DOMPurify from "dompurify";

const ProductFullDescription = ({ description }) => {
  const sanitizedDescription = DOMPurify.sanitize(description);

  return (
    <div className="w-full h-full flex flex-col gap-6 px-4 md:px-8 py-8">
      <h2 className="text-2xl text-center font-bold text-gray-700">
        Description
      </h2>
      <div
        className="product-description"
        dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
      />
    </div>
  );
};

export default React.memo(ProductFullDescription);
