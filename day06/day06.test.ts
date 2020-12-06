import assert from "assert";
import { part1, part2 } from "./day06";

describe("Day 6", () => {
    describe("Part 1", () => {
        it("Example should return 11", () => {
            assert.strictEqual(part1("day06/example.txt"), 11);
        });
        it("Input should return 6625", () => {
            assert.strictEqual(part1("day06/input.txt"), 6625);
        });
    });
    describe("Part 2", () => {
        it("Example should return 6", () => {
            assert.strictEqual(part2("day06/example.txt"), 6);
        });
        it("Input should return 3360", () => {
            assert.strictEqual(part2("day06/input.txt"), 3360);
        });
    });
});
