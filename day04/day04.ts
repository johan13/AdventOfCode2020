import readAndParse from "../common/readAndParse";

export const countValidPassports1 = (filePath: string) => countValidPassports(filePath, isValid1);
export const countValidPassports2 = (filePath: string) => countValidPassports(filePath, isValid2);

async function countValidPassports(filePath: string, isValid: (x: Map<string, string>) => boolean) {
    const passports = await readAndParse(filePath, parsePassport, "\n\n");
    return passports.filter(isValid).length;
}

function parsePassport(text: string) {
    const passport = new Map<string, string>();
    for (const entry of text.split(/\s+/)) {
        const i = entry.indexOf(":");
        passport.set(entry.slice(0, i), entry.slice(i + 1));
    }
    return passport;
}

function isValid1(passport: Map<string, string>) {
    return ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"].every(key => passport.has(key));
}

// Terse but hard to read. :-)
function isValid2(passport: Map<string, string>) {
    return (
        /^19[2-9]\d$|^200[0-2]$/.test(passport.get("byr") ?? "") &&
        /^201\d$|^2020$/.test(passport.get("iyr") ?? "") &&
        /^202\d$|^2030$/.test(passport.get("eyr") ?? "") &&
        /^(1[5-8]\d|19[0-3])cm$|^(59|6\d|7[0-6])in$/.test(passport.get("hgt") ?? "") &&
        /^#[0-9a-f]{6}$/.test(passport.get("hcl") ?? "") &&
        /^amb|blu|brn|gry|grn|hzl|oth$/.test(passport.get("ecl") ?? "") &&
        /^\d{9}$/.test(passport.get("pid") ?? "")
    );
}
