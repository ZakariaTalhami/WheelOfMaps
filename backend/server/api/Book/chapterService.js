import { Chapter, Book } from "./schemas";

export default class ChapterService {
    static async all(query) {
        return await Chapter.find(query);
    }

    static async getById(chapterId) {
        return await Chapter.findById(chapterId);
    }

    static async delete(bookId, chapterId) {
        return await Book.findOneAndUpdate(
            {
                _id: bookId,
            },
            {
                $pull: {
                    chapters: {
                        _id: chapterId,
                    },
                },
            },
            {
                new: true,
            }
        );
    }

    static async update(bookId, chapterId, chapterDto) {
        return await Book.findOneAndUpdate(
            {
                _id: bookId,
                "chapters._id": chapterId,
            },
            {
                $set: {
                    "chapters.$": chapterDto,
                },
            },
            {
                new: true,
            }
        );
    }
}
