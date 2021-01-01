import assert from "assert";
import { part1, part2 } from "./day23";

describe("Day 23", () => {
    describe("Part 1", () => {
        it("Example should return 67384529", () => {
            assert.strictEqual(part1("389125467"), "67384529");
        });
        it("Input should return 35827964", () => {
            assert.strictEqual(part1("219748365"), "35827964");
        });
    });
    describe("Part 2", () => {
        it("Example should return 149245887792", () => {
            assert.strictEqual(part2("389125467"), 149245887792);
        });
        it("Input should return 5403610688", () => {
            assert.strictEqual(part2("219748365"), 5403610688);
        });
    });
});
