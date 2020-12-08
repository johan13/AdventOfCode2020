import { readFileSync } from "fs";

export function part1(filePath: string) {
    return runProgram(getInput(filePath)).acc;
}

export function part2(filePath: string) {
    const program = getInput(filePath);
    for (let i = 0; i < program.length; i++) {
        const clone = [...program];
        if (clone[i].op === "jmp") {
            clone[i] = { op: "nop", arg: clone[i].arg };
        } else if (clone[i].op === "nop") {
            clone[i] = { op: "jmp", arg: clone[i].arg };
        } else {
            continue;
        }
        const { reason, acc } = runProgram(clone);
        if (reason === "end") {
            return acc;
        }
    }
    throw new Error("No solution found");
}

function runProgram(
    program: Array<{ op: string; arg: number }>,
): { reason: "inf" | "end"; acc: number } {
    const executedLines = new Set<number>();
    let ip = 0;
    let acc = 0;
    for (;;) {
        if (ip === program.length) {
            return { reason: "end", acc };
        } else if (executedLines.has(ip)) {
            return { reason: "inf", acc };
        }
        executedLines.add(ip);
        const { op, arg } = program[ip];
        switch (op) {
            case "acc":
                acc += arg;
                ip++;
                break;
            case "jmp":
                ip += arg;
                break;
            case "nop":
                ip++;
                break;
            default:
                throw new Error("Invalid OP-code");
        }
    }
}

function getInput(filePath: string) {
    return readFileSync(filePath, "utf8")
        .trimEnd()
        .split("\n")
        .map(line => {
            const match = /^(\S+) ([+-]\d+)$/.exec(line);
            if (match === null) {
                throw new Error("Invalid input");
            }
            return {
                op: match[1],
                arg: parseInt(match[2], 10),
            };
        });
}
