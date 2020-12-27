import { readFileSync } from "fs";
import { intersection, uniq } from "lodash";

export function part1(filePath: string) {
    const input = getInput(filePath);
    const ingredientToAllergen = getIngredientToAllergenMap(input);
    const badIngredients = new Set(ingredientToAllergen.keys());
    return input.flatMap(i => i.ingredients).filter(i => !badIngredients.has(i)).length;
}

export function part2(filePath: string) {
    const ingredientToAllergen = getIngredientToAllergenMap(getInput(filePath));
    return [...ingredientToAllergen.entries()]
        .sort((a, b) => (a[1] < b[1] ? -1 : 1))
        .map(x => x[0])
        .join(",");
}

function getIngredientToAllergenMap(input: Food[]) {
    const ingredientToAllergen = elliminate(input, possibleIngredientsPerAllergen(input));
    if (!ingredientToAllergen) {
        throw new Error("No solution found");
    }
    return ingredientToAllergen;
}

function possibleIngredientsPerAllergen(input: Food[]) {
    return uniq(input.flatMap(x => x.allergens)).map(allergen => ({
        allergen,
        ingredients: intersection(
            ...input.filter(x => x.allergens.includes(allergen)).map(x => x.ingredients),
        ),
    }));
}

function elliminate(
    foods: Food[],
    allergens: Array<{ allergen: string; ingredients: string[] }>,
): Map<string, string> | null {
    for (let i = 0; i < allergens.length; i++) {
        if (allergens[i].ingredients.length > 1) {
            const orig = allergens[i];
            for (let j = 0; j < orig.ingredients.length; j++) {
                allergens[i] = { allergen: orig.allergen, ingredients: [orig.ingredients[j]] };
                const rc = elliminate(foods, allergens);
                if (rc) {
                    return rc;
                }
            }
            allergens[i] = orig;
        }
    }
    const map = new Map(allergens.map(x => [x.ingredients[0], x.allergen]));
    return isConsistent(foods, map) ? map : null;
}

function isConsistent(foods: Food[], ingredientToAllergen: Map<string, string>) {
    for (const food of foods) {
        const allergens = new Set(food.ingredients.map(x => ingredientToAllergen.get(x)));
        const missingAllergens = food.allergens.filter(a => !allergens.has(a));
        if (missingAllergens.length > 0) {
            return false;
        }
    }
    return true;
}
function getInput(filePath: string) {
    return readFileSync(filePath, "utf8").trimEnd().split("\n").map(parseFood);
}

type Food = ReturnType<typeof parseFood>;

function parseFood(str: string) {
    const match = /^(.*) \(contains (.*)\)$/.exec(str);
    if (!match) {
        throw new Error("Invalid input");
    }
    return {
        ingredients: match[1].split(" "),
        allergens: match[2].split(", "),
    };
}
