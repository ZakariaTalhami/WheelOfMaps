// Libs
import { useSelector } from "react-redux";
// Tested hook
import useGetSelectedChapter from "../useGetSelectedChapter";

jest.mock("react-redux", () => ({
    useSelector: jest.fn(),
}));

const getMockState = (options = {}) => ({
    Books: {
        books: {
            book1: {
                chapters: [...(options.chapters || [])],
            },
        },
        selectedBook: "book1",
        selectedChapter: options.selectedChapter,
    },
});

test("returns undefined if there isnt a selection", () => {
    const mockState = getMockState();
    useSelector.mockImplementation((fn) => fn(mockState));

    expect(useGetSelectedChapter()).toEqual(undefined);
});

test("returns undefined if the selected chapter cant be found", () => {
    const mockState = getMockState({ selectedChapter: 1 });
    useSelector.mockImplementation((fn) => fn(mockState));

    expect(useGetSelectedChapter()).toEqual(undefined);
});

test("returns the selected chapter object", () => {
    const expectedChapter = { number: 1 };
    const mockState = getMockState({
        selectedChapter: 1,
        chapters: [expectedChapter],
    });
    useSelector.mockImplementation((fn) => fn(mockState));

    expect(useGetSelectedChapter()).toBeDefined(undefined);
    expect(useGetSelectedChapter()).toEqual(expectedChapter);
});
