import { HomeApi } from "../../../services/api";
import { useQuery } from "@tanstack/react-query";

const useProductsHome = () => {
  return useQuery({
    queryKey: ["products", "home"],
    queryFn: HomeApi.getHomeProducts,
  });
};

export default useProductsHome;
