import baseEntity from "../baseEntity";
import axios from "axios";

jest.mock("axios");

let entity;
beforeEach(() => {
    entity = new baseEntity();
});

test("clean at initializations", () => {
    expect(entity.isDirty()).toEqual(false);
});

test("setDirty sets the state to true", () => {
    entity.setDirty();

    expect(entity.isDirty()).toEqual(true);
});

test("getUrl throws error not implemented", () => {
    expect(entity.getUrl).toThrow(
        "getUrl() needs to be overriden in the child"
    );
});

test("serialization", () => {
    expect(entity.serialize()).toStrictEqual("{}");
});

test("dirty save serializes the object and performs a post request", () => {
    jest.spyOn(entity, "isDirty").mockReturnValue(true);
    jest.spyOn(entity, "getUrl").mockReturnValue("path/to/entity");
    jest.spyOn(entity, "serialize").mockReturnValue("{entity}");

    entity.save();

    expect(entity.getUrl).toHaveBeenCalled();
    expect(entity.serialize).toHaveBeenCalled();
    expect(axios.post).toHaveBeenCalledWith("path/to/entity", "{entity}");
});

test("clean save does not send request", () => {
    entity.save();

    expect(axios.post).not.toHaveBeenCalled();
});
