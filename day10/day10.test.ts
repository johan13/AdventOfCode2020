import assert from "assert";
import { part1, part2 } from "./day10";

describe("Day 10", () => {
    describe("Part 1", () => {
        it("Example should return 35", () => {
            assert.strictEqual(part1("day10/example1.txt"), 35);
        });
        it("Example should return 220", () => {
            assert.strictEqual(part1("day10/example2.txt"), 220);
        });
        it("Input should return 2232", () => {
            assert.strictEqual(part1("day10/input.txt"), 2232);
        });
    });
    describe("Part 2", () => {
        it("Example should return 8", () => {
            assert.strictEqual(part2("day10/example1.txt"), 8);
        });
        it("Example should return 19208", () => {
            assert.strictEqual(part2("day10/example2.txt"), 19208);
        });
        it("Input should return 173625106649344", () => {
            assert.strictEqual(part2("day10/input.txt"), 173625106649344);
        });
    });
});
