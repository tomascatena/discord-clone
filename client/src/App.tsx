import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import HomePage from '@pages/HomePage/HomePage';
import React from 'react';
import darkTheme from './themes/darkTheme';

const App:React.FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <Routes>

          <Route
            path="/"
            element={<HomePage/>}
          />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
