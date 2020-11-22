import BurgerIngredientModel from './burger-ingredient.model';
import CustomerModel from "./customer.model";

export default interface OrderModel {
  customer?: CustomerModel,
  deliveryMethod: string,
  ingredients: { [key in BurgerIngredientModel]: number },
  price: number,
}