const OLD_ENV = process.env;

describe("Developemnt Navigation", () => {
    beforeEach(() => {
        jest.resetModules(); // Most important - it clears the cache
        process.env = { ...OLD_ENV }; // Make a copy
    });

    afterAll(() => {
        process.env = OLD_ENV; // Restore old environment
    });

    test("Developement environment", () => {
        process.env.NODE_ENV = "development";

        const { NAVIGATION } = require("../navigation");

        expect(NAVIGATION.length).toEqual(6);
    });
});
