import { NAV_ENTITY_SELECTED, NAV_SELECTED } from "../../actions/types";
import { SELECTED_SUMMARY } from "../../views/main/sideMenu/navigation";
import NavigationReducer from "../NavigationReducer";

test("Retuns the initial state", () => {
    expect(NavigationReducer(undefined, {})).toEqual({
        selectedEntity: null,
        selectedNavigation: null,
    });
});

test("Navigation Selection", () => {
    const expectedNavigation = "navigation";

    expect(
        NavigationReducer(undefined, {
            type: NAV_SELECTED,
            navigation: expectedNavigation,
        })
    ).toEqual({
        selectedEntity: null,
        selectedNavigation: expectedNavigation,
    });
});

test("Entity Selection sets navigation to selected summary", () => {
    const expectedEntity = "entity";

    expect(
        NavigationReducer(undefined, {
            type: NAV_ENTITY_SELECTED,
            entity: expectedEntity,
        })
    ).toEqual({
        selectedNavigation: SELECTED_SUMMARY,
        selectedEntity: expectedEntity,
    });
});
