import assert from "assert";
import { countValidPassports1, countValidPassports2 } from "./day04";

describe("Day 4", () => {
    describe("Part 1", () => {
        it("Example should return 2", () => {
            assert.strictEqual(countValidPassports1("day04/example1.txt"), 2);
        });
        it("Input should return 213", () => {
            assert.strictEqual(countValidPassports1("day04/input.txt"), 213);
        });
    });
    describe("Part 2", () => {
        it("Example A should return 0", () => {
            assert.strictEqual(countValidPassports2("day04/example2a.txt"), 0);
        });
        it("Example B should return 4", () => {
            assert.strictEqual(countValidPassports2("day04/example2b.txt"), 4);
        });
        it("Input should return 147", () => {
            assert.strictEqual(countValidPassports2("day04/input.txt"), 147);
        });
    });
});
