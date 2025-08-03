const ProductLineCard = ({ image, title, onClick }) => {
  return (
    <button
      className="flex flex-col gap-6 items-center w-full min-w-[14rem]"
      onClick={onClick}
    >
      <img
        src={image}
        alt="Line Picture"
        className="aspect-[9/16] w-full object-cover rounded-md shadow-md"
      />

      <p className="font-semibold text-gray-500 text-center">{title}</p>
    </button>
  );
};

export default ProductLineCard;
