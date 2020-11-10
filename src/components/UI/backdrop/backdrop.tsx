import React, {FunctionComponent} from 'react';
import styles from './backdrop.module.scss';

type propType = {
  hide: () => void,
  show: boolean,
}
const Backdrop: FunctionComponent<propType> = (props) => {
  return (
    props.show ? <div className={styles.Backdrop}
                      onClick={props.hide}>{props.children}</div> : null
  );
};

export default Backdrop;
