import assert from "assert";
import { part1, part2 } from "./day13";

describe("Day 13", () => {
    describe("Part 1", () => {
        it("Example should return 295", () => {
            assert.strictEqual(part1("day13/example1.txt"), 295);
        });
        it("Input should return 410", () => {
            assert.strictEqual(part1("day13/input.txt"), 410);
        });
    });
    describe("Part 2", () => {
        it("Example should return 1068781", () => {
            assert.strictEqual(part2("day13/example1.txt"), 1068781);
        });
        it("Additional examples", () => {
            assert.strictEqual(part2("day13/example2a.txt"), 3417);
            assert.strictEqual(part2("day13/example2b.txt"), 754018);
            assert.strictEqual(part2("day13/example2c.txt"), 779210);
            assert.strictEqual(part2("day13/example2d.txt"), 1261476);
            assert.strictEqual(part2("day13/example2e.txt"), 1202161486);
        });
        it("Input should return 600691418730595", () => {
            assert.strictEqual(part2("day13/input.txt"), 600691418730595);
        });
    });
});
