import React from 'react'
import { Navigate } from 'react-router-dom'
import { getLocalStorage } from './LocalStorage';

const ProtectedRoute = ({children}) => {
  const auth = getLocalStorage('auth')
  return auth ? children : <Navigate to='/auth' />
}

export default ProtectedRoute