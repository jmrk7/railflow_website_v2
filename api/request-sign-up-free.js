import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api/routes/",

  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "allowed-party-secret": "shhhsecret",
    token: process.env.ALLOWED_PARTY_SECRET,
  },
});

const requestSignUp = async (data) => {
  const response = await apiClient.request({
    method: "POST",
    url: "/register-cli",
    data,
  });

  return response;
};

export default requestSignUp;
