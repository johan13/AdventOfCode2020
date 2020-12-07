import { readFileSync } from "fs";

export function part1(filePath: string) {
    return new Set(findOuterColors("shiny gold", getInput(filePath))).size;
}

function findOuterColors(innerColor: string, rules: Rule[]): string[] {
    const nextColors = rules
        .filter(r => r.inner.find(x => x.color === innerColor))
        .map(y => y.outerColor);
    return [...nextColors, ...nextColors.flatMap(c => findOuterColors(c, rules))];
}

export function part2(filePath: string) {
    return countInnerBags("shiny gold", getInput(filePath));
}

function countInnerBags(color: string, rules: Rule[]): number {
    return rules
        .find(r => r.outerColor === color)!
        .inner.reduce((sum, i) => sum + i.count * (1 + countInnerBags(i.color, rules)), 0);
}

function getInput(filePath: string) {
    return readFileSync(filePath, "utf8").trimEnd().split("\n").map(parseEntry);
}

type Rule = ReturnType<typeof parseEntry>;
function parseEntry(line: string) {
    const match1 = /^(.+) bags contain (.*)\.$/.exec(line);
    if (!match1) {
        throw new Error("Invalid input");
    }
    const [, outerColor, innerText] = match1;

    const inner =
        innerText === "no other bags"
            ? []
            : innerText.split(", ").map(str => {
                  const match2 = /^(\d+) (.*) bags?$/.exec(str);
                  if (!match2) {
                      throw new Error("Invalid input");
                  }
                  return {
                      count: parseInt(match2[1], 10),
                      color: match2[2],
                  };
              });
    return { outerColor, inner };
}
