import axiosClient from "../AxiosClient";

const HomeApi = {
  getHomeProducts: () => {
    const url = "/product/home";
    return axiosClient.get(url);
  },
};

export default HomeApi;
