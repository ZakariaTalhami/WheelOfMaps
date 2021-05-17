// Global Styles
import resetCSS from "./reset.css";
import baseStyle from "./baseStyle.scss";
import { extendTheme } from "@chakra-ui/react";

const extendedTheme = extendTheme({
    colors: {
        primaryColor: "#DAD2BC",
        secondaryColor: "#574937",
        neutralColor: "#252323",
        solidButton: {
            500: "#150A0A",
            600: "#252323",
            700: "#635E5E",
        },
        secondaryButton: {
            500: "#574937", // Default Color
            600: "#867560", // Hover Color
            700: "#A99985", // Click Color
        },
        invertedButton: {
            500: "#DAD2BC",
            600: "#B8AD8E",
            700: "#998B65",
        },
    },
    components: {
        Input: {
            variants: {
                filled: {
                    field: {
                        backgroundColor: "white",
                        _focus: {
                            backgroundColor: "white",
                        },
                    },
                },
            },
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
