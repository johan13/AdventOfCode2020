import { readFileSync } from "fs";
import { cloneDeep, range } from "lodash";

export function part1(filePath: string) {
    const tiles = arrangeTiles(getInput(filePath));
    const h = tiles.length;
    const w = tiles[0].length;
    return tiles[0][0].id * tiles[h - 1][0].id * tiles[0][w - 1].id * tiles[h - 1][w - 1].id;
}

export function part2(filePath: string) {
    const map = mergeTiles(arrangeTiles(getInput(filePath)));
    for (const mapWithMonsters of orientations(map)) {
        const mapWithoutMonsters = removeSeaMosters(mapWithMonsters);
        if (mapWithoutMonsters !== mapWithMonsters) {
            return mapWithoutMonsters.data.flat().filter(x => x).length;
        }
    }
    throw new Error("Not found");
}

function arrangeTiles(input: Tile[]): Tile[][] {
    const imageSize = Math.sqrt(input.length);
    const linear = arrangeRecursively([], input, imageSize);
    if (!linear) {
        throw new Error("No solution found");
    }
    return range(0, imageSize).map(y => range(0, imageSize).map(x => linear[y * imageSize + x]));
}

function arrangeRecursively(placed: Tile[], remaining: Tile[], imageSize: number): Tile[] | null {
    for (const tile of remaining) {
        for (const orientedTile of orientations(tile)) {
            if (isValid(placed, orientedTile, imageSize)) {
                if (remaining.length === 1) {
                    return [...placed, orientedTile];
                }
                const solution = arrangeRecursively(
                    [...placed, orientedTile],
                    remaining.filter(t => t !== tile),
                    imageSize,
                );
                if (solution) {
                    return solution;
                }
            }
        }
    }
    return null;
}

function isValid(placed: Tile[], next: Tile, imageSize: number): boolean {
    const tileSize = next.data.length;
    const toTheLeft = placed.length % imageSize === 0 ? undefined : placed[placed.length - 1];
    const above: Tile | undefined = placed[placed.length - imageSize];
    if (toTheLeft) {
        for (let y = 0; y < tileSize; y++) {
            if (next.data[y][0] !== toTheLeft.data[y][tileSize - 1]) {
                return false;
            }
        }
    }
    if (above) {
        for (let x = 0; x < tileSize; x++) {
            if (next.data[0][x] !== above.data[tileSize - 1][x]) {
                return false;
            }
        }
    }
    return true;
}

function mergeTiles(tiles: Tile[][]): Tile {
    const innerSize = tiles[0][0].data.length - 2;
    const size = tiles.length * innerSize;
    const data = range(0, size).map(y =>
        range(0, size).map(
            x =>
                tiles[Math.floor(y / innerSize)][Math.floor(x / innerSize)].data[
                    (y % innerSize) + 1
                ][(x % innerSize) + 1],
        ),
    );
    return { id: 0, data };
}

// 20 x 3 template
const monsterCoordinates = [
    "                  # ",
    "#    ##    ##    ###",
    " #  #  #  #  #  #   ",
].flatMap((row, y) =>
    row
        .split("")
        .map((ch, x) => ({ x, y, ch }))
        .filter(x => x.ch === "#")
        .map(({ x, y }) => ({ x, y })),
);

function removeSeaMosters(tile: Tile): Tile {
    for (let x0 = 0; x0 < tile.data.length - 20; x0++) {
        for (let y0 = 0; y0 < tile.data.length - 3; y0++) {
            if (monsterCoordinates.every(({ x, y }) => tile.data[y0 + y][x0 + x])) {
                tile = cloneDeep(tile);
                monsterCoordinates.forEach(({ x, y }) => {
                    tile.data[y0 + y][x0 + x] = false;
                });
            }
        }
    }
    return tile;
}

function* orientations(tile: Tile) {
    yield tile;
    yield (tile = rotate(tile));
    yield (tile = rotate(tile));
    yield (tile = rotate(tile));
    yield (tile = flip(tile));
    yield (tile = rotate(tile));
    yield (tile = rotate(tile));
    yield (tile = rotate(tile));
}

function rotate({ id, data }: Tile): Tile {
    const tileSize = data.length;
    return {
        id,
        data: range(0, tileSize).map(y => range(0, tileSize).map(x => data[x][tileSize - 1 - y])),
    };
}

function flip({ id, data }: Tile): Tile {
    const tileSize = data.length;
    return {
        id,
        data: range(0, tileSize).map(y => range(0, tileSize).map(x => data[y][tileSize - 1 - x])),
    };
}

function getInput(filePath: string) {
    return readFileSync(filePath, "utf8").trimEnd().split("\n\n").map(parseTile);
}

type Tile = {
    id: number;
    data: boolean[][];
};

function parseTile(str: string): Tile {
    const [title, ...rows] = str.split("\n");
    const titleMatch = /^Tile (\d+):$/.exec(title);
    if (!titleMatch) {
        throw new Error("Invalid input");
    }
    return {
        id: parseInt(titleMatch[1], 10),
        data: rows.map(row => row.split("").map(x => x === "#")),
    };
}
