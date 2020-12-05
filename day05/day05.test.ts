import assert from "assert";
import { parseSeatId, getHighestSeatId, findEmptySeat } from "./day05";

describe("Day 5", () => {
    describe("Part 1", () => {
        it("Example seat IDs should be parsed correctly", () => {
            assert.strictEqual(parseSeatId("FBFBBFFRLR"), 357);
            assert.strictEqual(parseSeatId("BFFFBBFRRR"), 567);
            assert.strictEqual(parseSeatId("FFFBBBFRRR"), 119);
            assert.strictEqual(parseSeatId("BBFFBBFRLL"), 820);
        });
        it("Input should return 850", () => {
            assert.strictEqual(getHighestSeatId("day05/input.txt"), 850);
        });
    });
    it("Input should return 599", () => {
        assert.strictEqual(findEmptySeat("day05/input.txt"), 599);
    });
});
