import React, {FunctionComponent} from 'react';

import styles from './burger.module.scss';
import BurgerIngredient from "./burger-ingredient/burger-ingredient";
import {BurgerIngredientModel} from "./burger-ingredient/burger-ingredient.model";

type propsType = { ingredients: { [key in BurgerIngredientModel]?: number } };

const Burger: FunctionComponent<propsType> = (props) => {
    let transformedIngredients =
        (Object.keys(props.ingredients) as BurgerIngredientModel[])
            .map(ingKey => [...Array(props.ingredients[ingKey])]
                .map((_, i) =>
                    <BurgerIngredient type={ingKey} key={ingKey + i}/>))
            .reduce((total, item) => total.concat(item), []);

    if (transformedIngredients.length === 0) {
        transformedIngredients =<p>Please select some ingredients</p>;
    }
    return (
        <div className={styles.burger}>
            <BurgerIngredient type={"bread-top"}/>
            {transformedIngredients}
            <BurgerIngredient type={"bread-bottom"}/>
        </div>
    );
};

export default Burger;
