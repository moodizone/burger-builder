import AddressModel from "./address.model";

export default interface CustomerModel {
  address?: AddressModel;
  email: string;
  name: string;
}