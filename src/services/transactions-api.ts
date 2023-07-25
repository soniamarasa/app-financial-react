import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getLocalStorage, removeLocalStorage } from '../helpers/LocalStorage';
import { ITransaction } from '../interfaces/ITransaction';

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

export const getTransactions = (type?: number) => {
  return api
    .get(`transactions${type ? `?type=${type}` : ''}`)
    .then((response) => response)
    .catch((err) => err);
};

export const newTransaction = (transaction: ITransaction) => {
  return api
    .post(`transactions`, { ...transaction, userId: getLocalStorage('userId') })
    .then((response) => {
      return response;
    })
    .catch((err) => err);
};

export const updateTransaction = (transaction: ITransaction) => {
  return api
    .put(`transactions/${transaction._id}`, transaction)
    .then((response) => {
      return response;
    })
    .catch((err) => err);
};

export const deleteTransaction = (id: string) => {
  return api
    .delete(`transactions/${id}`)
    .then((response) => {
      return response;
    })
    .catch((err) => err);
};
