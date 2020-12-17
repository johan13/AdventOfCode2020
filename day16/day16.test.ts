import assert from "assert";
import { part1, part2 } from "./day16";

describe("Day 16", () => {
    describe("Part 1", () => {
        it("Example should return 71", () => {
            assert.strictEqual(part1("day16/example.txt"), 71);
        });
        it("Input should return 19240", () => {
            assert.strictEqual(part1("day16/input.txt"), 19240);
        });
    });
    describe("Part 2", () => {
        it("Input should return 21095351239483", () => {
            assert.strictEqual(part2("day16/input.txt"), 21095351239483);
        });
    });
});
