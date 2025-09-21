import { ProductApi } from "../../../services/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const useProducts = ({ params }) => {
  return useQuery({
    queryKey: ["products", ...Object.values(params)],
    queryFn: () => ProductApi.getAllProducts(params),
    placeholderData: keepPreviousData,
  });
};

export default useProducts;
