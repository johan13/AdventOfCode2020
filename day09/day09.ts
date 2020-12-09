import { readFileSync } from "fs";
import _ from "lodash";

export function part1(filePath: string, preambleLength: number) {
    const input = getInput(filePath);
    while (input.length > preambleLength) {
        if (!isValid(input, preambleLength)) {
            return input[preambleLength];
        }
        input.shift();
    }
    throw new Error("Not found");
}

export function part2(filePath: string, target: number) {
    const input = getInput(filePath);
    for (let lower = 0; lower < input.length - 1; lower++) {
        let sum = 0;
        for (let upper = lower; upper < input.length && sum < target; upper++) {
            sum += input[upper];
            if (sum === target && upper !== lower) {
                const subrange = input.slice(lower, upper + 1);
                return _.min(subrange)! + _.max(subrange)!;
            }
        }
    }
    throw new Error("Not found");
}

function isValid(input: number[], preambleLength: number) {
    const targetSum = input[preambleLength];
    for (let i = 0; i < preambleLength - 1; i++) {
        for (let j = i + 1; j < preambleLength; j++) {
            if (input[i] !== input[j] && input[i] + input[j] === targetSum) {
                return true;
            }
        }
    }
    return false;
}

function getInput(filePath: string) {
    return readFileSync(filePath, "utf8")
        .trimEnd()
        .split("\n")
        .map(x => parseInt(x, 10));
}
