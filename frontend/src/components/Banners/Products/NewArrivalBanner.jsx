import MockupData from "../../../mocks/MockupData";

const NewArrivalBanner = () => {
  const bannerData = MockupData.newArrivalBannerData;
  return (
    <button className="w-full aspect-[16/9] overflow-hidden rounded-lg">
      <img
        src={bannerData.image}
        alt={bannerData.id}
        className="w-full h-full object-cover transition-transform duration-300"
      />
    </button>
  );
};

export default NewArrivalBanner;
