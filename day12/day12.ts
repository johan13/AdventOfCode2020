import { readFileSync } from "fs";

export function part1(filePath: string) {
    let x = 0;
    let y = 0;
    let heading = 90;
    for (const { action, value } of getInput(filePath)) {
        if (action === "N" || (action === "F" && heading === 0)) {
            y += value;
        } else if (action === "S" || (action === "F" && heading === 180)) {
            y -= value;
        } else if (action === "E" || (action === "F" && heading === 90)) {
            x += value;
        } else if (action === "W" || (action === "F" && heading === 270)) {
            x -= value;
        } else if (action === "L") {
            heading = (heading - value + 360) % 360;
        } else if (action === "R") {
            heading = (heading + value) % 360;
        }
    }
    return Math.abs(x) + Math.abs(y);
}

export function part2(filePath: string) {
    let ship = { x: 0, y: 0 };
    let waypoint = { x: 10, y: 1 };
    for (const { action, value } of getInput(filePath)) {
        if (action === "N") {
            waypoint.y += value;
        } else if (action === "S") {
            waypoint.y -= value;
        } else if (action === "E") {
            waypoint.x += value;
        } else if (action === "W") {
            waypoint.x -= value;
        } else if (action === "L") {
            waypoint = rotate(waypoint, value);
        } else if (action === "R") {
            waypoint = rotate(waypoint, -value);
        } else if (action === "F") {
            ship.x += value * waypoint.x;
            ship.y += value * waypoint.y;
        }
    }
    return Math.abs(ship.x) + Math.abs(ship.y);
}

function rotate(pos: { x: number; y: number }, degrees: number) {
    // We expect degrees to be a multiple of 90, so round cos and sin to -1/0/1.
    const cos = Math.round(Math.cos((degrees * Math.PI) / 180));
    const sin = Math.round(Math.sin((degrees * Math.PI) / 180));
    return {
        x: cos * pos.x - sin * pos.y,
        y: sin * pos.x + cos * pos.y,
    };
}

function getInput(filePath: string) {
    return readFileSync(filePath, "utf8")
        .trimEnd()
        .split("\n")
        .map(line => {
            const match = /^([NSEWLRF])(\d+)$/.exec(line);
            if (!match) {
                throw new Error("Invalid input");
            }
            return {
                action: match[1],
                value: parseInt(match[2], 10),
            };
        });
}
