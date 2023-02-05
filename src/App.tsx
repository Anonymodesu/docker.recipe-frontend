import './App.css';
import logo from './logo.svg';
import { loadJackdonsMeals } from './mock/dummyData';
import { RecipeList } from './pages/recipeSelect';
import { useEffect, useState } from 'react'
loadJackdonsMeals()

function App() {
  const [recipes, setRecipes] = useState(new Array<string>());

  useEffect(() =>{
    console.log("Loading dummy Jackdon's meals");
    loadJackdonsMeals().then(
      recipeMap => setRecipes(Array.from(recipeMap.keys()))
    )
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div>
        <RecipeList recipeList={recipes}/>
      </div>
    </div>
  );
}

export default App;
