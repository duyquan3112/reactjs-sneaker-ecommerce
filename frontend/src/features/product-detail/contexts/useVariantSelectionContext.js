import { createContext, useContext } from "react";
import AppLogger from "../../../utils/AppLogger";

export const VariantSelectionContext = createContext(null);

export const useVariantSelectionContext = () => {
  const ctx = useContext(VariantSelectionContext);
  if (!ctx) {
    AppLogger.error(
      "useVariantSelectionContext must be used within VariantSelectionProvider"
    );
    throw new Error();
  }

  return ctx;
};
