import assert from "assert";
import { countTrees, getProduct } from "./day03";

describe("Day 3", () => {
    describe("Part 1", () => {
        it("Example should return 7", async () => {
            assert.strictEqual(await countTrees("day03/example.txt"), 7);
        });
        it("Input should return 292", async () => {
            assert.strictEqual(await countTrees("day03/input.txt"), 292);
        });
    });
    describe("Part 2", () => {
        it("Example should return 336", async () => {
            assert.strictEqual(await getProduct("day03/example.txt"), 336);
        });
        it("Input should return 9354744432", async () => {
            assert.strictEqual(await getProduct("day03/input.txt"), 9354744432);
        });
    });
});
