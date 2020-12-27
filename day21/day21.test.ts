import assert from "assert";
import { part1, part2 } from "./day21";

describe("Day 21", () => {
    describe("Part 1", () => {
        it("Example should return 5", () => {
            assert.strictEqual(part1("day21/example.txt"), 5);
        });
        it("Input should return 2659", () => {
            assert.strictEqual(part1("day21/input.txt"), 2659);
        });
    });
    describe("Part 2", () => {
        it('Example should return "mxmxvkd,sqjhc,fvjkl"', () => {
            assert.strictEqual(part2("day21/example.txt"), "mxmxvkd,sqjhc,fvjkl");
        });
        it('Input should return "rcqb,cltx,nrl,qjvvcvz,tsqpn,xhnk,tfqsb,zqzmzl"', () => {
            assert.strictEqual(
                part2("day21/input.txt"),
                "rcqb,cltx,nrl,qjvvcvz,tsqpn,xhnk,tfqsb,zqzmzl",
            );
        });
    });
});
