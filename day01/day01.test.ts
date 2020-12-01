import assert from "assert";
import { getProductOfTwo, getProductOfThree } from "./day01";

describe("Day 1", () => {
    describe("Part 1", () => {
        it("Example should return 514579", async () => {
            assert.strictEqual(await getProductOfTwo("day01/example.txt"), 514579);
        });
        it("Input should return 646779", async () => {
            assert.strictEqual(await getProductOfTwo("day01/input.txt"), 646779);
        });
    });
    describe("Part 2", () => {
        it("Example should return 241861950", async () => {
            assert.strictEqual(await getProductOfThree("day01/example.txt"), 241861950);
        });
        it("Input should return 246191688", async () => {
            assert.strictEqual(await getProductOfThree("day01/input.txt"), 246191688);
        });
    });
});
