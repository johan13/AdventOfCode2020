import { readFileSync } from "fs";

export const part1 = (filePath: string) => lobbyLayout(filePath, 0);
export const part2 = (filePath: string) => lobbyLayout(filePath, 100);

// We use "Axial Coordinates" with a conventional X-axis and the Y-axis tilted 30° left.
//    ^ Y
//     \
//      \
//       -----> X
//
// For example, a step to NW increments Y by one and leaves X unchanged. NE => increment X and Y.

function lobbyLayout(filePath: string, numDays: number) {
    const floor = new HexFloor();
    getInput(filePath)
        .map(stepsToCoordinates)
        .forEach(c => floor.flip(c));
    for (let i = 0; i < numDays; i++) {
        applyFlipRules(floor);
    }
    return floor.numBlack();
}

function applyFlipRules(floor: HexFloor) {
    const toFlip: Coord[] = [];
    for (let x = floor.minx - 1; x <= floor.maxx + 1; x++) {
        for (let y = floor.miny - 1; y <= floor.maxy + 1; y++) {
            const isBlack = floor.isBlack({ x, y });
            const blackNeighbors = getNeighbors({ x, y }).filter(c => floor.isBlack(c)).length;
            if (isBlack && (blackNeighbors === 0 || blackNeighbors > 2)) {
                toFlip.push({ x, y });
            } else if (!isBlack && blackNeighbors === 2) {
                toFlip.push({ x, y });
            }
        }
    }
    toFlip.forEach(c => floor.flip(c));
}

function stepsToCoordinates(steps: Direction[]): Coord {
    const delta = {
        e: { x: 1, y: 0 },
        w: { x: -1, y: 0 },
        se: { x: 0, y: -1 },
        sw: { x: -1, y: -1 },
        nw: { x: 0, y: 1 },
        ne: { x: 1, y: 1 },
    };
    return steps
        .map(x => delta[x])
        .reduce((pos, d) => ({ x: pos.x + d.x, y: pos.y + d.y }), { x: 0, y: 0 });
}

function getNeighbors(c: Coord): Coord[] {
    return [
        { x: c.x + 1, y: c.y },
        { x: c.x - 1, y: c.y },
        { x: c.x, y: c.y - 1 },
        { x: c.x - 1, y: c.y - 1 },
        { x: c.x, y: c.y + 1 },
        { x: c.x + 1, y: c.y + 1 },
    ];
}

function getInput(filePath: string): Direction[][] {
    return readFileSync(filePath, "utf8")
        .trimEnd()
        .split("\n")
        .map(x => [...parseLine(x)]);
}

function* parseLine(line: string) {
    for (let i = 0; i < line.length; i++) {
        if (line[i] === "e") {
            yield "e";
        } else if (line[i] === "w") {
            yield "w";
        } else {
            const dir = line[i] + line[i + 1];
            switch (dir) {
                case "se":
                case "sw":
                case "nw":
                case "ne":
                    i++;
                    yield dir;
                    break;
                default:
                    throw new Error("Invalid input");
            }
        }
    }
}

type Direction = "e" | "w" | "se" | "sw" | "nw" | "ne";
type Coord = { x: number; y: number };
class HexFloor {
    public minx = 0;
    public maxx = 0;
    public miny = 0;
    public maxy = 0;
    private black = new Set<string>();

    public flip(c: Coord) {
        const str = `${c.x},${c.y}`;
        if (this.black.has(str)) {
            this.black.delete(str);
            // Don't bother adjusting the bounding box.
        } else {
            this.black.add(str);
            this.minx = Math.min(this.minx, c.x);
            this.maxx = Math.max(this.maxx, c.x);
            this.miny = Math.min(this.miny, c.y);
            this.maxy = Math.max(this.maxy, c.y);
        }
    }

    public isBlack(c: Coord) {
        return this.black.has(`${c.x},${c.y}`);
    }

    public numBlack() {
        return this.black.size;
    }
}
