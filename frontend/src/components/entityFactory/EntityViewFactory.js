import React from "react";
import { Center, Heading } from "@chakra-ui/react";

export const NO_SELECTION_MESSAGE = "Nothing Selected";

/**
 * Get the class name of element
 * @param {Object} map - Map of entity type to component
 * @param {Object|Class} el - Element to get its class
 * @returns {String} class name or undefined
 */
const getEntityComponent = (map, el) => {
    if (el) {
        return map[el.entityType];
    }
    return undefined;
};

/**
 * Component to display message when there isnt any selection
 */
const NoneSelectedMessage = () => (
    <Center data-testid="no-selection-message">
        <Heading size="lg">{NO_SELECTION_MESSAGE}</Heading>
    </Center>
);

const EntityViewFactory = ({ componentMap, entity }) => {
    const Component =
        getEntityComponent(componentMap, entity) || NoneSelectedMessage;

    return <Component entity={entity} />;
};

export default EntityViewFactory;
