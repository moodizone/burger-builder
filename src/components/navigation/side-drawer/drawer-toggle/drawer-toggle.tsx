import React, {FunctionComponent} from 'react';
import classes from './drawerToggle.module.scss';

type propsType = {
  toggleSideDrawer: () => void;
}
const DrawerToggle: FunctionComponent<propsType> = (props) => {
  return (
    <div className={classes.DrawerToggle} onClick={props.toggleSideDrawer}>
      <div/>
      <div/>
      <div/>
    </div>
  );
};

export default DrawerToggle;