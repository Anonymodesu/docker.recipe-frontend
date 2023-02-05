function RecipeButton(props: {recipeName: string, onClick: () => void}) {
    return <button onClick={props.onClick}>
        {props.recipeName}
    </button>
}

export function RecipeList(props: {recipeList: Array<string>}) {
    const recipes = props.recipeList.map((recipe) =>
        <li key={recipe}>
            <RecipeButton
                recipeName={recipe}
                onClick={() => console.log(`Clicked ${recipe}`)}
            />
        </li>
    )

    return <ol>{recipes}</ol>
}