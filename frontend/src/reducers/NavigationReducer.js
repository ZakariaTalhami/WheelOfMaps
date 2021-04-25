import { NAV_ENTITY_SELECTED, NAV_SELECTED } from "../actions/types";
import { SELECTED_SUMMARY } from "../components/sideMenu/navigation";

const INITIAL_STATE = {
    selectedEntity: null,
    selectedNavigation: null,
};

const NavigationReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case NAV_SELECTED:
            return {
                ...state,
                selectedNavigation: action.navigation,
            };
        case NAV_ENTITY_SELECTED:
            return {
                ...state,
                selectedEntity: action.entity,
                selectedNavigation: SELECTED_SUMMARY,
            };
        default:
            return state;
    }
};

export default NavigationReducer;
