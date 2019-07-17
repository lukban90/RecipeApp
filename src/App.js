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

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    console.log(this.state._search);
  };

  /** Run when form is submitted */
  handleSearch = e => {
    e.preventDefault(); //stop page refresh
    // console.log(this.state._search);
    // console.log(this.state._query);
    // console.log("pause");
    const { _search, _query } = this.state;
    /**----ISSUE HERE----- */
    this.setState({ [_query]: _search });
    /**----ISSUE HERE----- */
    console.log(`_search ${this.state._search}`);
    console.log(`_query ${this.state._query}`);
  };

  componentDidMount() {
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
      });
  }

  // useEffect = () => {
  //   // Update the document title using the browser API
  //   this.getRe
  // };

  // getRecipes = () => {
  //   fetch(
  //     `https://api.edamam.com/search?q=${
  //       this.state._query
  //     }&app_id=${APP_ID}&app_key=${APP_KEY}`
  //   )
  //     .then(response => response.json())
  //     .then(response => {
  //       const { hits } = response;
  //       this.setState({ _recipe: hits });
  //       console.log(hits);
  //     });
  // };

  // com

  // useEffect = () => {
  //   this.getRecipes(), [this.state._query];
  // };

  render() {
    return (
      <div className="App">
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
        {this.state._recipe.map(food => (
          <Recipe
            key={food.recipe.label}
            title={food.recipe.label}
            calories={food.recipe.calories}
            image={food.recipe.image}
          />
        ))}
      </div>
    );
  }
}

export default App;
