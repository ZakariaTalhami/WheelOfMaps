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
            // The styles all button have in common
            baseStyle: {
                fontWeight: "bold",
                textTransform: "uppercase",
                borderRadius: "base", // <-- border radius is same for all variants and sizes
            },
            // Two sizes: sm and md
            sizes: {
                sm: {
                    fontSize: "sm",
                    px: 4, // <-- px is short for paddingLeft and paddingRight
                    py: 3, // <-- py is short for paddingTop and paddingBottom
                },
                md: {
                    fontSize: "md",
                    px: 6, // <-- these values are tokens from the design system
                    py: 4, // <-- these values are tokens from the design system
                },
            },
            // Two variants: outline and solid
            variants: {
                cat: {
                    border: "2px solid",
                    borderColor: "purple.500",
                    color: "purple.500",
                },
                solid: {
                    bg: "purple.500",
                    color: "white",
                },
            },
            // The default size and variant values
            defaultProps: {
                size: "md",
                variant: "outline",
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
