import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes
 * @param {...string} classes - Class strings to merge
 * @returns {string} - Merged class string
 */
export const classMerge = (...classes) => {
  return twMerge(classes);
};

export default classMerge;
