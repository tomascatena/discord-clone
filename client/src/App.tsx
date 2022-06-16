import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainLayout } from './App.styled';
import HomePage from '@pages/HomePage/HomePage';
import React, { Suspense } from 'react';

const App:React.FC = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Suspense fallback='Loading...'>
          <Routes>
            <Route
              path="/"
              element={<HomePage/>}
            />
          </Routes>
        </Suspense>
      </MainLayout>
    </BrowserRouter>
  );
};

export default App;
