import { readFileSync } from "fs";

export function part1(filePath: string) {
    const { earliest, busIds } = getInput(filePath);
    const timeTable = busIds
        .filter(x => !isNaN(x))
        .map(busId => ({ busId, nextDeparture: Math.ceil(earliest / busId) * busId }))
        .sort((a, b) => a.nextDeparture - b.nextDeparture);
    return timeTable[0].busId * (timeTable[0].nextDeparture - earliest);
}

export function part2(filePath: string) {
    const buses = getInput(filePath)
        .busIds.map((busId, offset) => ({ busId, offset }))
        .filter(({ busId }) => !isNaN(busId));

    for (let x = 1; x <= Number.MAX_SAFE_INTEGER; ) {
        const matches = buses.filter(b => (x + b.offset) % b.busId === 0);
        if (matches.length === buses.length) {
            return x;
        }
        // We should add the lowest common multiple. For prime busId we can use the product instead.
        x += matches.reduce((prod, b) => prod * b.busId, 1);
    }
    throw new Error("We need BigInt");
}

function getInput(filePath: string) {
    const lines = readFileSync(filePath, "utf8").split("\n");
    return {
        earliest: parseInt(lines[0], 10),
        busIds: lines[1].split(",").map(x => parseInt(x, 10)),
    };
}
