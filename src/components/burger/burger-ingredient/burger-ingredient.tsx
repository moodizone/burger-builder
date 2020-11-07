import React, {FunctionComponent} from 'react';

import {BurgerIngredientModel} from "./burger-ingredient.model";
import styles from './burger-ingredient.module.scss';

type propsType = {
    type: BurgerIngredientModel,
}
const BurgerIngredient: FunctionComponent<propsType> = (props) => {
    let ingredient;
    switch (props.type) {
        case 'bread-bottom':
            ingredient = <div className={styles.BreadBottom}/>;
            break;
        case 'bread-top':
            ingredient = (
                <div className={styles.BreadTop}>
                    <div className={styles.Seeds1}/>
                    <div className={styles.Seeds2}/>
                </div>
            );
            break;
        case 'meat':
            ingredient = <div className={styles.Meat}/>;
            break;
        case 'bacon':
            ingredient = <div className={styles.Bacon}/>;
            break;
        case 'salad':
            ingredient = <div className={styles.Salad}/>;
            break;
        case 'cheese':
            ingredient = <div className={styles.Cheese}/>;
            break;
        default:
            ingredient = null;
    }
    return ingredient;
};

export default BurgerIngredient;
