import React from 'react';
import logo from '../../assets/images/burger-logo.png'
import classes from './logo.module.scss';

const Logo = () => {
  return (
    <div className={classes.Logo}>
      <img src={logo} alt="burger logo"/>
    </div>
  );
};

export default Logo;
