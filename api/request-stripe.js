import apiClient from "./api-client";

const requestStripe = async (data) => {

  let url;
  data.pay_method === "quote"
    ? (url = "/quote")
    : (url = "/stripe/invoice")

  const response = await apiClient.request({
    method: "POST",
    url: url,
    data,
  });

  return response;
};

export default requestStripe;
