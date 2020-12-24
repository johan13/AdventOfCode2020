import assert from "assert";
import { part1and2 } from "./day19";

describe("Day 19", () => {
    describe("Part 1", () => {
        it("Example should return 2", () => {
            assert.strictEqual(part1and2("day19/example1.txt"), 2);
        });
        it("Input should return 178", () => {
            assert.strictEqual(part1and2("day19/input1.txt"), 178);
        });
    });
    describe("Part 2", () => {
        it("Example 1 should return 3", () => {
            assert.strictEqual(part1and2("day19/example2a.txt"), 3);
        });
        it("Example 2 should return 12", () => {
            assert.strictEqual(part1and2("day19/example2b.txt"), 12);
        });
        it("Input should return 346", () => {
            assert.strictEqual(part1and2("day19/input2.txt"), 346);
        });
    });
});
