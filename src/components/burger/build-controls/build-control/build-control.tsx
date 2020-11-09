import React, {FunctionComponent} from 'react';
import styles from './build-control.module.scss';

type propsType = {
    label: string,
    onAdd: () => void,
    oRemove: () => void,
    disable: boolean,
};
const BuildControl: FunctionComponent<propsType> = (props) => {
    return (
        <div className={styles.BuildControl}>
            <div className={styles.Label}>{props.label}</div>
            <button onClick={props.onAdd} className={styles.More}>More</button>
            <button disabled={props.disable} onClick={props.oRemove} className={styles.Less}>Less</button>
        </div>
    );
};

export default BuildControl;
