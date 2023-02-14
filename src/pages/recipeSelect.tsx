
function RecipeButton (props: { recipeName: string, onClick: () => void }): JSX.Element {
  return <button onClick={props.onClick}>
        {props.recipeName}
    </button>
}

export function RecipeList (props: { recipeList: string[] }): JSX.Element {
  const recipes = props.recipeList.map((recipe) =>
        <li key={recipe}>
            <RecipeButton
                recipeName={recipe}
                onClick={() => { console.log(`Clicked ${recipe}`) }}
            />
        </li>
  )

  return <ol>{recipes}</ol>
}
