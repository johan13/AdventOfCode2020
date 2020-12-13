import assert from "assert";
import { part1, part2 } from "./day12";

describe("Day 12", () => {
    describe("Part 1", () => {
        it("Example should return 25", () => {
            assert.strictEqual(part1("day12/example.txt"), 25);
        });
        it("Input should return 1152", () => {
            assert.strictEqual(part1("day12/input.txt"), 1152);
        });
    });
    describe("Part 2", () => {
        it("Example should return 286", () => {
            assert.strictEqual(part2("day12/example.txt"), 286);
        });
        it("Input should return 58637", () => {
            assert.strictEqual(part2("day12/input.txt"), 58637);
        });
    });
});
