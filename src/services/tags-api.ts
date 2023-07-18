import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getLocalStorage, removeLocalStorage } from '../helpers/LocalStorage';
import { ITag } from '../interfaces/ITag';

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

export const getTags = () => {
  return api
    .get(`tags`)
    .then((response) => response)
    .catch((err) => err);
};

export const newTag = (tag: ITag) => {
  return api
    .post(`tags`, { ...tag, userId: getLocalStorage('userId') })
    .then((response) => {
      return response;
    })
    .catch((err) => err.response);
};

export const updateTag = ( tag: ITag) => {
  return api
    .put(`tags/${tag._id}`, tag)
    .then((response) => {
      return response;
    })
    .catch((err) => err);
};

export const deleteTag = (id: string) => {
  return api
    .delete(`tags/${id}`)
    .then((response) => {
      return response;
    })
    .catch((err) => err);
};
