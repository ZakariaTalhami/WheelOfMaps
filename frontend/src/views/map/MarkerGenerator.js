import React from "react";
import _ from "lodash";

import { useSelector } from "react-redux";

/**
 * Generates and renders all the markers for the entities in the store
 */
const MarkerGenerator = () => {
    const entities = {};
    const visibleMarkers = [];

    const currentChapterIndex = useSelector(
        (state) => state.Books.selectedChapterIndex
    );
    entities.locations = useSelector((state) => state.Locations.locations);
    entities.characters = useSelector((state) => state.Characters.characters);

    Object.keys(entities).forEach((entity) => {
        // Apply Filter here
        if (_.isArray(entities[entity])) {
            entities[entity].forEach((el) => {
                // Check chapter inclusion
                if (el.isInChapter(currentChapterIndex)) {
                    visibleMarkers.push(el);
                }
            });
        }
    });

    return <>{visibleMarkers.map((el) => el.renderMarker())}</>;
};

export default MarkerGenerator;
