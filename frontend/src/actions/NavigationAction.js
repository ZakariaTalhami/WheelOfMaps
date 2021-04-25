import { NAV_ENTITY_SELECTED, NAV_SELECTED } from "./types";

export const setSelectedEntity = (entity) => ({
    type: NAV_ENTITY_SELECTED,
    entity,
});

export const setSelectedNavigation = (navigation) => ({
    type: NAV_SELECTED,
    navigation,
});
