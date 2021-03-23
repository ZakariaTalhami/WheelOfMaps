import baseEntity from "../baseEntity";
import axios from "axios";

jest.mock("axios");

const MOCK_ID = "be7983c1-00db-4b1d-aef7-0dfc5946f8e3";

let entity;
beforeEach(() => {
    entity = new baseEntity(MOCK_ID);
});

test("clean at initializations", () => {
    expect(entity.isDirty()).toEqual(false);
    expect(entity.isNew()).toEqual(false);
});

test("constructor without id is set as new", () => {
    const entity = new baseEntity();
    expect(entity.isNew()).toEqual(true);
});

test("createEmpty sets isNew flag true", () => {
    const entity = baseEntity.createEmpty();
    expect(entity.isNew()).toEqual(true);
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
    expect(entity.serialize()).toStrictEqual(`{"_id":"${MOCK_ID}"}`);
});

test("dirty save serializes the object and performs a PUT request", () => {
    jest.spyOn(entity, "isDirty").mockReturnValue(true);
    jest.spyOn(entity, "getUrl").mockReturnValue("path/to/entity");
    jest.spyOn(entity, "serialize").mockReturnValue("{entity}");

    entity.save();

    expect(entity.getUrl).toHaveBeenCalled();
    expect(entity.serialize).toHaveBeenCalled();
    expect(axios.put).toHaveBeenCalledWith(
        "path/to/entity/" + MOCK_ID,
        "{entity}"
    );
});

test("new save serializes the object and performs a POST request", () => {
    jest.spyOn(entity, "isNew").mockReturnValue(true);
    jest.spyOn(entity, "getUrl").mockReturnValue("path/to/entity");
    jest.spyOn(entity, "serialize").mockReturnValue("{entity}");

    entity.save();

    expect(entity.getUrl).toHaveBeenCalled();
    expect(entity.serialize).toHaveBeenCalled();
    expect(axios.post).toHaveBeenCalledWith("path/to/entity", "{entity}");
});

test("clean save does not send request", () => {
    jest.spyOn(entity, "getUrl").mockReturnValue("path/to/entity");

    entity.save();

    expect(axios.post).not.toHaveBeenCalled();
    expect(axios.put).not.toHaveBeenCalled();
});
