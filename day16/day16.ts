import { readFileSync } from "fs";
import { range } from "lodash";

export function part1(filePath: string) {
    const { rules, nearby } = getInput(filePath);
    const allRanges = rules.flatMap(x => x.ranges);
    const allNumbers = nearby.flat();
    const invalid = allNumbers.filter(n => allRanges.every(r => n < r.from || n > r.to));
    return invalid.reduce((sum, n) => sum + n);
}

export function part2(filePath: string) {
    const { rules, yours, nearby } = getInput(filePath);
    const allRanges = rules.flatMap(x => x.ranges);
    const validTickets = nearby.filter(t =>
        t.every(n => allRanges.some(r => n >= r.from && n <= r.to)),
    );
    return [...getFieldMap(rules, validTickets)]
        .filter(({ field }) => field.startsWith("departure"))
        .reduce((prod, { column }) => prod * yours[column], 1);
}

function* getFieldMap(rules: Rule[], tickets: number[][]) {
    const columns = range(0, rules.length);
    while (rules.length > 0) {
        for (const { rule, column } of getUnambiguousFields(rules, columns, tickets)) {
            yield { field: rule.field, column };
            rules.splice(rules.indexOf(rule), 1);
            columns.splice(columns.indexOf(column), 1);
        }
    }
}

function getUnambiguousFields(rules: Rule[], columns: number[], tickets: number[][]) {
    return rules
        .map(rule => {
            const possibleColumns = columns.filter(c =>
                tickets.every(t => rule.ranges.some(rule => t[c] >= rule.from && t[c] <= rule.to)),
            );
            return { rule, column: possibleColumns.length === 1 ? possibleColumns[0] : -1 };
        })
        .filter(({ column }) => column !== -1);
}

function getInput(filePath: string) {
    const [rules, yours, nearby] = readFileSync(filePath, "utf8")
        .split(/your ticket:|nearby tickets:/)
        .map(x => x.trim());
    return {
        rules: rules.split("\n").map(parseRule),
        yours: yours.split(",").map(x => parseInt(x, 10)),
        nearby: nearby.split("\n").map(x => x.split(",").map(x => parseInt(x, 10))),
    };
}

type Rule = ReturnType<typeof parseRule>;
function parseRule(text: string) {
    const [field, allRanges] = text.split(": ");
    const ranges = allRanges.split(" or ");
    return {
        field,
        ranges: ranges.map(x => {
            const [from, to] = x.split("-");
            return { from: parseInt(from, 10), to: parseInt(to, 10) };
        }),
    };
}
