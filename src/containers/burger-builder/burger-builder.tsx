import React, {Component} from 'react';
import Aux from '../../hoc/auxiliary/auxiliary';
import Burger from "../../components/burger/burger";
import {BurgerIngredientModel} from "../../components/burger/burger-ingredient/burger-ingredient.model";
import BuildControls from "../../components/burger/build-controls/build-controls";
import Modal from "../../components/UI/modal/modal";
import OrderSummary from "../../components/burger/order-summary/order-summary";

type stateTypes = {

  //amount of ingredients
  ingredients: { [key in BurgerIngredientModel]?: number },

  //total price base on coefficient on ingredients type
  totalPrice: number,

  //flag for purchasing
  purchasable: boolean,

  //flag for controlling modal
  purchasing: boolean,

};

const INGREDIENT_PRICE: { [key in BurgerIngredientModel]?: number } = {
  cheese: .5,
  salad: 1,
  bacon: 1.8,
  meat: 3,
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
    purchasable: false,
    purchasing: false,
  }

  //==============================
  // Hooks
  //==============================
  render() {

    return (
      <Aux>
        <Modal
          hide={this.onCancelPurchasing}
          show={this.state.purchasing}>
          <OrderSummary ingredients={this.state.ingredients}/>
        </Modal>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          totalPrice={this.state.totalPrice}
          disabled={this.state.ingredients}
          purchasable={this.state.purchasable}
          onOrder={this.onPurchasing}
          addIngredient={this.addIngredients}
          removeIngredients={this.removeIngredients}/>
      </Aux>
    );
  }


  //==============================
  // Handlers
  //==============================
  addIngredients = (type: BurgerIngredientModel) => {
    const newIngredientsCount = this.state.ingredients[type] + 1;
    const newIngredients = {...this.state.ingredients, [type]: newIngredientsCount,};
    const newTotalPrice = this.state.totalPrice + INGREDIENT_PRICE[type]!;

    this.setState({
      ingredients: newIngredients,
      totalPrice: newTotalPrice,
    })

    this.updatePurchase(newIngredients);
  }

  removeIngredients = (type: BurgerIngredientModel) => {
    const newIngredientsCount = this.state.ingredients[type] - 1;
    const newIngredients = {...this.state.ingredients, [type]: newIngredientsCount,};
    const newTotalPrice = this.state.totalPrice - INGREDIENT_PRICE[type]!;

    this.setState({
      ingredients: newIngredients,
      totalPrice: newTotalPrice,
    })

    this.updatePurchase(newIngredients);
  }

  onPurchasing = () => {
    this.setState({purchasing: true});
  }

  onCancelPurchasing = () => {
    this.setState({purchasing: false});
  }

  updatePurchase(ingredients: { [key in BurgerIngredientModel]: number }) {
    const sum = (Object.keys(ingredients) as BurgerIngredientModel[])
      .map(item => ingredients[item])
      .reduce((total, current) => total += current, 0);
    this.setState({purchasable: sum > 0});
  }
}

export default BurgerBuilder;
