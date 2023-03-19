import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, } from "react-router-dom";
import App from './App';
import store from './store';
import { Provider } from 'react-redux';

import './styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
