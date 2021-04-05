import MarkerEntity from "./markerEntity";

export default class Character extends MarkerEntity {
    name;
    position = [];
    chapterSummary = {};

    constructor(characterId, name, position, chapterSummary, marker) {
        super(characterId, marker);
        this.name = name;
        this.position = position;
        this.chapterSummary = chapterSummary;
    }

    static ConstructFromObject({
        _id,
        name,
        position,
        chapterSummary,
        marker,
    }) {
        return new Character(_id, name, position, chapterSummary, marker);
    }

    setName(name) {
        this.name = name;
        this.setDirty();
    }

    setPosition(position) {
        this.position = position;
        this.setDirty();
    }

    setChapterSummary(chapterIndex, chapterSummary) {
        this.chapterSummary[chapterIndex] = chapterSummary;
        this.setDirty();
    }

    getChapterSummary(chapterIndex) {
        return this.chapterSummary[chapterIndex];
    }

    getUrl() {
        return `character`;
    }
}
