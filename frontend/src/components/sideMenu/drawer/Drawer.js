import { Flex } from "@chakra-ui/react";
import React from "react";

const DrawerWraper = (props) => (
    <Flex
        pos="absolute"
        top="0"
        left="100%"
        justify="center"
        bgColor="primaryColor"
        height="100%"
        minW="350px"
        maxW="600px"
        shadow="14px -2px 10px 4px rgb(0 0 0 / 25%)"
        transition="all 0.5s"
        transform={`translate(${props.open ? "0" : "-150%"})`}
        {...props}
    />
);

const Drawer = ({ content, onClose }) => {
    return <DrawerWraper open={!!content}>{content?.name}</DrawerWraper>;
};

export default Drawer;
