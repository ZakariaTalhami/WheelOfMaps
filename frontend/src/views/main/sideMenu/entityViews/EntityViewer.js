// Core
import React from "react";
// Libs
import { useSelector } from "react-redux";
// Components
import LocationView from "./LocationView";
import CharacterView from "./CharacterView";
import EntityViewFactory from "../../../../components/entityFactory/EntityViewFactory";

import {
    CHARACTER_ENTITY,
    LOCATION_ENTITY,
} from "../../../../models/entityTypes";

/**
 *  Mapping between Entity Type and its drawer component
 */
const EntityComponentMap = {
    [LOCATION_ENTITY]: LocationView,
    [CHARACTER_ENTITY]: CharacterView,
};

const EntityViewer = () => {
    const selectedEntity = useSelector(
        (state) => state.Navigation.selectedEntity
    );

    return (
        <EntityViewFactory
            componentMap={EntityComponentMap}
            entity={selectedEntity}
        />
    );
};

export default EntityViewer;
