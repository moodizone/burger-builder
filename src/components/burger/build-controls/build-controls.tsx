import React, {FunctionComponent} from 'react';
import styles from './build-controls.module.scss';
import BuildControl from "./build-control/build-control";
import {BurgerIngredientModel} from "../burger-ingredient/burger-ingredient.model";

//list of controls that present in build-control section
const controls: { type: BurgerIngredientModel, label: string }[] = [
  {type: 'meat', label: 'Meat'},
  {type: 'salad', label: 'Salad'},
  {type: 'bacon', label: 'Bacon'},
  {type: 'cheese', label: 'Cheese'},
];

type propsType = {
  disabled: { [key in BurgerIngredientModel]?: number }
  addIngredient: (type: BurgerIngredientModel) => void;
  removeIngredients: (type: BurgerIngredientModel) => void;
  onOrder: () => void;
  totalPrice: number,
  purchasable: boolean,
}
const BuildControls: FunctionComponent<propsType> = (props) => {
  return (

    <div className={styles.BuildControls}>
      <p>Total price:{props.totalPrice.toFixed(2)}</p>
      {controls.map(item =>
        <BuildControl
          disable={props.disabled[item.type]! < 1}
          key={item.label}
          label={item.label}
          onAdd={() => props.addIngredient(item.type)}
          oRemove={() => props.removeIngredients(item.type)}
        />)}
      <button onClick={props.onOrder}
              disabled={!props.purchasable}
              className={styles.OrderButton}>ORDER NOW
      </button>
    </div>
  );
};

export default BuildControls;
