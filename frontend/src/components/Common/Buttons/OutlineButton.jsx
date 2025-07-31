const OutlineButton = ({ children, onClick, type = "button" }) => {
  return (
    <button
      className="border border-topbar-black rounded-md px-4 py-2 text-topbar-black hover:border-topbar-black/60 hover:text-topbar-black/60 transition-all duration-200"
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default OutlineButton;
