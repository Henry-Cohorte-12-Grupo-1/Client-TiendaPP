import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store/index";
import App from "./components/App/App"; // Importante no poner la extensión .tsx sino arrojara un error
import {BrowserRouter} from 'react-router-dom'
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
        <App />
    </Provider>
    </BrowserRouter>,
    document.querySelector("#root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
