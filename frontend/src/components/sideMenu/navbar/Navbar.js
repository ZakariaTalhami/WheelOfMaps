import { Box, Flex, Icon, Tooltip, VStack } from "@chakra-ui/react";
import React from "react";
import PropTypes from "prop-types";
import { NavigationType } from "../navigation";

const NavbarWraper = (props) => (
    <Flex
        pos="relative"
        justify="center"
        bgColor="primaryColor"
        height="100%"
        w="50px"
        shadow="4px -4px 10px 4px rgba(0, 0, 0, 0.25);"
        {...props}
    />
);

const NavIcon = (props) => (
    <Tooltip
        hasArrow
        label={props.label}
        placement="right"
        bg="neutralColor"
        color="primaryColor"
    >
        {/* Added a Box to fix the forwardRef issue with react-icons */}
        <Box
            borderRight="4px solid"
            borderColor={props.isSelected ? "neutralColor" : "transparent"}
            textAlign="center"
            w="100%"
            p="10px 0"
        >
            <Icon
                cursor="pointer"
                boxSize="35px"
                color="neutralColor"
                {...props}
            />
        </Box>
    </Tooltip>
);

const Navbar = ({ onSelect, selected, navigation }) => {
    return (
        <NavbarWraper>
            <VStack spacing="20px" w="100%" pt="25px">
                {navigation.map((opt) => (
                    <NavIcon
                        key={opt.name}
                        onClick={() => onSelect(opt.name)}
                        isSelected={selected === opt.name}
                        label={opt.label}
                        as={opt.Icon}
                    />
                ))}
            </VStack>
        </NavbarWraper>
    );
};

Navbar.propTypes = {
    selected: PropTypes.string,
    navigation: PropTypes.arrayOf(NavigationType),
};

export default Navbar;
