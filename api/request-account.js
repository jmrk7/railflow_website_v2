import apiClient from "./api-client";

const requestAccount = async (data) => {
  const response = await apiClient.request({
    method: "PUT",
    url: "/account",
    data,
  });

  return response;
};

export default requestAccount;
