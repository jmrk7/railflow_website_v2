import axios from "axios";

/**
 * Init an axios client
 * @param {*} baseURL API Url that you want to call
 * @returns Initialized Axios
 */
async function getApiClient(baseURL) {
  const apiClient = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  return apiClient;
}

module.exports = {
  getApiClient,
};
