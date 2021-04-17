// Core
import React from "react";
// Components
import { Center, Heading, Icon, VStack } from "@chakra-ui/react";
import { BsFillXOctagonFill } from "react-icons/bs";

const NotImplementedMessage = () => {
    return (
        <VStack>
            <Heading size="lg">Not Implemented Yet</Heading>
            <Center>
                <Icon mt="2rem" boxSize="5rem" as={BsFillXOctagonFill} />
            </Center>
        </VStack>
    );
};

export default NotImplementedMessage;
