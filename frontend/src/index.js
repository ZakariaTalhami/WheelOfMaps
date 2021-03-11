// Base
import React from "react";
import ReactDOM from "react-dom";
// Setup
import reportWebVitals from "./reportWebVitals";
import StoreProvider from "./store";
import { configureAxios } from "./API/axiosSetup";
import { ChakraProvider } from "@chakra-ui/react";
// Components
import App from "./App";
//Global Theme
import extendedTheme from "./assets/styles/extendedTheme";
// TODO: remove custom font icons, replace with react-icons
import "./assets/fonts/style.css";
// Leafletjs Styles
import "leaflet/dist/leaflet.css";
import "./assets/_leafletjs.override.scss";

configureAxios();

ReactDOM.render(
    <React.StrictMode>
        <ChakraProvider theme={extendedTheme}>
            <StoreProvider>
                <App />
            </StoreProvider>
        </ChakraProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
