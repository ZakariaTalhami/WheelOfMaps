import { getBookChapterTitles, isInChapterRange } from "../BookUtils";

describe("getBookChapterTitles", () => {
    test("return empty list with no chapters", () => {
        expect(getBookChapterTitles({})).toEqual([]);
    });

    test("return chapter titles", () => {
        const chapters = [
            {
                number: 0,
                title: "Prologue 1",
            },
            {
                number: 1,
                title: "title 1",
            },
            {
                number: 2,
                title: "title 2",
            },
        ];

        expect(getBookChapterTitles({ chapters })).toEqual([
            "Prologue: Prologue 1",
            "Chapter 1: title 1",
            "Chapter 2: title 2",
        ]);
    });
});

describe("isInChapterRange", () => {
    test("invalid range returns false", () => {
        expect(isInChapterRange("10110", "01010-01015-01010")).toEqual(false);
    });

    test("single chapter range - not in range", () => {
        expect(isInChapterRange("10110", "01010")).toEqual(false);
    });

    test("single chapter range - in range", () => {
        expect(isInChapterRange("10110", "10110")).toEqual(true);
    });

    test("multi chapter range - not in range", () => {
        expect(isInChapterRange("10110", "01010-01015")).toEqual(false);
    });

    test("multi chapter range - in range", () => {
        expect(isInChapterRange("01013", "01010-01015")).toEqual(true);
    });
});
