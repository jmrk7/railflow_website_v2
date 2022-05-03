import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.railflow.io/api/',

  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'allowed-party-secret': 'shhhsecret',
    token: process.env.GATSBY_ALLOWED_PARTY_SECRET,
  },
});

const requestSignUp = async data => {
  const response = await apiClient.request({
    method: 'POST',
    url: '/register',
    data,
  })

  return response
}

export default requestSignUp
