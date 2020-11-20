import React, {FunctionComponent} from 'react';
import classes from './side-drawer.module.scss';
import Logo from "../../logo/logo";
import Aux from '../../../hoc/auxiliary/auxiliary'
import NavigationItems from "../navigation-items/navigation-items";
import Backdrop from "../../UI/backdrop/backdrop";

type propsType = {
  show: boolean;
  hide: () => void;
}
const SideDrawer: FunctionComponent<propsType> = (props) => {
  return (
    <Aux>
      <Backdrop hide={props.hide} show={props.show}/>
      <div className={[classes.SideDrawer, (props.show ? classes.Open : classes.Close)].join(' ')}>
        <div className={classes.Logo}>
          <Logo/>
        </div>
        <nav>
          <NavigationItems/>
        </nav>
      </div>
    </Aux>
  );
};

export default SideDrawer;
