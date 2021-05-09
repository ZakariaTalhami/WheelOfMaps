import {
    Button,
    Heading,
    HStack,
    IconButton,
    VStack,
    Icon,
    FormControl,
    Input,
    FormLabel,
} from "@chakra-ui/react";
import React from "react";
import { FaTrash } from "react-icons/fa";

export const ActionButton = ({ iconComp, ...props }) => {
    return (
        <IconButton
            size="xs"
            colorScheme="trasparent"
            icon={
                <Icon
                    color={props.color || "primaryColor"}
                    fontSize="18px"
                    as={iconComp}
                />
            }
            {...props}
        >
            {props.children}
        </IconButton>
    );
};

export const ActionToggleButton = ({ toggled, ...props }) => {
    const color = toggled ? "secondaryColor" : "primaryColor";
    const colorScheme = toggled ? "invertedButton" : "trasparent";
    return <ActionButton color={color} colorScheme={colorScheme} {...props} />;
};

export const ActionBar = (props) => {
    return (
        <HStack
            w="100%"
            h="2rem"
            borderRadius="5px"
            color="primaryColor"
            backgroundColor="secondaryColor"
            padding="0 1rem"
            spacing="0.5rem"
            {...props}
        />
    );
};

export const FormHeader = ({ title }) => <Heading size="lg">{title}</Heading>;

export const FormFooterActions = ({ onSave, onReset }) => {
    return (
        <HStack spacing="20">
            <Button
                onClick={onReset}
                role="reset"
                w="100px"
                color="secondaryColor"
                colorScheme="secondaryButton"
                variant="outline"
            >
                Reset
            </Button>
            <Button
                onClick={onSave}
                role="save"
                w="100px"
                color="primaryColor"
                colorScheme="secondaryButton"
            >
                Save
            </Button>
        </HStack>
    );
};

export const FormBody = (props) => <VStack w="100%" flex="1" {...props} />;

export const EntitFormWrapper = (props) => (
    <VStack h="100%" padding="0.5rem 1.5rem" {...props} />
);

export const EntityFormField = (props) => (
    <FormControl>
        <FormLabel>{props.title}</FormLabel>
        <Input
            variant="pizza"
            border="2px solid black"
            borderColor="secondaryColor"
            {...props}
        />
    </FormControl>
);

const EntityForm = ({ actions, title }) => {
    return (
        <EntitFormWrapper>
            <ActionBar actions={actions}>
                <ActionButton iconComp={FaTrash} />
                <ActionToggleButton iconComp={FaTrash} />
            </ActionBar>
            <FormHeader title={title} />
            <FormBody></FormBody>
            <FormFooterActions />
        </EntitFormWrapper>
    );
};

export default EntityForm;
