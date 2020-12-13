import { readFileSync } from "fs";
import _ from "lodash";

export const part1 = (filePath: string) => foo(filePath, policy1);
export const part2 = (filePath: string) => foo(filePath, policy2);

type Map = string[][];

export function foo(filePath: string, policy: (map: Map, x: number, y: number) => string) {
    let map = getInput(filePath);
    for (;;) {
        const newMap = updateMap(map, policy);
        if (_.isEqual(map, newMap)) {
            return countTakenSeats(map);
        }
        map = newMap;
    }
}

function updateMap(oldMap: Map, policy: (map: Map, x: number, y: number) => string) {
    const newMap = _.cloneDeep(oldMap);
    for (let y = 0; y < oldMap.length; y++) {
        for (let x = 0; x < oldMap[0].length; x++) {
            newMap[y][x] = policy(oldMap, x, y);
        }
    }
    return newMap;
}

function policy1(map: Map, x: number, y: number) {
    const neighbors = [
        [x - 1, y - 1],
        [x, y - 1],
        [x + 1, y - 1],
        [x - 1, y],
        [x + 1, y],
        [x - 1, y + 1],
        [x, y + 1],
        [x + 1, y + 1],
    ];
    const occupiedNeighbors = neighbors.reduce(
        (sum, [x, y]) => sum + (map[y]?.[x] === "#" ? 1 : 0),
        0,
    );
    const currentState = map[y][x];
    if (currentState === "L" && occupiedNeighbors === 0) {
        return "#";
    } else if (currentState === "#" && occupiedNeighbors >= 4) {
        return "L";
    } else {
        return currentState;
    }
}

function policy2(map: Map, x: number, y: number) {
    const directions = [
        [-1, -1],
        [0, -1],
        [1, -1],
        [-1, 0],
        [1, 0],
        [-1, 1],
        [0, +1],
        [1, 1],
    ];
    const occupiedNeighbors = directions.reduce(
        (sum, [dx, dy]) => sum + ("#" === findAlongDirection(map, x, y, dx, dy) ? 1 : 0),
        0,
    );
    const currentState = map[y][x];
    if (currentState === "L" && occupiedNeighbors === 0) {
        return "#";
    } else if (currentState === "#" && occupiedNeighbors >= 5) {
        return "L";
    } else {
        return currentState;
    }
}

function findAlongDirection(map: Map, x: number, y: number, dx: number, dy: number) {
    for (;;) {
        x += dx;
        y += dy;
        switch (map[y]?.[x]) {
            case "#":
                return "#";
            case "L":
            case undefined:
                return "L";
        }
    }
}

function countTakenSeats(map: Map) {
    return map.reduce((sum, row) => sum + row.filter(x => x === "#").length, 0);
}

function getInput(filePath: string) {
    return readFileSync(filePath, "utf8")
        .trimEnd()
        .split("\n")
        .map(x => x.split(""));
}
