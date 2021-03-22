import baseEntity from "../baseEntity";
import axios from "axios";

jest.mock("axios");

let instance = new baseEntity();
beforeEach(() => {
    instance = new baseEntity();
});

test("clean at initializations", () => {
    expect(instance.isDirty()).toEqual(false);
});

test("getUrl throws error not implemented", () => {
    expect(instance.getUrl).toThrow(
        "getUrl() needs to be overriden in the child"
    );
});

test("serialization", () => {
    expect(instance.serialize()).toStrictEqual("{}");
});

test("dirty save serializes the object and performs a post request", () => {
    jest.spyOn(instance, "isDirty").mockReturnValue(true);
    jest.spyOn(instance, "getUrl").mockReturnValue("path/to/entity");
    jest.spyOn(instance, "serialize").mockReturnValue("{entity}");

    instance.save();

    expect(instance.getUrl).toHaveBeenCalled();
    expect(instance.serialize).toHaveBeenCalled();
    expect(axios.post).toHaveBeenCalledWith("path/to/entity", "{entity}");
});

test("clean save does not send request", () => {
    instance.save();

    expect(axios.post).not.toHaveBeenCalled();
});
