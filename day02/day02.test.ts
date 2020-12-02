import assert from "assert";
import { countValidPasswords1, countValidPasswords2 } from "./day02";

describe("Day 2", () => {
    describe("Part 1", () => {
        it("Example should return 2", async () => {
            assert.strictEqual(await countValidPasswords1("day02/example.txt"), 2);
        });
        it("Input should return 550", async () => {
            assert.strictEqual(await countValidPasswords1("day02/input.txt"), 550);
        });
    });
    describe("Part 2", () => {
        it("Example should return 1", async () => {
            assert.strictEqual(await countValidPasswords2("day02/example.txt"), 1);
        });
        it("Input should return 634", async () => {
            assert.strictEqual(await countValidPasswords2("day02/input.txt"), 634);
        });
    });
});
