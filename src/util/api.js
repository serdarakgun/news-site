'use client';
import axios from 'axios';
import { hostUrl } from './constants';
import { clearStorage } from './util-functions.ts';

const axiosClient = axios.create({
  baseURL: hostUrl,
});

axiosClient.interceptors.request.use(
  function (config) {
    const token = JSON.parse(localStorage.getItem('session'))?.accessToken;
    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  },
  function (error) {
    return error?.response;
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      clearStorage();
      window.location.href = '/auth/login';
    }
    return error?.response;
  }
);

export default axiosClient;
