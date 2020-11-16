import React, {FunctionComponent} from 'react';
import Aux from "../../../hoc/auxiliary/auxiliary";
import {BurgerIngredientModel} from "../burger-ingredient/burger-ingredient.model";
import Button from "../../UI/button/button";

type propsType = {
  onCancel: () => void,
  onContinue: () => void,
  totalPrice: number,
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
      <ul>{list}</ul>
      <p>Continue to checkout?</p>
      <p><strong>Total price:{props.totalPrice.toFixed(2)}</strong></p>
      <Button clicked={props.onContinue} type={'success'}>Confirm</Button>
      <Button clicked={props.onCancel} type={'danger'}>Cancel</Button>
    </Aux>
  );
};

export default OrderSummary;
