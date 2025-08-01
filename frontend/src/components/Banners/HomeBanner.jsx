import React, { useState, useEffect } from "react";
import MockupData from "../../mocks/MockupData";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

const HomeBanner = () => {
  const bannerData = MockupData.homeBannerData;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const loopCounter = setInterval(() => {
      if (!isTransitioning) {
        nextSlide();
      }
    }, 4000);

    return () => clearInterval(loopCounter);
  }, [currentIndex, isTransitioning]);

  const nextSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerData.length);
      setIsTransitioning(false);
    }, 200);
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(
        (prev) => (prev - 1 + bannerData.length) % bannerData.length
      );
      setIsTransitioning(false);
    }, 200);
  };

  const goToSlide = (index) => {
    if (index !== currentIndex && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(index);
        setIsTransitioning(false);
      }, 200);
    }
  };

  return (
    <div className="relative w-full h-[15rem] md:h-[32rem] overflow-hidden">
      <div className="relative w-full h-full">
        {bannerData.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-all duration-300 ease-in-out ${
              index === currentIndex
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            }`}
          >
            <img
              src={banner.image}
              alt={`banner-${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-between px-4">
        <button
          onClick={prevSlide}
          disabled={isTransitioning}
          className="p-2 bg-black/30 md:hover:bg-black/50 border border-white/50 rounded-full transition-all duration-300 md:hover:scale-105 active:scale-95 disabled:opacity-50 touch-manipulation"
        >
          <HiOutlineChevronLeft className="text-white text-2xl h-8 w-8" />
        </button>
        <button
          onClick={nextSlide}
          disabled={isTransitioning}
          className="p-2 bg-black/30 md:hover:bg-black/50 border border-white/50 rounded-full transition-all duration-300 md:hover:scale-105 active:scale-95 disabled:opacity-50 touch-manipulation"
        >
          <HiOutlineChevronRight className="text-white text-2xl h-8 w-8" />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {bannerData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            disabled={isTransitioning}
            className={`w-6 h-2 rounded-full transition-all duration-300 touch-manipulation ${
              index === currentIndex
                ? "bg-white scale-110"
                : "bg-white/50 hover:bg-white/75 active:bg-white/90"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(HomeBanner);
