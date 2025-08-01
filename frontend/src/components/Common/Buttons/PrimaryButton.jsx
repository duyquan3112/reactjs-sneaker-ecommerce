import { classMerge } from "../../../utils/twMerge.js";

const PrimaryButton = ({
  children,
  onClick,
  type = "button",
  className = "",
}) => {
  return (
    <button
      className={classMerge(
        "bg-topbar-black hover:bg-topbar-black/80 text-white px-4 py-2 rounded-md transition-all duration-200",
        className
      )}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
