import React from "react";
import style from "./recipe.module.css";

//const Recipe = ({ title, calories, image }) => {
const Recipe = props => {
  return (
    <div className={style.recipe}>
      <h1>{props.title}</h1>
      <o1>
        {props.ingredients.map(ingredient => (
          <li>{ingredient.text}</li>
        ))}
      </o1>
      <p>{`Cal: ${Math.floor(props.calories)}`}</p>
      <img src={props.image} alt="" />
    </div>
  );
};

export default Recipe;
