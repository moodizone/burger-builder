import React from 'react';
import styles from './toolbar.module.scss';
import Logo from "../../logo/logo";
import NavigationItems from "../navigation-items/navigation-items";

const Toolbar = () => {
  return (
    <header className={styles.Toolbar}>
      <div>menu</div>
      <Logo/>
      <nav>
        <NavigationItems/>
      </nav>
    </header>
  );
};

export default Toolbar;
