import assert from "assert";
import { part1, part2 } from "./day20";

describe("Day 20", () => {
    describe("Part 1", () => {
        it("Example should return 20899048083289", () => {
            assert.strictEqual(part1("day20/example.txt"), 20899048083289);
        });
        it("Input should return 27798062994017", () => {
            assert.strictEqual(part1("day20/input.txt"), 27798062994017);
        });
    });
    describe("Part 2", () => {
        it("Example should return 273", () => {
            assert.strictEqual(part2("day20/example.txt"), 273);
        });
        it("Input should return 2366", () => {
            assert.strictEqual(part2("day20/input.txt"), 2366);
        });
    });
});
