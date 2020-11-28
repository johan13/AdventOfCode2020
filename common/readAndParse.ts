import { promises as fs } from "fs";
import { resolve } from "path";

export default async function readAndParse<T>(
    file: string,
    parser: (s: string) => T,
    separator = "\n",
): Promise<T[]> {
    const fileContents = await fs.readFile(resolve(__dirname, "..", file), "utf8");
    return fileContents.trimRight().split(separator).map(parser);
}
