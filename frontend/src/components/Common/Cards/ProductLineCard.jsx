const ProductLineCard = ({ image, title }) => {
  return (
    <div className="flex flex-col gap-6 items-center">
      <div className="w-[14rem] h-[22rem] md:w-[24rem] md:h-[32rem]">
        <img
          src={image}
          alt="Line Picture"
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <p className="font-semibold text-gray-500 text-center">{title}</p>
    </div>
  );
};

export default ProductLineCard;
