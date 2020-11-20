import React, {Component} from 'react';
import Aux from "../auxiliary/auxiliary";
import SideDrawer from "../../components/navigation/side-drawer/side-drawer";
import Toolbar from "../../components/navigation/toolbar/toolbar";
import classes from "./layout.module.scss";
import BurgerBuilder from "../../containers/burger-builder/burger-builder";

type stateTypes = {
  sideDrawer_show: boolean;
}

class Layout extends Component<{}, stateTypes> {
  state = {
    sideDrawer_show: false,
  }

  render() {
    return (
      <Aux>
        <SideDrawer
          show={this.state.sideDrawer_show}
          hide={this.sideDrawerClose}/>
        <Toolbar toggleSideDrawer={this.toggleSideDrawer}/>
        <main className={classes.Content}>
          <BurgerBuilder/>
        </main>
      </Aux>
    );
  }

  sideDrawerClose = () => {
    this.setState({sideDrawer_show: false});
  }

  toggleSideDrawer = () => {
    this.setState(prevState => ({sideDrawer_show: !prevState.sideDrawer_show}));
  }
}

export default Layout;