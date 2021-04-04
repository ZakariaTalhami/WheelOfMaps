// Core
import React, { useState } from "react";
import PropTypes from "prop-types";
// Components
import { Box, Flex, Icon, IconButton, Text, VStack } from "@chakra-ui/react";
import { NavigationType } from "../navigation";
import { FaBars } from "react-icons/fa";

const NavbarWraper = (props) => (
    <Flex
        role="navigation"
        pos="relative"
        bgColor="primaryColor"
        height="100%"
        w={props.open ? "200px" : "50px"}
        transition="all 0.3s"
        flexDirection="column"
        shadow="4px -4px 10px 4px rgba(0, 0, 0, 0.25);"
        {...props}
    />
);

const NavIcon = (props) => (
    /* Added a Box to fix the forwardRef issue with react-icons */
    <Box
        role="link"
        title={props.label}
        onClick={props.onClick}
        borderRight="4px solid"
        borderColor={props.isSelected ? "neutralColor" : "transparent"}
        textAlign="left"
        w="100%"
        p="10px 5px"
        overflowX="hidden"
        whiteSpace="nowrap"
    >
        <Flex cursor="pointer" color="neutralColor" alignItems="center">
            <Icon boxSize="35px" as={props.as} />
            <Text pl="10px" as="span" fontWeight="500">
                {props.label}
            </Text>
        </Flex>
    </Box>
);

const Navbar = ({ onSelect, selected, navigation }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <NavbarWraper open={isOpen}>
            {/* Toggle Button */}
            <VStack spacing="20px" w="100%" pl="8px" pt="10px" align="start">
                <IconButton
                    role="button"
                    size="sm"
                    colorScheme="invertedButton"
                    onClick={() => setIsOpen(!isOpen)}
                    icon={
                        <Icon color="neutralColor" boxSize="25px" as={FaBars} />
                    }
                />
            </VStack>
            {/* Navigation  Icons */}
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
