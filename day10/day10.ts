import { readFileSync } from "fs";

export function part1(filePath: string) {
    const adapters = getInput(filePath);
    let diff1 = 0;
    let diff3 = 0;
    for (let i = 0; i < adapters.length - 1; i++) {
        switch (adapters[i + 1] - adapters[i]) {
            case 1:
                diff1++;
                break;
            case 3:
                diff3++;
                break;
        }
    }
    return diff1 * diff3;
}

export function part2(filePath: string) {
    const adapters = getInput(filePath);
    return partitionAtGapsOfThree(adapters).reduce((prod, x) => prod * validCombinations(x), 1);
}

function partitionAtGapsOfThree(adapters: number[]) {
    const partitions: number[][] = [];
    let start = 0;
    for (let end = 0; end < adapters.length - 1; end++) {
        if (adapters[end + 1] === adapters[end] + 3) {
            partitions.push(adapters.slice(start, end + 1));
            start = end + 1;
        }
    }
    partitions.push(adapters.slice(start));
    return partitions;
}

function validCombinations(adapters: number[], skip = 1): number {
    if (skip === adapters.length) {
        return 1;
    }
    const max = adapters[skip - 1] + 3;
    let numFound = 0;
    for (let i = skip; i < adapters.length && adapters[i] <= max; i++) {
        numFound += validCombinations(adapters, i + 1);
    }
    return numFound;
}

function getInput(filePath: string) {
    const input = readFileSync(filePath, "utf8")
        .trimEnd()
        .split("\n")
        .map(x => parseInt(x, 10));
    // Sort, then add the outlet and the built-in adapter.
    input.sort((a, b) => a - b);
    input.unshift(0);
    input.push(input[input.length - 1] + 3);
    return input;
}
