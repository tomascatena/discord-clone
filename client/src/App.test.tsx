import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { store } from '@/store/store';
import App from './App';
import React from 'react';

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByText(/learn/i)).toBeInTheDocument();
});
