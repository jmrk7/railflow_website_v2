import apiClient from "./api-pricing";

const requestPricing = async (params) => {
  const response = await apiClient.request({
    method: "GET",
    url: "/pricing",
    params,
  });
  return response;
};

export default requestPricing;
