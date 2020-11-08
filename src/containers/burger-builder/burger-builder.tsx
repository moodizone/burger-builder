import React, {Component} from 'react';
import Aux from '../../hoc/auxiliary/auxiliary';
import Burger from "../../components/burger/burger";
import {BurgerIngredientModel} from "../../components/burger/burger-ingredient/burger-ingredient.model";
import BuildControls from "../../components/burger/build-controls/build-controls";

type stateTypes = {

    //amount of ingredients
    ingredients: { [key in BurgerIngredientModel]?: number },

    //total price base on coefficient on ingredients type
    totalPrice: number,
};

const INGREDIENT_PRICE: { [key in BurgerIngredientModel]?: number } = {
    cheese: 1,
    salad: 1,
    bacon: 1,
    meat: 1,
}

class BurgerBuilder extends Component<{}, stateTypes> {

    state = {
        ingredients: {
            cheese: 0,
            meat: 0,
            salad: 0,
            bacon: 0,

            seeds1: 0,
            seeds2: 0,
            'bread-top': 0,
            'bread-bottom': 0,

        },
        totalPrice: 10,
    }

    //==============================
    // Hooks
    //==============================
    render() {
        return (
            <Aux>
                <div><Burger ingredients={this.state.ingredients}/></div>
                <div><BuildControls addIngredient={this.addIngredients.bind(this)}/></div>
            </Aux>
        );
    }


    //==============================
    // Handlers
    //==============================
    addIngredients(type: BurgerIngredientModel) {
        // console.log(this);
        const newIngredientsCount: number = this.state.ingredients[type] + 1;
        const newTotalPrice = this.state.totalPrice + INGREDIENT_PRICE[type]!;

        this.setState({
            ...this.state,
            ingredients: {
                ...this.state.ingredients,
                [type]: newIngredientsCount,
            },
            totalPrice: newTotalPrice,
        })
    }

}

export default BurgerBuilder;
