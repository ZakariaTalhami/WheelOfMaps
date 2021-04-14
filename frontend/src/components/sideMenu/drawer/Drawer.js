// Core
import React from "react";
// Components
import { FaTimes } from "react-icons/fa";
import {
    Box,
    Flex,
    Icon,
    IconButton,
    useBreakpointValue,
} from "@chakra-ui/react";
// Config
import { NavigationType } from "../navigation";

const DRAWER_STYLE = {
    justify: "center",
    bgColor: "primaryColor",
    shadow: "14px -2px 10px 4px rgb(0 0 0 / 25%)",
    transition: "all 0.5s",
};

const DrawerWraper = (props) => (
    <Flex
        data-testid="side-drawer"
        pos="absolute"
        top="0"
        left="100%"
        height="100%"
        minW="350px"
        w="30vw "
        maxW="600px"
        transform={`translate(${props.open ? "0" : "-170%"})`}
        {...DRAWER_STYLE}
        {...props}
    />
);

const MobileDrawerWrapper = (props) => (
    <Flex
        data-testid="side-drawer-mobile"
        pos="fixed"
        width="85%"
        height="85%"
        top={props.open ? "50%" : "150%"}
        left="50%"
        justify="center"
        transform="translate(-50%, -50%)"
        borderRadius="10px"
        {...DRAWER_STYLE}
        {...props}
    />
);

const DrawerHeader = (props) => (
    <Flex w="100%" justifyContent="flex-end" p="15px">
        <IconButton
            role="button"
            size="xs"
            colorScheme="solidButton"
            onClick={props.onClose}
            icon={<Icon color="primaryColor" as={FaTimes} />}
        />
    </Flex>
);

const DrawerContentWrapper = (props) => <Box w="100%" h="100%" {...props} />;

const Drawer = ({ content, onClose }) => {
    const Content = content?.Content;

    const isMobileView = useBreakpointValue({ base: true, sm: false });

    const Drawer = isMobileView ? MobileDrawerWrapper : DrawerWraper;

    return (
        <Drawer open={!!content}>
            <DrawerContentWrapper>
                <DrawerHeader onClose={onClose} />
                {Content && <Content />}
            </DrawerContentWrapper>
        </Drawer>
    );
};

Drawer.propTypes = {
    content: NavigationType,
};

export default Drawer;
