import { DefaultDict } from '../util/dataStructures'
import React from 'react'

function RecipeButton (props: {
  recipeName: string
  selectedRecipes: Set<string>
  setSelectedRecipes: (ingredients: Set<string>) => void
}): JSX.Element {
  const usingRecipe = props.selectedRecipes.has(props.recipeName)
  return <button
    onClick={() => {
      if (usingRecipe) {
        props.selectedRecipes.delete(props.recipeName)
      } else {
        props.selectedRecipes.add(props.recipeName)
      }
      props.setSelectedRecipes(new Set(props.selectedRecipes))
    }}
    style={{ color: usingRecipe ? 'red' : 'black' }}
    >
    {props.recipeName}
  </button>
}

export function RecipeList (props: {
  recipeList: string[]
  selectedRecipes: Set<string>
  setSelectedRecipes: (ingredients: Set<string>) => void
}): JSX.Element {
  const recipes = props.recipeList
    .sort(([recipeA], [recipeB]) => recipeA.localeCompare(recipeB))
    .map((recipe) =>
    <li key={recipe}>
      <RecipeButton
        recipeName={recipe}
        selectedRecipes={props.selectedRecipes}
        setSelectedRecipes={props.setSelectedRecipes}
      />
    </li>
    )

  return (
    <React.Fragment>
      <h2>Recipes</h2>
      <ol>{recipes}</ol>
    </React.Fragment>
  )
}

function IngredientButton (props: {
  ingredient: string
  count: number
  boughtIngredients: Set<string>
  setBoughtIngredients: (ingredients: Set<string>) => void
}): JSX.Element {
  const boughtIngredient = props.boughtIngredients.has(props.ingredient)
  return <button
    onClick={() => {
      if (boughtIngredient) {
        props.boughtIngredients.delete(props.ingredient)
      } else {
        props.boughtIngredients.add(props.ingredient)
      }
      props.setBoughtIngredients(new Set(props.boughtIngredients))
    }}
    style={{ textDecoration: boughtIngredient ? 'line-through' : 'initial' }}
  >
    {props.ingredient}: {props.count}
  </button>
}

export function IngredientList (props: {
  selectedRecipes: Set<string>
  recipeMap: Map<string, Set<string>>
  boughtIngredients: Set<string>
  setBoughtIngredients: (ingredients: Set<string>) => void
}): JSX.Element {
  const ingredientCounts = new DefaultDict<string, number>(0)
  props.selectedRecipes.forEach(recipe => {
    props.recipeMap.get(recipe)?.forEach(ingredient =>
      ingredientCounts.set(ingredient, ingredientCounts.get(ingredient) + 1)
    )
  })

  const ingredientList = Array.from(ingredientCounts)
    .filter(([_, count]) => count > 0)
    .sort(([ingredientA, _1], [ingredientB, _2]) => ingredientA.localeCompare(ingredientB))
    .map(([ingredient, count]) =>
      <li key={ingredient}>
        <IngredientButton
          ingredient={ingredient}
          count={count}
          boughtIngredients={props.boughtIngredients}
          setBoughtIngredients={props.setBoughtIngredients}
        />
      </li>
    )

  return (
      <React.Fragment>
        <h2>Ingredients</h2>
        <ol>{ingredientList}</ol>
      </React.Fragment>
  )
}
