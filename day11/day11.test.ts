import assert from "assert";
import { part1, part2 } from "./day11";

describe("Day 11", () => {
    describe("Part 1", () => {
        it("Example should return 37", () => {
            assert.strictEqual(part1("day11/example.txt"), 37);
        });
        it("Input should return 2334", () => {
            assert.strictEqual(part1("day11/input.txt"), 2334);
        });
    });
    describe("Part 2", () => {
        it("Example should return 26", () => {
            assert.strictEqual(part2("day11/example.txt"), 26);
        });
        it("Input should return 2100", () => {
            assert.strictEqual(part2("day11/input.txt"), 2100);
        });
    });
});
