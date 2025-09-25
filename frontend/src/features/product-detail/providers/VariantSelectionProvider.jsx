import AppLogger from "../../../utils/AppLogger.js";
import { VariantSelectionContext } from "../contexts/index.js";
import { useState } from "react";

const VariantSelectionProvider = ({ children }) => {
  const [selectedVariants, setSelectedVariants] = useState({});

  const selectVariant = (type, value) => {
    AppLogger.info("Selecting " + type + ": " + value);
    setSelectedVariants((prev) => ({
      ...prev,
      [type]: value
    }));
  };

  return (
    <VariantSelectionContext.Provider
      value={{ selectedVariants, selectVariant }}
    >
      {children}
    </VariantSelectionContext.Provider>
  );
};

export default VariantSelectionProvider;
