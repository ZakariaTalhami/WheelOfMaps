import { getBookChapterTitles } from "../BookUtils";

describe(".getBookChapterTitles", () => {
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
