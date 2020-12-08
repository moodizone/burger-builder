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
import WithErrorHandler from "../../hoc/with-error-handler/with-error-handler";

type stateTypes = {

  //amount of ingredients
  ingredients: { [key in BurgerIngredientModel]?: number } | null,

  //total price base on coefficient on ingredients type
  totalPrice: number,

  //flag for purchasing
  purchasable: boolean,

  //flag for controlling modal
  purchasing: boolean,

  //loading for post order summary to firebase
  postLoading: boolean,

  //loading for get ingredients from firebase
  getLoading: boolean,

  //get error messages
  getErrors: string | null;


};

const INGREDIENT_PRICE: { [key in BurgerIngredientModel]?: number } = {
  cheese: .5,
  salad: 1,
  bacon: 1.8,
  meat: 3,
}

class BurgerBuilder extends Component<{}, stateTypes> {

  state = {
    ingredients: null,
    totalPrice: 10,
    purchasable: false,
    purchasing: false,
    postLoading: false,
    getLoading: true,
    getErrors: null,
  }

  //==============================
  // Hooks
  //==============================
  render() {
    let order_summary = null;
    let burger = null;

    if (this.state.getLoading) {
      burger = <Spinner/>
    }
    //loading finished
    else {
      if (this.state.getErrors) {
        burger = <p>{this.state.getErrors}</p>
      } else {
        burger = <Aux>
          <Burger ingredients={this.state.ingredients!}/>
          <BuildControls
            totalPrice={this.state.totalPrice}
            disabled={this.state.ingredients!}
            purchasable={this.state.purchasable}
            onOrder={this.onPurchasing}
            addIngredient={this.addIngredients}
            removeIngredients={this.removeIngredients}/>
        </Aux>
        order_summary = this.state.postLoading ?
          <Spinner/> :
          <OrderSummary
            totalPrice={this.state.totalPrice}
            onCancel={this.onCancelPurchasing}
            onContinue={this.onContinuePurchase}
            ingredients={this.state.ingredients!}/>;
      }
    }


    return (
      <Aux>
        <Modal
          hide={this.onCancelPurchasing}
          show={this.state.purchasing}>
          {order_summary}
        </Modal>
        {burger}
      </Aux>
    );
  }

  componentDidMount() {
    this.fetchIngredients();
  }

  //==============================
  // Handlers
  //==============================
  addIngredients = (type: BurgerIngredientModel) => {
    const newIngredientsCount = this.state.ingredients![type] + 1;
    const newIngredients = {
      ...(this.state.ingredients! as { [k in BurgerIngredientModel]: number }),
      [type]: newIngredientsCount,
    };
    const newTotalPrice = this.state.totalPrice + INGREDIENT_PRICE[type]!;
    this.setState({
      ingredients: newIngredients,
      totalPrice: newTotalPrice,
    })

    this.updatePurchase(newIngredients);
  }

  removeIngredients = (type: BurgerIngredientModel) => {
    const newIngredientsCount = this.state.ingredients![type] - 1;
    const newIngredients = {
      ...(this.state.ingredients! as { [k in BurgerIngredientModel]: number }),
      [type]: newIngredientsCount,
    };
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

  onContinuePurchase = async () => {
    const order: OrderModel = {
      deliveryMethod: 'fastest',
      price: this.state.totalPrice,
      ingredients: this.state.ingredients!,
      customer: {
        name: 'moodi',
        email: 'moodi@moodi.com',
        address: {country: 'Iran',}
      }
    }
    try {
      await axios.post<OrderModel>('/order.json', order);
      this.setState({postLoading: false, purchasing: false});
    } catch (e) {
      this.setState({postLoading: false, purchasing: false});
    }
  }

  updatePurchase(ingredients: { [key in BurgerIngredientModel]: number }) {
    const sum = (Object.keys(ingredients) as BurgerIngredientModel[])
      .map(item => ingredients[item])
      .reduce((total, current) => total += current, 0);
    this.setState({purchasable: sum > 0});
  }

  fetchIngredients = async () => {
    try {
      const get = await axios.get<{ [K in BurgerIngredientModel]: number }>('https://udemy-burger-builder-a89d7.firebaseio.com/ingredients.json');
      this.setState({
        ingredients: {...(this.state.ingredients! as { [k in BurgerIngredientModel]: number }), ...get.data},
        getLoading: false,
      });
    } catch (e) {
      this.setState({getErrors: 'There is issue on fetching data, please try again later', getLoading: false,});
    }

  }

}

export default WithErrorHandler(BurgerBuilder, axios);
