import assert from "assert";
import { countValidPasswords1, countValidPasswords2 } from "./day02";

describe("Day 2", () => {
    describe("Part 1", () => {
        it("Example should return 2", () => {
            assert.strictEqual(countValidPasswords1("day02/example.txt"), 2);
        });
        it("Input should return 550", () => {
            assert.strictEqual(countValidPasswords1("day02/input.txt"), 550);
        });
    });
    describe("Part 2", () => {
        it("Example should return 1", () => {
            assert.strictEqual(countValidPasswords2("day02/example.txt"), 1);
        });
        it("Input should return 634", () => {
            assert.strictEqual(countValidPasswords2("day02/input.txt"), 634);
        });
    });
});
