import { Book } from "./schemas";

export default class BookService {
    static async all(query) {
        return await Book.find(query).sort({ seriesIndex: 1 });
    }

    static async create(bookDto) {
        return await Book.create(bookDto);
    }

    static async getById(bookId) {
        return await Book.findById(bookId);
    }

    static async delete(bookId) {
        return await Book.findOneAndDelete({ _id: bookId });
    }

    static async update(bookId, bookDto) {
        return await Book.findOneAndReplace(
            {
                _id: bookId,
            },
            bookDto,
            {
                new: true,
            }
        );
    }
}
