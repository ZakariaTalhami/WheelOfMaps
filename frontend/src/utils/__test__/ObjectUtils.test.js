import ObjectUtils from "../ObjectUtils";

describe(".evaluateObjectPath", () => {
    let testObj;
    beforeAll(() => {
        testObj = {
            item1: {
                child1: "child1",
                child2: {
                    leaf: "leaf",
                },
            },
            item2: "item2",
        };
    });

    test("evaluate with path as string", () => {
        expect(ObjectUtils.evaluateObjectPath(testObj)).toEqual(testObj);
        expect(ObjectUtils.evaluateObjectPath(testObj, "item2")).toEqual(
            testObj.item2
        );
        expect(ObjectUtils.evaluateObjectPath(testObj, "item1.child1")).toEqual(
            testObj.item1.child1
        );
        expect(ObjectUtils.evaluateObjectPath(testObj, "item1.child2")).toEqual(
            testObj.item1.child2
        );
        expect(
            ObjectUtils.evaluateObjectPath(testObj, "item1.child2.leaf")
        ).toEqual(testObj.item1.child2.leaf);
    });

    test("evaluate with path as array", () => {
        expect(ObjectUtils.evaluateObjectPath(testObj)).toEqual(testObj);
        expect(ObjectUtils.evaluateObjectPath(testObj, ["item2"])).toEqual(
            testObj.item2
        );
        expect(
            ObjectUtils.evaluateObjectPath(testObj, ["item1", "child1"])
        ).toEqual(testObj.item1.child1);
        expect(
            ObjectUtils.evaluateObjectPath(testObj, ["item1", "child2"])
        ).toEqual(testObj.item1.child2);
        expect(
            ObjectUtils.evaluateObjectPath(testObj, ["item1", "child2", "leaf"])
        ).toEqual(testObj.item1.child2.leaf);
    });

    test("evaluate returns default on empty path", () => {
        expect(
            ObjectUtils.evaluateObjectPath(undefined, [], "defaultValue")
        ).toEqual("defaultValue");
    });

    test("returns default value on undefined step in path", () => {
        expect(
            ObjectUtils.evaluateObjectPath(testObj, ["item3"], "defaultValue")
        ).toEqual("defaultValue");
        expect(
            ObjectUtils.evaluateObjectPath(
                testObj,
                ["item1.child3"],
                "defaultValue"
            )
        ).toEqual("defaultValue");
        expect(
            ObjectUtils.evaluateObjectPath(
                testObj,
                ["item1", "child2", "leaf2"],
                "defaultValue"
            )
        ).toEqual("defaultValue");
    });
});
