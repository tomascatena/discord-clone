import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { createRoot } from 'react-dom/client';
import { store } from '@store/store';
import App from './App';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import darkTheme from './themes/darkTheme';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <CssBaseline />

    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
