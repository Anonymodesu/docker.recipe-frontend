import { DefaultDict } from '../util/dataStructures'
import React, { useState } from 'react'

function RecipeButton (props: { recipeName: string, selectRecipe: () => void, removeRecipe: () => void }): JSX.Element {
  const [usingRecipe, setUsingRecipe] = useState(false)
  return <button
    onClick={() => {
      usingRecipe ? props.removeRecipe() : props.selectRecipe()
      setUsingRecipe(!usingRecipe)
    }}
    style={{ color: usingRecipe ? 'red' : 'black' }}
    >
    {props.recipeName}
  </button>
}

export function RecipeList (props: { recipeList: string[], selectRecipe: (recipe: string) => void, removeRecipe: (recipe: string) => void }): JSX.Element {
  const recipes = props.recipeList
    .sort(([recipeA], [recipeB]) => recipeA.localeCompare(recipeB))
    .map((recipe) =>
    <li key={recipe}>
      <RecipeButton
        recipeName={recipe}
        selectRecipe={() => { props.selectRecipe(recipe) }}
        removeRecipe={() => { props.removeRecipe(recipe) }}
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

function IngredientButton (props: { ingredientName: string, count: number }): JSX.Element {
  const [boughtIngredient, setBoughtIngredient] = useState(false)
  return <button
    onClick={() => { setBoughtIngredient(!boughtIngredient) }}
    style={{ textDecoration: boughtIngredient ? 'line-through' : 'initial' }}
  >
    {props.ingredientName}: {props.count}
  </button>
}

export function IngredientList (props: { selectedRecipes: Set<string>, recipeMap: Map<string, Set<string>> }): JSX.Element {
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
          ingredientName={ingredient}
          count={count}
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
