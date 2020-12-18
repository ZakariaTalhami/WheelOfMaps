export const CHAPTER_IDNEX_RANGE_REGEX = /^\d{5}(-\d{5})?$/;
export const CHAPTER_RANGE_SCHEMA = {
    type: String,
    required: true,
    match: CHAPTER_IDNEX_RANGE_REGEX,
};
