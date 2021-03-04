// Base
import React from "react";
import ReactDOM from "react-dom";
// Setup
import reportWebVitals from "./reportWebVitals";
import StoreProvider from "./store";
import { configureAxios } from "./API/axiosSetup";
import { createGlobalStyle } from "styled-components";
// Components
import App from "./App";
// Global Styles
import resetCSS from "./assets/styles/reset.css";
import baseStyle from "./assets/styles/baseStyle.scss";
// TODO: remove custom font icons, replace with react-icons
import "./assets/fonts/style.css";
// Leafletjs Styles
import "leaflet/dist/leaflet.css";
import "./assets/_leafletjs.override.scss";

createGlobalStyle({
    ...resetCSS,
    ...baseStyle,
});

configureAxios();

ReactDOM.render(
    <React.StrictMode>
        <StoreProvider>
            <App />
        </StoreProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
