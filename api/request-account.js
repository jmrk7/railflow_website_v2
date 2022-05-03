import apiClient from "./api-client";

const requestAccount = async (data) => {
  console.log(`> account request received: ${apiClient}`);
  const response = await apiClient.request({
    method: "PUT",
    url: "/account",
    data,
  });

  console.log(`> account PUT with url: ${apiClient.url}`);

  return response;
};

export default requestAccount;
