import { CircularLoading } from "../../../components";
import { lazy } from "react";
import useProductsHome from "../hooks/useProductsHome";
const HomeCarouselBanner = lazy(() =>
  import("../components/HomeCarouselBanner.jsx")
);
const HomeProductsView = lazy(() =>
  import("../components/HomeProductsView.jsx")
);

const HomePage = () => {
  const { data: response, isPending, isError } = useProductsHome();

  const productList = response?.data || [];

  if (isError) {
    throw new Error();
  }

  return (
    <>
      {isPending ? (
        <CircularLoading />
      ) : (
        <>
          <HomeCarouselBanner />
          <HomeProductsView productList={productList || []} />
        </>
      )}
    </>
  );
};

export default HomePage;
