import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getLocalStorage, removeLocalStorage } from '../helpers/LocalStorage';
import { IStore } from '../interfaces/IStore';

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

export const getStores = (type?: number) => {
  return api
    .get(`stores${type ? `?type=${type}` : ''}`)
    .then((response) => response)
    .catch((err) => err);
};

export const newStore = (story: IStore) => {
  return api
    .post(`stores`, { ...story, userId: getLocalStorage('userId') })
    .then((response) => {
      return response;
    })
    .catch((err) => err);
};

export const updateStore = (story: IStore) => {
  return api
    .put(`stores/${story._id}`, story)
    .then((response) => {
      return response;
    })
    .catch((err) => err);
};

export const deleteStore = (id: string) => {
  return api
    .delete(`stores/${id}`)
    .then((response) => {
      return response;
    })
    .catch((err) => err);
};
