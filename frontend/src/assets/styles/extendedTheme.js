// Global Styles
import resetCSS from "./reset.css";
import baseStyle from "./baseStyle.scss";
import { extendTheme } from "@chakra-ui/react";

const extendedTheme = extendTheme({
    colors: {
        primaryColor: "#DAD2BC",
        neutralColor: "#252323",
        solidButton: {
            500: "#150A0A",
            600: "#252323",
            700: "#635E5E",
        },
    },
    styles: {
        global: {
            ...resetCSS,
            ...baseStyle,
        },
    },
});

export default extendedTheme;
