import MockupData from "../../mocks/MockupData";

const NewArrivalBanner = () => {
  const bannerData = MockupData.newArrivalBannerData;
  return (
    <button className="w-full h-full overflow-hidden">
      <img
        src={bannerData.image}
        alt={bannerData.id}
        className="w-full h-full object-cover"
      />
    </button>
  );
};

export default NewArrivalBanner;
