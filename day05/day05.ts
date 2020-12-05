import max from "lodash/max";
import readAndParse from "../common/readAndParse";

// The code is just a binary representation of the seat ID with F/L for 0 and B/R for 1.
export function parseSeatId(code: string) {
    return parseInt(code.replace(/[FL]/g, "0").replace(/[BR]/g, "1"), 2);
}

export async function getHighestSeatId(filePath: string) {
    return max(await readAndParse(filePath, parseSeatId));
}

export async function findEmptySeat(filePath: string) {
    const seatIds = await readAndParse(filePath, parseSeatId);
    seatIds.sort((a, b) => a - b);
    for (let i = 0; i < seatIds.length - 1; i++) {
        if (seatIds[i + 1] === seatIds[i] + 2) {
            return seatIds[i] + 1;
        }
    }
    throw new Error("Not found");
}
