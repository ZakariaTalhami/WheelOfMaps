// Libs
import { render, screen } from "../../../utils/TestUtils";
// Tested component
import ChapterSummary from "../ChapterSummary";
// Mocks
import useGetSelectedChapter from "../../../hooks/useGetSelectedChapter";
import mockChapter from "../../../models/mocks/mockChapter";
// Utils
import { getChapterTitle } from "../../../utils/BookUtils";

jest.mock("../../../hooks/useGetSelectedChapter");

describe("Selected Chapter is undefined", () => {
    beforeEach(() => {
        useGetSelectedChapter.mockReturnValue(undefined);
    });

    test("Show no selection message", () => {
        render(<ChapterSummary />);

        expect(screen.getByText("No Chapter selected")).toBeDefined();
    });

    test("Match snapshot", () => {
        const { container } = render(<ChapterSummary />);

        expect(container).toMatchSnapshot();
    });
});

describe("Selected Chapter is defined", () => {
    beforeEach(() => {
        useGetSelectedChapter.mockReturnValue(mockChapter);
    });

    test("show chapter summary", () => {
        render(<ChapterSummary />);

        expect(screen.getByText(getChapterTitle(mockChapter))).toBeDefined();
        expect(screen.getByText(mockChapter.summary)).toBeDefined();
    });

    test("Match snapshot when selected chapter is undefined", () => {
        const { container } = render(<ChapterSummary />);

        expect(container).toMatchSnapshot();
    });
});
