// Libs
import { useSelector } from "react-redux";
// Tested hook
import useGetSelectedBook from "../useGetSelectedBook";

jest.mock("react-redux", () => ({
    useSelector: jest.fn(),
}));

const getMockState = (options = {}) => ({
    Books: {
        books: {
            book1: {
                title: "book1",
            },
        },
        selectedBook: options.selectedBook,
    },
});

test("returns undefined if there isnt a selection", () => {
    const mockState = getMockState();
    useSelector.mockImplementation((fn) => fn(mockState));

    expect(useGetSelectedBook()).toEqual(undefined);
});

test("returns undefined if the selected chapter cant be found", () => {
    const mockState = getMockState({ selectedBook: "bookNotFound" });
    useSelector.mockImplementation((fn) => fn(mockState));

    expect(useGetSelectedBook()).toEqual(undefined);
});

test("returns the selected chapter object", () => {
    const expectedBookTitle = "book1";
    const mockState = getMockState({
        selectedBook: "book1",
    });
    useSelector.mockImplementation((fn) => fn(mockState));

    expect(useGetSelectedBook()).toBeDefined(undefined);
    expect(useGetSelectedBook().title).toEqual(expectedBookTitle);
});
