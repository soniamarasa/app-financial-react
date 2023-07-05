import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getLocalStorage, removeLocalStorage } from '../helpers/LocalStorage';

export const api = axios.create();

const endpoints = ['login'];

const navigate = useNavigate();

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
      navigate('/auth');
      return;
    }
    return Promise.reject(error);
  }
);

// export const getItems = () => {
//   return api
//     .get(`getItems/${getLocalStorage('userId')}`)
//     .then((response) => response)
//     .catch((err) => {
//       toast.error(err.response.data.error);
//     });
// };

// export const newItem = (item) => {
//   return api
//     .post(`postItem/${getLocalStorage('userId')}`, item)
//     .then((response) => {
//       toast.success('Successfully created item!');
//       return response;
//     })
//     .catch((err) => {
//       toast.error(err.response.data.error);
//     });
// };

// export const updateItem = (id, item) => {
//   return api
//     .put(`editItem/${getLocalStorage('userId')}/${id}`, item)
//     .then((response) => {
//       toast.success('Successfully updated item.');
//       return response;
//     })
//     .catch((err) => {
//       toast.error(err.response.data.error);
//     });
// };

// export const updateStatus = (id, item) => {
//   return api
//     .put(`updateStatus/${getLocalStorage('userId')}/${id}`, item)
//     .then((response) => {
//       toast.success(response.data.message);
//       return response;
//     })
//     .catch((err) => {
//       toast.error(err.response.data.error);
//     });
// };

// export const deleteItem = (id) => {
//   return api
//     .delete(`deleteItem/${getLocalStorage('userId')}/${id}`)
//     .then((response) => {
//       toast.success('Successfully deleted item!');
//       return response;
//     })
//     .catch((err) => {
//       toast.error(err.response.data.error);
//     });
// };

// export const resetPlanner = () => {
//   return api
//     .delete(`${getLocalStorage('userId')}/reset`)
//     .then((response) => {
//       toast.success(response.data.message);
//       return response;
//     })
//     .catch((err) => {
//       toast.error(err.response.data.error);
//     });
// };
