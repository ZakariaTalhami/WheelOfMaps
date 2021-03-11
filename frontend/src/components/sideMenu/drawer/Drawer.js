import { Box, Flex, Icon, IconButton } from "@chakra-ui/react";
import { FaTimes } from "react-icons/fa";
import React from "react";
import { NavigationType } from "../navigation";

const DrawerWraper = (props) => (
    <Flex
        pos="absolute"
        top="0"
        left="100%"
        justify="center"
        bgColor="primaryColor"
        height="100%"
        minW="350px"
        w="30vw "
        maxW="600px"
        shadow="14px -2px 10px 4px rgb(0 0 0 / 25%)"
        transition="all 0.5s"
        transform={`translate(${props.open ? "0" : "-150%"})`}
        {...props}
    />
);

const DrawerHeader = (props) => (
    <Flex w="100%" justifyContent="flex-end" p="15px">
        <IconButton
            size="xs"
            colorScheme="solidButton"
            onClick={props.onClose}
            // bgColor="neutralColor"
            // color="primaryColor"
            icon={<Icon color="primaryColor" as={FaTimes} />}
        />
    </Flex>
);

const DrawerContentWrapper = (props) => <Box w="100%" h="100%" {...props} />;

const Drawer = ({ content, onClose }) => {
    const Content = content?.Content;
    return (
        <DrawerWraper open={!!content}>
            <DrawerContentWrapper>
                <DrawerHeader onClose={onClose} />
                {Content && <Content />}
            </DrawerContentWrapper>
        </DrawerWraper>
    );
};

Drawer.propTypes = {
    content: NavigationType,
};

export default Drawer;
