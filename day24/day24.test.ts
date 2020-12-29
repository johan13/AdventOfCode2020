import assert from "assert";
import { part1, part2 } from "./day24";

describe("Day 24", () => {
    describe("Part 1", () => {
        it("Example should return 10", () => {
            assert.strictEqual(part1("day24/example.txt"), 10);
        });
        it("Input should return 263", () => {
            assert.strictEqual(part1("day24/input.txt"), 263);
        });
    });
    describe("Part 2", () => {
        it("Example should return 2208", () => {
            assert.strictEqual(part2("day24/example.txt"), 2208);
        });
        it("Input should return 3649", () => {
            assert.strictEqual(part2("day24/input.txt"), 3649);
        });
    });
});
