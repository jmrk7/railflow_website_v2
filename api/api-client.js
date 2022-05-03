import axios from 'axios';

const createApiClient = () => {
  // const baseURL = 'https://api.railflow.io';
  const apiClient = axios.create({
    baseURL: '/api/routes',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'allowed-party-secret': 'shhhsecret',
      token: process.env.ALLOWED_PARTY_SECRET,
    },
  });

  return apiClient;
};

export default createApiClient();

export { createApiClient };
