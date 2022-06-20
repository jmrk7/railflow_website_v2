import apiClient from "./api-client";

const requestEmailValidate = async (data) => {
  const response = await apiClient.request({
    method: "GET",
    url: "/contact",
    params: data,
  });

  return response;
};

export default requestEmailValidate;
