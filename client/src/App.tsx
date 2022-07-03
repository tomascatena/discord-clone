import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MainLayout } from './App.styled';
import React, { Suspense, lazy } from 'react';

const LoginPage = lazy(() => import('@/pages/LoginPage/LoginPage'));
const RegisterPage = lazy(() => import('@/pages/RegisterPage/RegisterPage'));
const DashboardPage = lazy(() => import('@/pages/DashboardPage/DashboardPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage/NotFoundPage'));

const App:React.FC = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Suspense fallback='Loading...'>
          <Routes>
            <Route
              path='/'
              element={
                <Navigate
                  to="/dashboard"
                  replace
                />
              }
            />

            <Route
              path="/dashboard"
              element={<DashboardPage/>}
            />

            <Route
              path='/login'
              element={<LoginPage/>}
            />

            <Route
              path='/register'
              element={<RegisterPage/>}
            />

            <Route
              path="*"
              element={<NotFoundPage/>}
            />
          </Routes>
        </Suspense>
      </MainLayout>
    </BrowserRouter>
  );
};

export default App;
