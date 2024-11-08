import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';

const themeMode = localStorage.getItem('theme') === 'dark' ?'dark':'light';
document.documentElement.setAttribute('data-theme', themeMode);
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
