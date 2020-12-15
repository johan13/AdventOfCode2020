export const part1 = (input: number[]) => memoryGame(input, 2020);
export const part2 = (input: number[]) => memoryGame(input, 30000000);

function memoryGame(firstNumbers: number[], numRounds: number) {
    const memory = new Map<number, number>(); // Map number -> round last spoken.
    let number = 0;
    let lastRound: number | undefined;
    for (let round = 1; round <= numRounds; round++) {
        if (round <= firstNumbers.length) {
            number = firstNumbers[round - 1];
        } else {
            number = lastRound === undefined ? 0 : round - 1 - lastRound;
        }
        lastRound = memory.get(number);
        memory.set(number, round);
    }
    return number;
}
