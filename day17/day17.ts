import { readFileSync } from "fs";

type Coord3 = { x: number; y: number; z: number };
type Coord4 = { x: number; y: number; z: number; w: number };

export function part1(filePath: string) {
    let activeCubes = getInput(filePath);
    for (let cycle = 0; cycle < 6; cycle++) {
        activeCubes = [...simluateCycle3(activeCubes)];
    }
    return activeCubes.length;
}

export function part2(filePath: string) {
    let activeCubes = getInput(filePath).map(({ x, y, z }) => ({ x, y, z, w: 0 }));
    for (let cycle = 0; cycle < 6; cycle++) {
        activeCubes = [...simluateCycle4(activeCubes)];
    }
    return activeCubes.length;
}

function* simluateCycle3(before: Coord3[]) {
    const bb = boundingBox3(before);
    const index = new Set(before.map(c => `${c.x},${c.y},${c.z}`));
    for (let x = bb.minX - 1; x <= bb.maxX + 1; x++) {
        for (let y = bb.minY - 1; y <= bb.maxY + 1; y++) {
            for (let z = bb.minZ - 1; z <= bb.maxZ + 1; z++) {
                const isActive = index.has(`${x},${y},${z}`);
                const activeNeighbors = countNeighbors3(index, x, y, z);
                if (isActive && (activeNeighbors === 2 || activeNeighbors === 3)) {
                    yield { x, y, z };
                }
                if (!isActive && activeNeighbors === 3) {
                    yield { x, y, z };
                }
            }
        }
    }
}

function countNeighbors3(index: Set<string>, x0: number, y0: number, z0: number) {
    let count = 0;
    for (let x = x0 - 1; x <= x0 + 1; x++) {
        for (let y = y0 - 1; y <= y0 + 1; y++) {
            for (let z = z0 - 1; z <= z0 + 1; z++) {
                if ((x !== x0 || y !== y0 || z !== z0) && index.has(`${x},${y},${z}`)) {
                    count++;
                }
            }
        }
    }
    return count;
}

function boundingBox3(coords: Iterable<Coord3>) {
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    let minZ = Infinity;
    let maxZ = -Infinity;
    for (const c of coords) {
        minX = Math.min(minX, c.x);
        maxX = Math.max(maxX, c.x);
        minY = Math.min(minY, c.y);
        maxY = Math.max(maxY, c.y);
        minZ = Math.min(minZ, c.z);
        maxZ = Math.max(maxZ, c.z);
    }
    return { minX, maxX, minY, maxY, minZ, maxZ };
}

function* simluateCycle4(before: Coord4[]) {
    const bb = boundingBox4(before);
    const index = new Set(before.map(c => `${c.x},${c.y},${c.z},${c.w}`));
    for (let x = bb.minX - 1; x <= bb.maxX + 1; x++) {
        for (let y = bb.minY - 1; y <= bb.maxY + 1; y++) {
            for (let z = bb.minZ - 1; z <= bb.maxZ + 1; z++) {
                for (let w = bb.minW - 1; w <= bb.maxW + 1; w++) {
                    const isActive = index.has(`${x},${y},${z},${w}`);
                    const activeNeighbors = countNeighbors4(index, x, y, z, w);
                    if (isActive && (activeNeighbors === 2 || activeNeighbors === 3)) {
                        yield { x, y, z, w };
                    }
                    if (!isActive && activeNeighbors === 3) {
                        yield { x, y, z, w };
                    }
                }
            }
        }
    }
}

function countNeighbors4(index: Set<string>, x0: number, y0: number, z0: number, w0: number) {
    let count = 0;
    for (let x = x0 - 1; x <= x0 + 1; x++) {
        for (let y = y0 - 1; y <= y0 + 1; y++) {
            for (let z = z0 - 1; z <= z0 + 1; z++) {
                for (let w = w0 - 1; w <= w0 + 1; w++) {
                    if (
                        (x !== x0 || y !== y0 || z !== z0 || w !== w0) &&
                        index.has(`${x},${y},${z},${w}`)
                    ) {
                        count++;
                    }
                }
            }
        }
    }
    return count;
}

function boundingBox4(coords: Iterable<Coord4>) {
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    let minZ = Infinity;
    let maxZ = -Infinity;
    let minW = Infinity;
    let maxW = -Infinity;
    for (const c of coords) {
        minX = Math.min(minX, c.x);
        maxX = Math.max(maxX, c.x);
        minY = Math.min(minY, c.y);
        maxY = Math.max(maxY, c.y);
        minZ = Math.min(minZ, c.z);
        maxZ = Math.max(maxZ, c.z);
        minW = Math.min(minW, c.w);
        maxW = Math.max(maxW, c.w);
    }
    return { minX, maxX, minY, maxY, minZ, maxZ, minW, maxW };
}

function getInput(filePath: string) {
    return readFileSync(filePath, "utf8")
        .trimEnd()
        .split("\n")
        .flatMap((line, y) => line.split("").map((ch, x) => ({ x, y, ch })))
        .filter(({ ch }) => ch === "#")
        .map(({ x, y }) => ({ x, y, z: 0 }));
}
