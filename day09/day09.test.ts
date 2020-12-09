import assert from "assert";
import { part1, part2 } from "./day09";

describe("Day 9", () => {
    describe("Part 1", () => {
        it("Example should return 127", () => {
            assert.strictEqual(part1("day09/example.txt", 5), 127);
        });
        it("Input should return 530627549", () => {
            assert.strictEqual(part1("day09/input.txt", 25), 530627549);
        });
    });
    describe("Part 2", () => {
        it("Example should return 62", () => {
            assert.strictEqual(part2("day09/example.txt", 127), 62);
        });
        it("Input should return 77730285", () => {
            assert.strictEqual(part2("day09/input.txt", 530627549), 77730285);
        });
    });
});
