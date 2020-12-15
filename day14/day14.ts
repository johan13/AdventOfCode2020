import { readFileSync } from "fs";
import _ from "lodash";

export function part1(filePath: string) {
    const program = getInput(filePath);
    // Bitwise operators on number only works up to 32 bits. We need BigInt.
    const memory = new Map<bigint, bigint>();
    let orMask = 0n;
    let andMask = 0n;
    for (const entry of program) {
        switch (entry.op) {
            case "mask":
                orMask = entry.ones;
                andMask = ~entry.zeros;
                break;
            case "mem":
                memory.set(entry.address, (entry.value & andMask) | orMask);
                break;
        }
    }
    return [...memory.values()].reduce((sum, val) => sum + Number(val), 0);
}

export function part2(filePath: string) {
    const program = getInput(filePath);
    const memory = new Map<bigint, bigint>();
    let ones = 0n;
    let floating = 0n;
    for (const entry of program) {
        switch (entry.op) {
            case "mask":
                ones = entry.ones;
                floating = entry.exes;
                break;
            case "mem":
                const addr = (entry.address | ones) & ~floating;
                for (const f of getFloating(floating)) {
                    memory.set(addr | f, entry.value);
                }
                break;
        }
    }
    return [...memory.values()].reduce((sum, val) => sum + Number(val), 0);
}

function* getFloating(floating: bigint) {
    const singleOnes = _.range(0, 36)
        .map(x => 1n << BigInt(x))
        .filter(x => floating & x);
    for (let mask = 0n; mask < 2 ** singleOnes.length; mask++) {
        yield singleOnes.reduce((acc, one, i) => acc | (mask & (1n << BigInt(i)) ? one : 0n), 0n);
    }
}

function getInput(filePath: string) {
    return readFileSync(filePath, "utf8")
        .trimEnd()
        .split("\n")
        .map(line => {
            let match: RegExpExecArray | null;
            if (null !== (match = /^mask = ([01X]{36})$/.exec(line))) {
                return {
                    op: "mask",
                    zeros: toBitmask(match[1], "0"),
                    ones: toBitmask(match[1], "1"),
                    exes: toBitmask(match[1], "X"),
                } as const;
            } else if (null !== (match = /^mem\[(\d+)\] = (\d+)$/.exec(line))) {
                return {
                    op: "mem",
                    address: BigInt(parseInt(match[1], 10)),
                    value: BigInt(parseInt(match[2], 10)),
                } as const;
            } else {
                throw new Error("Invalid input");
            }
        });
}

function toBitmask(str: string, ch: string) {
    str = str
        .split("")
        .map(x => (x === ch ? "1" : "0"))
        .join("");
    return BigInt(parseInt(str, 2));
}
