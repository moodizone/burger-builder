import React, {Component} from 'react';
import axios from '../../axios';

import Aux from '../../hoc/auxiliary/auxiliary';
import Burger from "../../components/burger/burger";
import BurgerIngredientModel from "../../models/burger-ingredient.model";
import BuildControls from "../../components/burger/build-controls/build-controls";
import Modal from "../../components/UI/modal/modal";
import OrderSummary from "../../components/burger/order-summary/order-summary";
import OrderModel from "../../models/order.model";
import Spinner from "../../components/UI/spinner/spinner";

type stateTypes = {

  //amount of ingredients
  ingredients: { [key in BurgerIngredientModel]?: number },

  //total price base on coefficient on ingredients type
  totalPrice: number,

  //flag for purchasing
  purchasable: boolean,

  //flag for controlling modal
  purchasing: boolean,

  //loading for post order summary to firebase
  postLoading: boolean,

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
    postLoading: false,
  }

  //==============================
  // Hooks
  //==============================
  render() {
    let order_summary = this.state.postLoading ?
      <Spinner/> :
      <OrderSummary
        totalPrice={this.state.totalPrice}
        onCancel={this.onCancelPurchasing}
        onContinue={this.onContinuePurchase}
        ingredients={this.state.ingredients}/>

    return (
      <Aux>
        <Modal
          hide={this.onCancelPurchasing}
          show={this.state.purchasing}>
          {order_summary}
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

  onContinuePurchase = () => {
    this.setState({postLoading: true});
    const order: OrderModel = {
      deliveryMethod: 'fastest',
      price: this.state.totalPrice,
      ingredients: this.state.ingredients,
      customer: {
        name: 'moodi',
        email: 'moodi@moodi.com',
        address: {
          country: 'Iran',
        }
      }
    }

    axios.post<OrderModel>('/order.json', order)
      .then(response => {
        console.log(response);
        this.setState({postLoading: false});
      }, (errors) => {
        console.log(errors);
        this.setState({postLoading: false});
      });
  }

  updatePurchase(ingredients: { [key in BurgerIngredientModel]: number }) {
    const sum = (Object.keys(ingredients) as BurgerIngredientModel[])
      .map(item => ingredients[item])
      .reduce((total, current) => total += current, 0);
    this.setState({purchasable: sum > 0});
  }
}

export default BurgerBuilder;
