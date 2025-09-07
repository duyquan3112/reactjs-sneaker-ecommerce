import HomeProductsGroup from "./HomeProductsGroup.jsx";
import HomeProductsList from "./HomeProductsList.jsx";
import HomeNewArrivalSection from "./HomeNewArrivalSection.jsx";
import HomeCustomerFeedback from "./HomeCustomerFeedback.jsx";

const HomeProductsView = () => {
  return (
    <div className="w-full flex flex-col gap-8 pt-14 pb-14">
      <div className="w-[80%] mx-auto">
        <HomeProductsGroup />
        <HomeProductsList />
      </div>
      <HomeNewArrivalSection />
      <HomeCustomerFeedback />
    </div>
  );
};

export default HomeProductsView;
