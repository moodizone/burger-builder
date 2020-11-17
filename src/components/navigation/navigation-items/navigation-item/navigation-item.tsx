import React, {FunctionComponent} from 'react';
import classes from './navigationItem.module.scss';

type propsType = { link: string; active?: boolean; };
const NavigationItem: FunctionComponent<propsType> = (props) => {
  return (
    <li className={classes.NavigationItem}>
      <a className={props.active ? classes.active : ''}
         href={props.link}>{props.children}</a>
    </li>
  );
};

export default NavigationItem;
