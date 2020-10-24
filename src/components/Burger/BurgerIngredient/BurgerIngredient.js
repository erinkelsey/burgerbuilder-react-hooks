import React from "react";
import PropTypes from "prop-types";

import classes from "./BurgerIngredient.css";

const burgerIngredient = props => {
  let ingredient = null;

  switch (props.type) {
    case "breadBottom":
      ingredient = <div className={classes.BreadBottom}></div>;
      break;
    case "breadTop":
      ingredient = (
        <div className={classes.BreadTop}>
          <div className={classes.Seeds1}></div>
          <div className={classes.Seeds2}></div>
        </div>
      );
      break;
    case "beyondMeat":
      ingredient = <div className={classes.BeyondMeat}></div>;
      break;
    case "nutCheese":
      ingredient = <div className={classes.NutCheese}></div>;
      break;
    case "salad":
      ingredient = <div className={classes.Salad}></div>;
      break;
    case "tempehBacon":
      ingredient = <div className={classes.TempehBacon}></div>;
      break;
    default:
      ingredient = null;
  }

  return ingredient;
};

burgerIngredient.propTypes = {
  type: PropTypes.string.isRequired
};

export default burgerIngredient;
