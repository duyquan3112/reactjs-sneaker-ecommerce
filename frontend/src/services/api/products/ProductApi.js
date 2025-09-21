import axiosClient from "../AxiosClient";

const ProductApi = {
  getAllProducts: (params) => {
    const url = "/product/all";
    return axiosClient.get(url, { params });
  },
};

export default ProductApi;
