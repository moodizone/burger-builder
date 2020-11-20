import React, {Component} from 'react';
import classes from './modal.module.scss';
import Aux from "../../../hoc/auxiliary/auxiliary";
import Backdrop from "../backdrop/backdrop";

type propsType = {
  show: boolean,
  hide: () => void,
}

class Modal extends Component<propsType, {}> {
  shouldComponentUpdate(nextProps: Readonly<propsType>, nextState: Readonly<{}>, nextContext: any): boolean {
    return nextProps.show !== this.props.show;
  }

  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} hide={this.props.hide}/>
        <div className={classes.Modal + ` ${this.props.show ? '' : classes.hide}`}>
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;
