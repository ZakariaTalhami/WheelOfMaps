// Core
import React from "react";
// Libs
import { useSelector } from "react-redux";
// Utils
import _ from "lodash";
// Models
import Location from "../../../models/location";
import Character from "../../../models/character";
// Components
import { Center, Heading } from "@chakra-ui/react";
import LocationView from "./LocationView";
import CharacterView from "./CharacterView";

export const NO_SELECTION_MESSAGE = "Nothing Selected";

/**
 * Get the class name of element
 * @param {Object|Class} el - Element to get its class
 * @returns {String} class name or undefined
 */
const getClassName = (el) => {
    if (el) {
        if (/^\s*class/.test(el.toString())) {
            return el.prototype.constructor.name;
        } else if (_.isObject(el)) {
            return el.constructor.name;
        }
    }
    return undefined;
};

/**
 *  Mapping between Entity Type and its drawer component
 */
const EntityComponentMap = {
    [getClassName(Location)]: LocationView,
    [getClassName(Character)]: CharacterView,
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
    const Component =
        EntityComponentMap[getClassName(selectedEntity)] || NoneSelectedMessage;

    return <Component entity={selectedEntity} />;
};

export default EntityViewer;
