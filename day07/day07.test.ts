import assert from "assert";
import { part1, part2 } from "./day07";

describe("Day 7", () => {
    describe("Part 1", () => {
        it("Example should return 4", () => {
            assert.strictEqual(part1("day07/example1.txt"), 4);
        });
        it("Input should return 265", () => {
            assert.strictEqual(part1("day07/input.txt"), 265);
        });
    });
    describe("Part 2", () => {
        it("Example should return 126", () => {
            assert.strictEqual(part2("day07/example2.txt"), 126);
        });
        it("Input should return 14177", () => {
            assert.strictEqual(part2("day07/input.txt"), 14177);
        });
    });
});
