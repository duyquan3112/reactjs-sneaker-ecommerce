const ChangePageButton = ({ children, onClick, disabled }) => {
  return (
    <button
      disabled={disabled}
      className="min-w-8 min-h-8 sm:min-w-14 sm:min-h-14 rounded-md text-sm font-semibold bg-white text-black lg:hover:bg-gray-200 lg:hover:text-black"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ChangePageButton;
