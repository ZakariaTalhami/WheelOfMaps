import { useSelector } from "react-redux";
import mockBook from "../../../../../../models/mocks/mockBook";
import mockChapter from "../../../../../../models/mocks/mockChapter";
// Utils
import { render } from "../../../../../../utils/TestUtils";
// Tested Component
import ChapterForm from "../ChapterForm";

mockBook.chapters = [mockChapter];

const MOCK_STATE = {
    Books: {
        books: {
            [mockBook.name]: mockBook,
        },
        selectedBook: mockBook.name,
        selectedChapter: mockChapter.number,
    },
};

jest.mock("react-redux", () => ({
    useSelector: jest.fn(),
}));

beforeEach(() => {
    useSelector.mockImplementation((fn) => fn(MOCK_STATE));
});

test("renders", () => {
    render(<ChapterForm />);
});

// TODO: Add more tests
