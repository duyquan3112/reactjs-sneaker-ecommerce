import { ProductDetailApi } from "../../../services/api";
import { useQuery } from "@tanstack/react-query";

const useProductDetail = (id) => {
  return useQuery({
    queryKey: ["product", "detail", id],
    queryFn: () => ProductDetailApi.getProductDetail(id),
  });
};

export default useProductDetail;
