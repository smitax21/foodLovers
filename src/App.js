import React, {useEffect, useState} from 'react';
import './App.css';
import Recipe from './Components/Recipe/recipe.component'

const App = () => {

  const APP_ID = "75b901ad";
  const APP_KEY = "22c00844c543c3612066d228dd80dad8";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken")

  const getRecipe = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  useEffect(() => {
    getRecipe();
  }, [query]);


  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return(
    <div className="App">
      <h1>Hello Food Lovers</h1>
      <form onSubmit={getSearch} className="search-form">
      <input 
        className="search-bar" 
        type="text" value={search} 
        onChange={updateSearch}/>
      <button className="search-button" type="submit">
        search
      </button>
      </form>
      <div className="recipes">
        {recipes.map(recipe => ( 
          <Recipe 
            key={recipe.recipe.label}
            title={recipe.recipe.label} 
            calories={recipe.recipe.calories} 
            image={recipe.recipe.image} 
            ingredients={recipe.recipe.ingredients} />
        ))}
      </div>
    </div>
  );
}

export default App;
