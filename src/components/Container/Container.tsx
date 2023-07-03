import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import ProtectedRoute from '../../helpers/ProtectedRoute';

import RedirectRoute from '../../helpers/RedirectRoute';

import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { Auth } from '../../pages/auth/Auth';
import { SignUp } from '../../pages/signup/SignUp';
import { Password } from '../../pages/password/Password';
import { NotFound } from '../../pages/not-found/NotFound';
import { Home } from '../../pages/home/Home';
import { Accounts } from '../../pages/accounts/Accounts';
import { Transactions } from '../../pages/transactions/Transactions';
import { Reports } from '../../pages/reports/Reports';
import { Categories } from '../../pages/categories/Categories';
import { Stores } from '../../pages/stores/Stores';
import { Tags } from '../../pages/tags/Tags';
import { User } from '../../pages/user/User';
import { Cards } from '../../pages/cards/Cards';

import { ThemeContext } from '../../contexts/ThemeContext';

export const Container = () => {
  const { theme } = React.useContext(ThemeContext) || {};
  const location = useLocation();
  const rotes = ['/auth', '/signup', 'reset'];

  return (
    <main
      className={
        theme && rotes.includes(location.pathname) ? 'light' : 'dark'
      }
    >
      <div className="container-root">
        <Header />
        <Routes>
          <Route path="/auth" element={<Auth />} />
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
              //<ProtectedRoute>
              <Home />
              //</ProtectedRoute>
            }
          />
          <Route
            path="/user"
            element={
              //<ProtectedRoute>
              <User />
              //</ProtectedRoute>
            }
          />
          <Route
            path="/accounts"
            element={
              //<ProtectedRoute>
              <Accounts />
              //</ProtectedRoute>
            }
          />
          <Route
            path="/transactions"
            element={
              //<ProtectedRoute>
              <Transactions />
              //</ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              //<ProtectedRoute>
              <Reports />
              //</ProtectedRoute>
            }
          />
          <Route
            path="/categories"
            element={
              //<ProtectedRoute>
              <Categories />
              //</ProtectedRoute>
            }
          />
          <Route
            path="/Tags"
            element={
              //<ProtectedRoute>
              <Tags />
              //</ProtectedRoute>
            }
          />
          <Route
            path="/stores"
            element={
              //<ProtectedRoute>
              <Stores />
              //</ProtectedRoute>
            }
          />
          <Route
            path="/cards"
            element={
              //<ProtectedRoute>
              <Cards />
              //</ProtectedRoute>
            }
          />
        </Routes>

        <Footer />
      </div>
    </main>
  );
};
