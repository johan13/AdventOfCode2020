import { readFileSync } from "fs";

export function part1(filePath: string) {
    const publicKeys = getInput(filePath);
    return transform(publicKeys[1], findLoopSize(7, publicKeys[0]));
}

function transform(subjectNumber: number, loopSize: number) {
    let val = 1;
    for (let i = 0; i < loopSize; i++) {
        val = (val * subjectNumber) % 20201227;
    }
    return val;
}

function findLoopSize(subjectNumber: number, publicKey: number) {
    let val = 1;
    for (let loopSize = 1; ; loopSize++) {
        val = (val * subjectNumber) % 20201227;
        if (val === publicKey) {
            return loopSize;
        }
    }
}

function getInput(filePath: string) {
    return readFileSync(filePath, "utf8")
        .trimEnd()
        .split("\n")
        .map(x => parseInt(x, 10));
}
