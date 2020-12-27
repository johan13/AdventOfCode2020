import { readFileSync } from "fs";

export const part1 = (filePath: string) => crabCombat(filePath, nonRecursiveGame);
export const part2 = (filePath: string) => crabCombat(filePath, recursiveGame);

function crabCombat(filePath: string, playGame: (deck1: number[], deck2: number[]) => 1 | 2) {
    const [deck1, deck2] = getInput(filePath);
    const winningDeck = playGame(deck1, deck2) === 1 ? deck1 : deck2;
    return winningDeck.reverse().reduce((sum, card, i) => sum + card * (i + 1), 0);
}

function nonRecursiveGame(deck1: number[], deck2: number[]) {
    for (;;) {
        const c1 = deck1.shift()!;
        const c2 = deck2.shift()!;
        if (c1 > c2) {
            deck1.push(c1, c2);
            if (deck2.length === 0) {
                return 1;
            }
        } else if (c2 > c1) {
            deck2.push(c2, c1);
            if (deck1.length === 0) {
                return 2;
            }
        } else {
            throw new Error("Draw");
        }
    }
}

function recursiveGame(deck1: number[], deck2: number[]) {
    const history = new Set<string>();
    for (;;) {
        const thisState = [deck1, deck2].map(x => x.join(",")).join("/");
        if (history.has(thisState)) {
            return 1;
        }
        history.add(thisState);
        const c1 = deck1.shift()!;
        const c2 = deck2.shift()!;
        let winner: 1 | 2;
        if (deck1.length >= c1 && deck2.length >= c2) {
            winner = recursiveGame(deck1.slice(0, c1), deck2.slice(0, c2));
        } else if (c1 > c2) {
            winner = 1;
        } else if (c2 > c1) {
            winner = 2;
        } else {
            throw new Error("Draw");
        }
        if (winner === 1) {
            deck1.push(c1, c2);
            if (deck2.length === 0) {
                return 1;
            }
        } else {
            deck2.push(c2, c1);
            if (deck1.length === 0) {
                return 2;
            }
        }
    }
}

function getInput(filePath: string) {
    return readFileSync(filePath, "utf8")
        .trimEnd()
        .split("\n\n")
        .map(x =>
            x
                .split("\n")
                .slice(1)
                .map(x => parseInt(x, 10)),
        );
}
