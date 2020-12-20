import { readFileSync } from "fs";

export const evaluate1 = (expr: string) => calculate(parse1(tokenize(expr)));
export const evaluate2 = (expr: string) => calculate(parse2(tokenize(expr)));
export const part1 = (filePath: string) => calculateSum(filePath, evaluate1);
export const part2 = (filePath: string) => calculateSum(filePath, evaluate2);

type Token = number | "+" | "*" | "(" | ")";
type AstNode = number | { op: "+" | "*"; left: AstNode; right: AstNode };
type Parser = (tokens: Token[]) => AstNode;

function calculateSum(filePath: string, evaluate: (expr: string) => number) {
    return getInput(filePath)
        .map(evaluate)
        .reduce((sum, x) => sum + x);
}

function tokenize(input: string): Token[] {
    // For simplicity, assume all numbers are between 0 and 9.
    return input
        .replace(/ /g, "")
        .split("")
        .map(str => {
            switch (str) {
                case "+":
                case "*":
                case "(":
                case ")":
                    return str;
                default:
                    return parseInt(str, 10);
            }
        });
}

function parse1(tokens: Token[]): AstNode {
    let left = parseValue(tokens, parse1);
    while (tokens.length > 0 && tokens[0] !== ")") {
        const op = tokens.shift();
        switch (op) {
            case "+":
            case "*":
                left = { op, left, right: parseValue(tokens, parse1) };
                break;
            default:
                throw new Error("Syntax error");
        }
    }
    return left;
}

function parse2(tokens: Token[]): AstNode {
    const values = [parseValue(tokens, parse2)];
    const operators: Array<"+" | "*"> = [];
    while (tokens.length > 0 && tokens[0] !== ")") {
        const op = tokens.shift();
        switch (op) {
            case "+":
            case "*":
                operators.push(op);
                values.push(parseValue(tokens, parse2));
                break;
            default:
                throw new Error("Syntax error");
        }
    }
    while (operators.length > 0) {
        let i = Math.max(0, operators.indexOf("+"));
        const op = operators.splice(i, 1)[0];
        values.splice(i, 2, { op, left: values[i], right: values[i + 1] });
    }
    return values[0];
}

function parseValue(tokens: Token[], expressionParser: Parser): AstNode {
    const token = tokens.shift();
    if (typeof token === "number") {
        return token;
    }
    if (token === "(") {
        const subexpression = expressionParser(tokens);
        if (tokens.shift() === ")") {
            return subexpression;
        }
    }
    throw new Error("Syntax error");
}

function calculate(node: AstNode): number {
    if (typeof node === "number") {
        return node;
    }
    switch (node.op) {
        case "*":
            return calculate(node.left) * calculate(node.right);
        case "+":
            return calculate(node.left) + calculate(node.right);
    }
}

function getInput(filePath: string) {
    return readFileSync(filePath, "utf8")
        .trimEnd()
        .split("\n")
        .map(x => x);
}
