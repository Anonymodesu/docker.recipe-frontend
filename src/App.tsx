import './App.css'
import logo from './logo.svg'
import { loadJackdonsMeals } from './mock/dummyData'
import { RecipeList } from './pages/recipeSelect'
import { useEffect, useState } from 'react'

function App (): JSX.Element {
  const [recipes, setRecipes] = useState(new Array<string>())

  useEffect(() => {
    loadJackdonsMeals().then(
      recipeMap => { setRecipes(Array.from(recipeMap.keys())) }
    ).catch(reason => { console.log(reason) })
  }, [])

  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <RecipeList recipeList={recipes}/>
        </div>
      </div>

    </div>
  )
}

export default App
