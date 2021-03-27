import React from "react";
import { Center, IconButton } from "@chakra-ui/react";

const ButtonWrapper = (props) => <Center p="0.5rem" {...props} />;

const NavButton = (props) => (
    <ButtonWrapper>
        <IconButton
            {...props}
            fontSize="32px"
            color="primaryColor"
            colorScheme="trasparent"
        >
            {props.children}
        </IconButton>
    </ButtonWrapper>
);

export default NavButton;
