import { Book } from "./schemas";

export default class BookService {
    static async find(query) {
        return await Book.find(query).sort({ seriesIndex: 1 });
    }
}
