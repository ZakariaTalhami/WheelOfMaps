import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import Navbar from "./navbar/Navbar";
import { NAVIGATION } from "./navigation";
import Drawer from "./drawer/Drawer";

const SideMenuWrapper = (props) => (
    <Box
        {...props}
        pos="relative"
        pointerEvents="initial"
        flex="1"
        w="fit-content"
    />
);

const SideMenu = (props) => {
    const [currentNavigation, setCurrentNavigation] = useState(null);
    const drawerContent = NAVIGATION.find(
        (nav) => nav.name === currentNavigation
    );

    const close = () => setCurrentNavigation(null);

    const onSelection = (selection) => {
        setCurrentNavigation(
            selection !== currentNavigation ? selection : null
        );
    };

    return (
        <SideMenuWrapper>
            <Drawer onClose={close} content={drawerContent} />
            <Navbar
                onSelect={onSelection}
                selected={currentNavigation}
                navigation={NAVIGATION}
            />
        </SideMenuWrapper>
    );
};

export default SideMenu;
