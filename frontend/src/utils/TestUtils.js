import React from "react";
import { render } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
//Global Theme
import extendedTheme from "../assets/styles/extendedTheme";
// TODO: remove custom font icons, replace with react-icons
import "../assets/fonts/style.css";
// Leafletjs Styles
import "leaflet/dist/leaflet.css";
import "../assets/_leafletjs.override.scss";

const AllTheProviders = ({ children }) => {
    return <ChakraProvider theme={extendedTheme}>{children}</ChakraProvider>;
};

const customRender = (ui, options) =>
    render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
