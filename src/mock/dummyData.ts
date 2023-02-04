import * as d3 from 'd3';
import jackdonsMeals from '../resources/jackdons_meals.csv'
import { DefaultDict } from '../util/dataStructures';

export function loadJackdonsMeals() {
    let records: string[][] = [];
    console.log(jackdonsMeals);
    d3.csv(jackdonsMeals)
        .then(rows => rows.map(row => {
            const ingredient = row["Ingredients"] as string;
            return Object.keys(row)
                .filter(recipe => recipe !== "Ingredients" && row[recipe]?.trim().toLowerCase() === 'x')
                .map(recipe => [recipe, ingredient]);
        }))
        .then(recipes => recipes.flat()
            .reduce((recipeMap, [recipe, ingredient], _1, _2) => {
                recipeMap.get(recipe).push(ingredient);
                return recipeMap;
            }, new DefaultDict<string, Array<string>>(() => []))
        )
        .then(recipes => console.log(recipes));


    return records;
}
