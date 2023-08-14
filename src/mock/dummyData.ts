import { csvParse, type DSVRowString } from 'd3-dsv'
import { sampleMeals } from '../resources/jackdons_meals'
import { RecipeMap } from '../util/dataStructures'

// Maps recipes to ingredients
export async function loadJackdonsMeals (): Promise<RecipeMap> {
  return await new Promise<RecipeMap>(resolve => {
    const recipes = csvParse(sampleMeals).map((row: DSVRowString) => {
      const ingredient = row.Ingredients as string
      return Object.keys(row)
        .filter(recipe => recipe !== 'Ingredients' && row[recipe]?.trim().toLowerCase() === 'x')
        .map(recipe => [recipe, ingredient])
    })
      .flat()
      .reduce((recipeMap, [recipe, ingredient], _1, _2) => {
        recipeMap.get(recipe).add(ingredient)
        return recipeMap
      }, new RecipeMap()
      )

    resolve(recipes)
  })
}
