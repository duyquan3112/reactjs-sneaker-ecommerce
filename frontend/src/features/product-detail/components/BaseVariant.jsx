import React from "react";

const BaseVariant = ({ title, children }) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-normal text-sm text-gray-500">{title}</p>
      {children}
    </div>
  );
};

export default BaseVariant;
