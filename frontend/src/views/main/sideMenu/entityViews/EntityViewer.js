// Core
import React from "react";
// Libs
import { useSelector } from "react-redux";
// Utils
import _ from "lodash";
// Components
import { Center, Heading } from "@chakra-ui/react";
import LocationView from "./LocationView";
import CharacterView from "./CharacterView";
import {
    CHARACTER_ENTITY,
    LOCATION_ENTITY,
} from "../../../../models/entityTypes";

export const NO_SELECTION_MESSAGE = "Nothing Selected";

/**
 *  Mapping between Entity Type and its drawer component
 */
const EntityComponentMap = {
    [LOCATION_ENTITY]: LocationView,
    [CHARACTER_ENTITY]: CharacterView,
};

/**
 * Get the class name of element
 * @param {Object|Class} el - Element to get its class
 * @returns {String} class name or undefined
 */
const getEntityComponent = (el) => {
    if (el) {
        return EntityComponentMap[el.entityType];
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

const EntityViewer = () => {
    const selectedEntity = useSelector(
        (state) => state.Navigation.selectedEntity
    );
    const Component = getEntityComponent(selectedEntity) || NoneSelectedMessage;

    return <Component entity={selectedEntity} />;
};

export default EntityViewer;
