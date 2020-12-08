import assert from "assert";
import { part1, part2 } from "./day08";

describe("Day 8", () => {
    describe("Part 1", () => {
        it("Example should return 5", () => {
            assert.strictEqual(part1("day08/example.txt"), 5);
        });
        it("Input should return 1867", () => {
            assert.strictEqual(part1("day08/input.txt"), 1867);
        });
    });
    describe("Part 2", () => {
        it("Example should return 8", () => {
            assert.strictEqual(part2("day08/example.txt"), 8);
        });
        it("Input should return 1303", () => {
            assert.strictEqual(part2("day08/input.txt"), 1303);
        });
    });
});
