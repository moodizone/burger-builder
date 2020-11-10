import React, {FunctionComponent} from 'react';
import Aux from "../../../hoc/auxiliary/auxiliary";
import {BurgerIngredientModel} from "../burger-ingredient/burger-ingredient.model";

type propsType = {
  ingredients: { [key in BurgerIngredientModel]?: number }
}
const OrderSummary: FunctionComponent<propsType> = (props) => {
  const list = (Object.keys(props.ingredients) as BurgerIngredientModel[])
    .map(ingKey => props.ingredients[ingKey] ? <li key={ingKey}><span
      style={{textTransform: 'capitalize'}}>{ingKey} : {props.ingredients[ingKey]}</span></li> : null);
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {list}
      </ul>
      <p>Continue to checkout?</p>
    </Aux>
  );
};

export default OrderSummary;
