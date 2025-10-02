import AppLogger from "../../../utils/AppLogger.js";
import { VariantSelectionContext } from "../contexts/index.js";
import { useState } from "react";

const VariantSelectionProvider = ({ children }) => {
  const [selectedVariants, setSelectedVariants] = useState({});

  const selectVariant = (type, value) => {
    AppLogger.info("Selecting " + type + ": " + value);
    setSelectedVariants((prev) => {
      // Nếu chọn cùng giá trị, bỏ chọn
      if (prev[type] === value) {
        const newSelection = { ...prev };
        delete newSelection[type];
        return newSelection;
      }

      // Nếu chọn type khác, reset type còn lại để tránh conflict
      const newSelection = { [type]: value };

      // Giữ lại selection của type khác nếu nó vẫn hợp lệ
      const otherType = type === "size" ? "color" : "size";
      if (prev[otherType]) {
        newSelection[otherType] = prev[otherType];
      }

      return newSelection;
    });
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
