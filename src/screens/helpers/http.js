import axios from 'axios';

export const http = token => {
  const headers = {};
  if (token) {
    headers.authorization = `Bearer ${token}`;
  }
  return axios.create({
    headers,
  });
};
