import React from 'react';
import { Route, Routes } from 'react-router-dom';

import ProtectedRoute from '../../helpers/ProtectedRoute';
import RedirectRoute from '../../helpers/RedirectRoute';
import { useLocation } from 'react-router-dom';

import { Header } from '../Header/Header'
import { Footer } from '../Footer/Footer';
import { Auth } from '../../pages/auth/Auth';
import { SignUp } from '../../pages/signup/SignUp';
import { Password } from '../../pages/password/Password';
import { NotFound } from '../../pages/not-found/NotFound';
import { Home } from '../../pages/home/Home';
import { Accounts } from '../../pages/accounts/Accounts';

import { ThemeContext } from '../../contexts/ThemeContext';

export const Container = () => {
  const { theme } = React.useContext(ThemeContext);
  const location = useLocation();
  const rotes = ['/', '/account'];

  return (
    <main className={rotes.includes(location.pathname) ? theme : 'theme-01'}>
      <div className="container-root">
        <Header />
        <Routes>
          <Route
            path="/auth"
            element={
              <RedirectRoute>
                {' '}
                <Auth />
              </RedirectRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <RedirectRoute>
                {' '}
                <SignUp />{' '}
              </RedirectRoute>
            }
          />
          <Route
            path="/password-reset/:token"
            element={
              <RedirectRoute>
                {' '}
                <Password />
              </RedirectRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/accounts"
            element={
              <ProtectedRoute>
                <Accounts />
              </ProtectedRoute>
            }
          />
        </Routes>

        <Footer />
      </div>
    </main>
  );
};
