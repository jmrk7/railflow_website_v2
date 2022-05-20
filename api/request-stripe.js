import apiClient from "./api-client";

const requestStripe = async (data) => {
  console.log(`> hiveage request received: ${apiClient}`);

  let url;
  data.pay_method === "Quote"
    ? (url = "/stripe/quote")
    : (url = "/stripe/invoice")

  const response = await apiClient.request({
    method: "POST",
    url: url,
    data,
  });

  console.log(`> invoice POST url: ${apiClient.url}`);

  return response;
};

export default requestStripe;
