import React, {FunctionComponent} from 'react';

import {Aux} from "../../hoc";
import './layout.module.scss'

const Layout: FunctionComponent = (props) => {
    return (
        <Aux>
            <div>Toolbar , side drawer, backdrop</div>
            <p>paragraph goes here !!!</p>
            <main>{props.children}</main>
        </Aux>
    );
};

export default Layout;