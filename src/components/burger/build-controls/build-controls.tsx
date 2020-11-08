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
    addIngredient: (type: BurgerIngredientModel) => void;
}
const BuildControls: FunctionComponent<propsType> = (props) => {
    return (
        <div className={styles.BuildControls}>
            {controls.map(item =>
                <BuildControl
                    key={item.label}
                    label={item.label}
                    onAdd={() => props.addIngredient(item.type)}
                />)}
        </div>
    );
};

export default BuildControls;
