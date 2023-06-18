import React from 'react'
import { Navigate } from 'react-router-dom'
import { getLocalStorage } from './LocalStorage';

const ProtectedRoute = ({children}: {children: any}) => {
  const auth = getLocalStorage('auth')
  return auth ? children : <Navigate to='/auth' />
}

export default ProtectedRoute