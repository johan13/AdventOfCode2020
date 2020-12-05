import { readFileSync } from "fs";
import { resolve } from "path";

export default function readAndParse<T>(
    file: string,
    parser: (s: string) => T,
    separator: string | RegExp = "\n",
) {
    return readFileSync(resolve(__dirname, "..", file), "utf8")
        .trimRight()
        .split(separator)
        .map(parser);
}
