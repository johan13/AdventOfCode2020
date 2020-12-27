import assert from "assert";
import { part1, part2 } from "./day22";

describe("Day 22", () => {
    describe("Part 1", () => {
        it("Example should return 306", () => {
            assert.strictEqual(part1("day22/example.txt"), 306);
        });
        it("Input should return 32162", () => {
            assert.strictEqual(part1("day22/input.txt"), 32162);
        });
    });
    describe("Part 2", () => {
        it("Example should return 291", () => {
            assert.strictEqual(part2("day22/example.txt"), 291);
        });
        it("Input should return 32534", () => {
            assert.strictEqual(part2("day22/input.txt"), 32534);
        });
    });
});
