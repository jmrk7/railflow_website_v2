import apiClient from "./api-client";

const requestEmailValidate = async (data) => {
  console.log(`> email validate request received: ${apiClient}`);
  const response = await apiClient.request({
    method: "GET",
    url: "/contact",
    params: data,
  });

  console.log(`> email validate with url: ${apiClient.url}`);

  return response;
};

export default requestEmailValidate;
