import assert from "assert";
import { part1 } from "./day25";

describe("Day 25", () => {
    describe("Part 1", () => {
        it("Example should return 14897079", () => {
            assert.strictEqual(part1("day25/example.txt"), 14897079);
        });
        it("Input should return 1478097", () => {
            assert.strictEqual(part1("day25/input.txt"), 1478097);
        });
    });
});
