import React, {FunctionComponent} from 'react';
import classes from './toolbar.module.scss';
import Logo from "../../logo/logo";
import NavigationItems from "../navigation-items/navigation-items";
import DrawerToggle from "../side-drawer/drawer-toggle/drawer-toggle";

type propsType = {
  toggleSideDrawer: () => void;
}
const Toolbar: FunctionComponent<propsType> = (props) => {
  return (
    <header className={classes.Toolbar}>
      <DrawerToggle toggleSideDrawer={props.toggleSideDrawer}/>
      <div className={classes.Logo}>
        <Logo/>
      </div>
      <nav className={classes.DesktopOnly}>
        <NavigationItems/>
      </nav>
    </header>
  );
};

export default Toolbar;
