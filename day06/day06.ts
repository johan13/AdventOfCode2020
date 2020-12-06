import { readFileSync } from "fs";
import { intersection, union } from "lodash";

export const part1 = (filePath: string) => sumOverGroups(filePath, union);
export const part2 = (filePath: string) => sumOverGroups(filePath, intersection);

const sumOverGroups = (filePath: string, reducer: (...args: string[][]) => string[]) =>
    readFileSync(filePath, "utf8")
        .trimEnd()
        .split("\n\n")
        .map(x => x.split("\n").map(y => y.split("")))
        .reduce((sum, group) => sum + reducer(...group).length, 0);
