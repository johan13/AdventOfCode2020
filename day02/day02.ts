import readAndParse from "../common/readAndParse";

export const countValidPasswords1 = (filePath: string) => countValidPasswords(filePath, isValid1);
export const countValidPasswords2 = (filePath: string) => countValidPasswords(filePath, isValid2);

async function countValidPasswords(filePath: string, isValid: (x: Entry) => boolean) {
    const input = await readAndParse(filePath, parseEntry);
    return input.filter(isValid).length;
}

type Entry = ReturnType<typeof parseEntry>;
function parseEntry(line: string) {
    const match = /^(\d+)-(\d+) (.): (.*)/.exec(line);
    if (match === null) {
        throw new Error("Invalid input");
    }
    return {
        num1: parseInt(match[1], 10),
        num2: parseInt(match[2], 10),
        letter: match[3],
        password: match[4],
    };
}

function isValid1(entry: Entry) {
    const count = entry.password.split("").filter(x => x === entry.letter).length;
    return count >= entry.num1 && count <= entry.num2;
}

function isValid2(entry: Entry) {
    const firstCorrect = entry.password[entry.num1 - 1] === entry.letter;
    const secondCorrect = entry.password[entry.num2 - 1] === entry.letter;
    return firstCorrect !== secondCorrect;
}
