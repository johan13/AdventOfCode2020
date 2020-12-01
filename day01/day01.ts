import readAndParse from "../common/readAndParse";

export async function getProductOfTwo(filePath: string) {
    const target = 2020;
    const input = await readAndParse(filePath, x => parseInt(x, 10));
    for (let i = 0; i < input.length - 1; i++) {
        for (let j = i + 1; j < input.length; j++) {
            if (input[i] + input[j] === target) {
                return input[i] * input[j];
            }
        }
    }
    throw new Error("Not found");
}

export async function getProductOfThree(filePath: string) {
    const target = 2020;
    const input = await readAndParse(filePath, x => parseInt(x, 10));
    for (let i = 0; i < input.length - 2; i++) {
        for (let j = i + 1; j < input.length - 1; j++) {
            for (let k = j + 1; k < input.length; k++) {
                if (input[i] + input[j] + input[k] === target) {
                    return input[i] * input[j] * input[k];
                }
            }
        }
    }
    throw new Error("Not found");
}
