import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getLocalStorage, removeLocalStorage } from '../helpers/LocalStorage';
import { IAccount } from '../interfaces/IAccount';

export const api = axios.create();

const endpoints = ['login'];

const checkEndpoint = (url: any) => {
  return endpoints.some((endpoint: any) => url.includes(endpoint));
};

api.interceptors.request.use(
  (config) => {
    const token = getLocalStorage('auth')?.user?.token;
    config.baseURL = process.env.REACT_APP_BASE_URL;

    if (token && !checkEndpoint(config?.url)) {
      config.headers['Authorization'] = token;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      removeLocalStorage('auth');
      removeLocalStorage('userId');
      useNavigate();
      return;
    }
    return Promise.reject(error);
  }
);

export const getAccounts = () => {
  return api
    .get(`accounts`)
    .then((response) => response)
    .catch((err) => err);
};

export const newAccount = (updateAccount: IAccount) => {
  return api
    .post(`accounts`, { ...updateAccount, userId: getLocalStorage('userId') })
    .then((response) => {
      return response;
    })
    .catch((err) => err);
};

export const updateAccount = (updateAccount: IAccount) => {
  return api
    .put(`accounts/${updateAccount._id}`, updateAccount)
    .then((response) => {
      return response;
    })
    .catch((err) => err);
};

export const deleteAccount = (id: string) => {
  return api
    .delete(`accounts/${id}`)
    .then((response) => {
      return response;
    })
    .catch((err) => err);
};
