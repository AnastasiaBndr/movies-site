import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';

import store from './redux/store';

import './index.css';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';

import './index.css';

const body = document.querySelector('body');
body.style.backgroundColor = '#E7ECF2';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="movies-site">
      <Provider store={store}>
        <App />
        <Toaster />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
