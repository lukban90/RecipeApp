import React, { Component } from "react";
import Recipe from "./Recipe";
import "./App.css";

const APP_ID = "eaa040f4";
const APP_KEY = "c12debfb9fc629ffeb28001b15eec1f4";

class App extends Component {
  state = {
    _recipe: [],
    _search: "",
    _query: "banana"
  };

  /**Update _search from user input */
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    console.log(this.state._search);
  };

  /** Run when form is submitted */
  handleSearch = e => {
    e.preventDefault(); //stop page refresh
    fetch(
      `https://api.edamam.com/search?q=${
        this.state._search
      }&app_id=${APP_ID}&app_key=${APP_KEY}`
    )
      .then(response => response.json())
      .then(response => {
        const { hits } = response;
        this.setState({ _recipe: hits });
        console.log(hits);
      })
      .then(this.setState({ _search: "" })); //remove previous search
  };

  render() {
    return (
      <div className="App">
        {/** <h1>this.state._query value: {this.state._query}</h1> */}
        <form onSubmit={this.handleSearch} className="search-form">
          <input
            className="search-bar"
            type="text"
            name="_search"
            value={this.state._search}
            onChange={this.handleChange}
          />
          <button className="search-button" type="submit">
            Search
          </button>
        </form>
        <div className="recipes">
          {this.state._recipe.map(food => (
            <Recipe
              key={food.recipe.label}
              title={food.recipe.label}
              calories={food.recipe.calories}
              image={food.recipe.image}
              ingredients={food.recipe.ingredients}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
