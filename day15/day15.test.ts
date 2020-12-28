import assert from "assert";
import { part1, part2 } from "./day15";

describe("Day 15", () => {
    describe("Part 1", () => {
        it("Example should return 436", () => {
            assert.strictEqual(part1([0, 3, 6]), 436);
        });
        it("Input should return 211", () => {
            assert.strictEqual(part1([1, 0, 15, 2, 10, 13]), 211);
        });
    });
    describe("Part 2", () => {
        it.skip("Example [0, 3, 6] should return 175594", () => {
            assert.strictEqual(part2([0, 3, 6]), 175594);
        });
        it.skip("Example [1, 3, 2] should return 2578", () => {
            assert.strictEqual(part2([1, 3, 2]), 2578);
        });
        it.skip("Example [2, 1, 3] should return 3544142", () => {
            assert.strictEqual(part2([2, 1, 3]), 3544142);
        });
        it.skip("Example [1, 2, 3] should return 261214", () => {
            assert.strictEqual(part2([1, 2, 3]), 261214);
        });
        it.skip("Example [2, 3, 1] should return 6895259", () => {
            assert.strictEqual(part2([2, 3, 1]), 6895259);
        });
        it.skip("Example [3, 2, 1] should return 18", () => {
            assert.strictEqual(part2([3, 2, 1]), 18);
        });
        it.skip("Example [3, 1, 2] should return 362", () => {
            assert.strictEqual(part2([3, 1, 2]), 362);
        });
        it("Input should return 2159626", () => {
            assert.strictEqual(part2([1, 0, 15, 2, 10, 13]), 2159626);
        });
    });
});
