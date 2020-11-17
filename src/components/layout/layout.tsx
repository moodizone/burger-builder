import React, {FunctionComponent} from 'react';
import Aux from '../../hoc/auxiliary/auxiliary'
import BurgerBuilder from "../../containers/burger-builder/burger-builder";
import Toolbar from "../navigation/toolbar/toolbar";
import styles from './layout.module.scss';


const Layout: FunctionComponent = (props) => {
  return (
    <Aux>
      <Toolbar/>
      <main className={styles.Content}>
        <BurgerBuilder/>
      </main>
    </Aux>
  );
};

export default Layout;
