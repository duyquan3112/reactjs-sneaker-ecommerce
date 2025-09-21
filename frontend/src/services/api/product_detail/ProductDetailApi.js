import axiosClient from "../AxiosClient";

const ProductDetailApi = {
  getProductDetail: (id) => {
    const url = `/product/${id}`;
    return axiosClient.get(url);
  },
};

export default ProductDetailApi;
