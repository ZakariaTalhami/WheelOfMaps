import { setSelectedEntity, setSelectedNavigation } from "../NavigationAction";
import { NAV_ENTITY_SELECTED, NAV_SELECTED } from "../types";

test("setSelectedNavigation returns NAV_ENTITY_SELECTED type and passed entity", () => {
    const expectedEntity = "entity";
    expect(setSelectedEntity(expectedEntity)).toStrictEqual({
        type: NAV_ENTITY_SELECTED,
        entity: expectedEntity,
    });
});

test("setSelectedNavigation returns NAV_SELECTED type and passed nav", () => {
    const expectedNav = "navigation";
    expect(setSelectedNavigation(expectedNav)).toStrictEqual({
        type: NAV_SELECTED,
        navigation: expectedNav,
    });
});
