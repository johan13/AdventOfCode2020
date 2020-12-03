import readAndParse from "../common/readAndParse";

export async function countTrees(filePath: string) {
    const map = await readAndParse(filePath, x => x);
    return countTreesAlongSlope(map, 3, 1);
}

export async function getProduct(filePath: string) {
    const map = await readAndParse(filePath, x => x);
    return (
        countTreesAlongSlope(map, 1, 1) *
        countTreesAlongSlope(map, 3, 1) *
        countTreesAlongSlope(map, 5, 1) *
        countTreesAlongSlope(map, 7, 1) *
        countTreesAlongSlope(map, 1, 2)
    );
}

function countTreesAlongSlope(map: string[], dx: number, dy: number) {
    const mapHeight = map.length;
    const mapWidth = map[0].length;
    let numTrees = 0;
    for (let x = dx, y = dy; y < mapHeight; x += dx, y += dy) {
        numTrees += map[y][x % mapWidth] === "#" ? 1 : 0;
    }
    return numTrees;
}
