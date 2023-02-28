import './App.css'
import logo from './logo.svg'
import { loadJackdonsMeals } from './mock/dummyData'
import { IngredientList, RecipeList } from './pages/recipeSelect'
import { useEffect, useState } from 'react'
import { RecipeMap } from './util/dataStructures'

function App (): JSX.Element {
  const [recipeMap, setRecipeMap] = useState(new RecipeMap())
  const [selectedRecipes, setSelectedRecipes] = useState(new Set<string>())
  const [boughtIngredients, setBoughtIngredients] = useState(new Set<string>())

  useEffect(() => {
    loadJackdonsMeals().then(
      recipeMap => { setRecipeMap(recipeMap) }
    ).catch(reason => { console.log(reason) })
  }, [])

  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <button
            onClick={() => {
              setSelectedRecipes(new Set())
              setBoughtIngredients(new Set())
            }}
          >
            Reset
          </button>
        </div>
        <div>
          <RecipeList
            recipeList={Array.from(recipeMap.keys())}
            selectedRecipes={selectedRecipes}
            setSelectedRecipes={setSelectedRecipes}
          />
        </div>
        <div>
          <IngredientList
            selectedRecipes={selectedRecipes}
            recipeMap={recipeMap}
            boughtIngredients={boughtIngredients}
            setBoughtIngredients={setBoughtIngredients}
          />
        </div>
      </div>

    </div>
  )
}

export default App
