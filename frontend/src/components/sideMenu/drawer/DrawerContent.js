import { Heading, VStack } from "@chakra-ui/react";

export const DrawerHeader = (props) => <Heading size="md" {...props} />;

export const DrawerContentWrapper = (props) => (
    <VStack p="1rem" overflow="auto" textAlign="justify" {...props} />
);
