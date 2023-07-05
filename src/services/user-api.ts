import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage,
} from '../helpers/LocalStorage';
import { IUser } from '../interfaces/IUser';

export const api = axios.create();

const endpoints = ['login'];


const checkEndpoint = (url: any) => {
  return endpoints.some((endpoint) => url.includes(endpoint));
};

api.interceptors.request.use(
  (config) => {
    const token = getLocalStorage('auth')?.user?.token;
    config.baseURL = process.env.REACT_APP_BASE_URL;

    if (token && !checkEndpoint(config.url)) {
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

export const createAccount = (user: IUser) => {
  return api
    .post('createAccount', user)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err.response.data.error
    });
};

export const login = (data: any) => {
  return api
    .post('login', data)
    .then((response) => response)
    .catch((err) => {
      return err.response.data.error
    });
};

export const logout = () => {
  return api
    .post('logout', { id: getLocalStorage('userId') })
    .then(() => {})
    .catch((err) => {
      return err.response.data.error
    });
};

export const retrievePassword = (data: any) => {
  return api
    .post('retrievePassword', data)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err.response.data.error
    });
};

export const resetPassword = (password: string, token: string) => {
  return api
    .post(
      'resetPassword',
      { password },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    .then((response) => response)
    .catch((err) => {
      return err.response.data.error
    });
};

export const getUser = () => {
  return api
    .get(`user/${getLocalStorage('userId')}`)
    .then((response) => response)
    .catch((err) => {
      return err.response.data.error
    });
};

export const updateUser = (user: IUser) => {
  return api
    .put(`updateUser/${getLocalStorage('userId')}`, user)
    .then((response) => {
      let auth = getLocalStorage('auth');
      auth.user.name = response.data.name;

      setTimeout(() => {
        setLocalStorage('auth', auth);
      }, 100);


      return response;
    })
    .catch((err) => {
      return err.response.data.error
    });
};
