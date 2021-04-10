import { zeroPad } from "../NumberUtils";

test("zeroPad", () => {
    expect(zeroPad(1, 3)).toEqual("001");
});
