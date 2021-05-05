// Core
import React from "react";
import { useDispatch, useSelector } from "react-redux";
// Config
import { NAVIGATION } from "./navigation";
// Redux Actions
import { setSelectedNavigation } from "../../../actions/NavigationAction";
// Components
import { Box } from "@chakra-ui/react";
import Drawer from "./drawer/Drawer";
import Navbar from "./navbar/Navbar";

const SideMenuWrapper = (props) => (
    <Box
        {...props}
        pos="relative"
        pointerEvents="initial"
        flex="1"
        w="fit-content"
    />
);

const SideMenu = () => {
    const dispatch = useDispatch();
    const currentNavigation = useSelector(
        (state) => state.Navigation.selectedNavigation
    );
    const setCurrentNavigation = (navigation) =>
        dispatch(setSelectedNavigation(navigation));

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
