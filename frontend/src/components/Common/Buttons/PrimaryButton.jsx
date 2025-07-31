const PrimaryButton = ({ children, onClick, type = "button" }) => {
  return (
    <button
      className="bg-topbar-black hover:bg-topbar-black/80 text-white px-4 py-2 rounded-md transition-all duration-200"
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
