import React from 'react';
import classes from './navigationItems.module.scss';
import NavigationItem from "./navigation-item/navigation-item";

const NavigationItems = () => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem active link='/'>Burger Builder</NavigationItem>
      <NavigationItem link='/'>Checkout</NavigationItem>
    </ul>
  );
};

export default NavigationItems;
