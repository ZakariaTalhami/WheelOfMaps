// Core
import React from "react";
// Components
import { VStack } from "@chakra-ui/react";
import { DrawerHeader } from "../drawer/DrawerContent";

const CharacterView = ({ entity }) => {
    return (
        <VStack h="100%">
            <DrawerHeader>{entity.name}</DrawerHeader>
        </VStack>
    );
};

export default CharacterView;
