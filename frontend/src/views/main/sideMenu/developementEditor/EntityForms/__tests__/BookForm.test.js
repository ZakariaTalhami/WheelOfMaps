import { useSelector } from "react-redux";
// Utils
import { render } from "../../../../../../utils/TestUtils";
// Tested Component
import BookForm from "../BookForm";

import mockBook from "../../../../../../models/mocks/mockBook";

jest.mock("react-redux", () => ({
    useSelector: jest.fn(),
}));

beforeEach(() => {
    useSelector.mockReturnValue(mockBook);
});

test("renders", () => {
    render(<BookForm />);
});

// TODO: Add more tests
