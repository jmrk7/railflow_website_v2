import apiClient from "./api-client";

const requestHiveage = async (data) => {
  console.log(`> hiveage request received: ${apiClient}`);
  const response = await apiClient.request({
    method: "POST",
    url: "/hiveage",
    data,
  });

  console.log(`> invoice POST url: ${apiClient.url}`);

  return response;
};

export default requestHiveage;
