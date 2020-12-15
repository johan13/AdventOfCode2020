import assert from "assert";
import { part1, part2 } from "./day14";

describe("Day 14", () => {
    describe("Part 1", () => {
        it("Example should return 165", () => {
            assert.strictEqual(part1("day14/example1.txt"), 165);
        });
        it("Input should return 17934269678453", () => {
            assert.strictEqual(part1("day14/input.txt"), 17934269678453);
        });
    });
    describe("Part 2", () => {
        it("Example should return 208", () => {
            assert.strictEqual(part2("day14/example2.txt"), 208);
        });
        it("Input should return 3440662844064", () => {
            assert.strictEqual(part2("day14/input.txt"), 3440662844064);
        });
    });
});
