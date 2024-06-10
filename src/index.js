import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import './app.css';

import { Provider } from "react-redux";
import rootReducer from "./reducer/reducer";
import { configureStore } from "@reduxjs/toolkit";
import { Slide, ToastContainer } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';

const store = configureStore({
  //added "rootReducer" into store variable and rootReducer is combination of all reducer which is made in slices;
  reducer: rootReducer,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <>
      <BrowserRouter>
        <App />
        <ToastContainer 
          transition={Slide} />
      </BrowserRouter>
    </>
  </Provider>
);
