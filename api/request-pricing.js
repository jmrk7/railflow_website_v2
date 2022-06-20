import apiClient from "./api-pricing";

const requestPricing = async (params) => {
  console.log(`> pricing request received: `, apiClient, params);
  const response = await apiClient.request({
    method: "GET",
    url: "/pricing",
    params,
  });
  return response;
};

export default requestPricing;
