import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// REDUX 
import { createStore } from "redux";
import { reducers } from "./Reducers";
import { Provider } from "react-redux";


const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
