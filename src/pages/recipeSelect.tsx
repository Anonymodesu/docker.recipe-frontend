import { DefaultDict } from '../util/dataStructures'

function RecipeButton (props: { recipeName: string, onClick: () => void }): JSX.Element {
  return <button onClick={props.onClick}>
    {props.recipeName}
  </button>
}

export function RecipeList (props: { recipeList: string[], onClick: (recipe: string) => void }): JSX.Element {
  const recipes = props.recipeList.map((recipe) =>
    <li key={recipe}>
      <RecipeButton
        recipeName={recipe}
        onClick={() => { props.onClick(recipe) }}
      />
    </li>
  )

  return <ol>{recipes}</ol>
}

function IngredientButton (props: { ingredientName: string, count: number }): JSX.Element {
  return <button>
    {props.ingredientName}: {props.count}
  </button>
}

export function IngredientList (props: { selectedRecipes: Set<string>, recipeMap: Map<string, Set<string>> }): JSX.Element {
  const ingredientCounts = new DefaultDict<string, number>(0)
  props.selectedRecipes.forEach(recipe => {
    props.recipeMap.get(recipe)?.forEach(ingredient =>
      ingredientCounts.set(ingredient, ingredientCounts.get(ingredient) + 1)
    )
  }
  )

  const ingredientList = Array.from(ingredientCounts)
    .filter(([_, count]) => count > 0)
    .map(([ingredient, count]) =>
      <li key={ingredient}>
        <IngredientButton
          ingredientName={ingredient}
          count={count}
        />
      </li>
    )

  return <ol>{ingredientList}</ol>
}
