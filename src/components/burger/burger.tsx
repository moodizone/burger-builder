import React, {FunctionComponent} from 'react';

import styles from './burger.module.scss';
import BurgerIngredient from "./burger-ingredient/burger-ingredient";
import {BurgerIngredientModel} from "./burger-ingredient/burger-ingredient.model";

type propsType = { ingredients: { [key in BurgerIngredientModel]?: number } };

const Burger: FunctionComponent<propsType> = (props) => {
    let answer, transformedIngredients =
        (Object.keys(props.ingredients) as BurgerIngredientModel[])
            .map(ingKey => [...Array(props.ingredients[ingKey])]
                .map((_, i) =>
                    <BurgerIngredient type={ingKey} key={ingKey + i}/>))
            .reduce((total, item) => total.concat(item), []);
    answer = transformedIngredients;

    if (transformedIngredients.length === 0) {
        answer = <p>Please select some ingredients</p>;
    }
    return (
        <div className={styles.burger}>
            <BurgerIngredient type={"bread-top"}/>
            {answer}
            <BurgerIngredient type={"bread-bottom"}/>
        </div>
    );
};

export default Burger;
