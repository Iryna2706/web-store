import React, { createContext } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import UserStore from './store/UserStore';
import ProductStore from './store/ProductStore';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

export const Context = createContext(null);


const root = createRoot(document.getElementById('root'));

root.render(
  <Context.Provider value={{
    user: new UserStore(),
    product: new ProductStore(),
  }}>
    <App />
  </Context.Provider>
);