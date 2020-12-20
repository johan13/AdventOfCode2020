import assert from "assert";
import { evaluate1, evaluate2, part1, part2 } from "./day18";

describe("Day 18", () => {
    describe("Part 1", () => {
        it("Examples", () => {
            assert.strictEqual(evaluate1("1 + 2 * 3 + 4 * 5 + 6"), 71);
            assert.strictEqual(evaluate1("1 + (2 * 3) + (4 * (5 + 6))"), 51);
            assert.strictEqual(evaluate1("2 * 3 + (4 * 5)"), 26);
            assert.strictEqual(evaluate1("5 + (8 * 3 + 9 + 3 * 4 * 3)"), 437);
            assert.strictEqual(evaluate1("5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))"), 12240);
            assert.strictEqual(evaluate1("((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2"), 13632);
        });
        it("Input should return 69490582260", () => {
            assert.strictEqual(part1("day18/input.txt"), 69490582260);
        });
    });
    describe("Part 2", () => {
        it("Examples", () => {
            assert.strictEqual(evaluate2("1 + 2 * 3 + 4 * 5 + 6"), 231);
            assert.strictEqual(evaluate2("1 + (2 * 3) + (4 * (5 + 6))"), 51);
            assert.strictEqual(evaluate2("2 * 3 + (4 * 5)"), 46);
            assert.strictEqual(evaluate2("5 + (8 * 3 + 9 + 3 * 4 * 3)"), 1445);
            assert.strictEqual(evaluate2("5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))"), 669060);
            assert.strictEqual(evaluate2("((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2"), 23340);
        });
        it("Input should return 362464596624526", () => {
            assert.strictEqual(part2("day18/input.txt"), 362464596624526);
        });
    });
});
