import React, {FunctionComponent} from 'react';
import styles from './modal.module.scss';
import Aux from "../../../hoc/auxiliary/auxiliary";
import Backdrop from "../backdrop/backdrop";

type propsType = {
  show: boolean,
  hide: () => void,
}
const Modal: FunctionComponent<propsType> = (props) => {
  return (
    <Aux>
      <Backdrop show={props.show} hide={props.hide}/>
      <div className={styles.Modal + ` ${props.show ? '' : styles.hide}`}>
        {props.children}
      </div>
    </Aux>
  );
};

export default Modal;
