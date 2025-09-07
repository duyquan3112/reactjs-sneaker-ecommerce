import { OutlineButton } from "../../../components";
import HomeNewArrivalBanner from "./HomeNewArrivalBanner.jsx";

const HomeNewArrivalSection = () => {
  return (
    <div className="mt-14 mb-14 w-screen bg-topbar-black px-4 md:px-24 py-12 overflow-hidden">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 lg:gap-12">
        <div className="flex flex-col gap-2 flex-shrink-0 lg:max-w-md w-full mx-auto">
          <h3 className="text-white text-2xl lg:text-3xl font-bold uppercase">
            Explore our new arrivals
          </h3>
          <p className="text-white font-semibold text-lg">
            New Heat for Your Feet
          </p>
          <p className="text-gray-100 text-sm lg:text-base">
            Stay ahead of the trend with the latest and greatest in sneaker
            culture.
          </p>
          <OutlineButton className="hidden lg:block w-fit mt-6 border-white text-white hover:border-white/60 hover:text-white/60">
            Explore Now
          </OutlineButton>
        </div>
        <div className="w-full">
          <HomeNewArrivalBanner />
        </div>
      </div>

      <OutlineButton className="lg:hidden mt-6 border-white text-white hover:border-white/60 hover:text-white/60">
        Explore Now
      </OutlineButton>
    </div>
  );
};

export default HomeNewArrivalSection;
