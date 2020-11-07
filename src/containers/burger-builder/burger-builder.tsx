import React, {Component} from 'react';

import Aux from '../../hoc/auxiliary/auxiliary';
import Burger from "../../components/burger/burger";
import {BurgerIngredientModel} from "../../components/burger/burger-ingredient/burger-ingredient.model";

type stateTypes = {

    //amount of ingredients
    ingredients: { [key in BurgerIngredientModel]?: number }
};

class BurgerBuilder extends Component<{}, stateTypes> {

    state = {
        ingredients: {
            cheese: 0,
            meat: 0,
            salad: 0,
            bacon: 0,
        }
    }

    render() {
        return (
            <Aux>
                <div>build controls</div>
                <div><Burger ingredients={this.state.ingredients}/></div>
            </Aux>
        );
    }
}

export default BurgerBuilder;
