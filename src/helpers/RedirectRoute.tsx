import React from 'react';
import { Navigate } from 'react-router-dom';
import { getLocalStorage } from './LocalStorage';

const RedirectRoute = ({ children }) => {
  const auth = getLocalStorage('auth');
  return auth ? <Navigate to="/" /> : children;
};

export default RedirectRoute;
