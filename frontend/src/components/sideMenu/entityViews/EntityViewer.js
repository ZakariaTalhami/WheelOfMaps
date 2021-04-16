import React from "react";
import { useSelector } from "react-redux";
import _ from "lodash";
import Location from "../../../models/location";
import Character from "../../../models/character";
import { Center } from "@chakra-ui/react";

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
    [getClassName(Location)]: () => "Location Entity",
    [getClassName(Character)]: () => "Character Entity",
};

/**
 * Component to display message when there isnt any selection
 */
const NoneSelectedMessage = () => (
    <Center
        data-testid="no-selection-message"
        fontSize="1.5rem"
        fontWeight="bold"
    >
        {NO_SELECTION_MESSAGE}
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
