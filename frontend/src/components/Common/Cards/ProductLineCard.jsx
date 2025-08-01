const ProductLineCard = ({ image, title, onClick }) => {
  return (
    <button className="flex flex-col gap-6 items-center" onClick={onClick}>
      <div className="w-[14rem] h-[22rem] md:w-[24rem] md:h-[32rem]">
        <img
          src={image}
          alt="Line Picture"
          className="w-full h-full object-cover rounded-md shadow-md"
        />
      </div>
      <p className="font-semibold text-gray-500 text-center">{title}</p>
    </button>
  );
};

export default ProductLineCard;
