import { readFileSync } from "fs";

export function part1and2(filePath: string) {
    const { messages, rules } = getInput(filePath);
    return messages.filter(buildPredicate(rules)).length;
}

type Node = { match: (str: string) => number[] };

function buildPredicate(rules: Rule[]) {
    const index = new Map<number, Node>(rules.map(r => [r.id, { match: (str: string) => [] }]));
    for (const rule of rules) {
        if ("leaf" in rule) {
            index.get(rule.id)!.match = str => (str[0] === rule.leaf ? [1] : []);
        } else if ("branches" in rule) {
            const branches = rule.branches.map(branch => branch.map(rule => index.get(rule)!));
            index.get(rule.id)!.match = str => ruleMatch(str, branches);
        }
    }
    const rule0 = index.get(0)!;
    return (msg: string) => rule0.match(msg).includes(msg.length);
}

function ruleMatch(str: string, rule: Node[][]): number[] {
    const lengths = new Set<number>();
    for (const branch of rule) {
        branchMatch(str, branch).forEach(l => lengths.add(l));
    }
    return [...lengths];
}

function branchMatch(str: string, branch: Node[]): number[] {
    if (branch.length === 0) {
        return [0];
    }
    const lengths = new Set<number>();
    const [first, ...rest] = branch;
    for (const l1 of first.match(str)) {
        for (const l2 of branchMatch(str.slice(l1), rest)) {
            lengths.add(l1 + l2);
        }
    }
    return [...lengths];
}

function getInput(filePath: string) {
    const [rulesText, messagesText] = readFileSync(filePath, "utf8").trimEnd().split("\n\n");
    return {
        rules: rulesText.split("\n").map(parseRule),
        messages: messagesText.split("\n"),
    };
}

type Rule = { id: number; leaf: string } | { id: number; branches: number[][] };

function parseRule(text: string): Rule {
    const match = /^(\d+): (.*)$/.exec(text);
    if (!match) {
        throw new Error("Invalid input");
    }
    const id = parseInt(match[1], 10);
    if (match[2][0] === '"') {
        return {
            id,
            leaf: match[2][1],
        };
    }
    return {
        id,
        branches: match[2].split(" | ").map(x => x.split(" ").map(x => parseInt(x, 10))),
    };
}
