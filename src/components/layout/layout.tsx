import React, {FunctionComponent} from 'react';

import Aux from '../../hoc/auxiliary/auxiliary'
import BurgerBuilder from "../../containers/burger-builder/burger-builder";


const Layout: FunctionComponent = (props) => {
    return (
        <Aux>
            <div>Toolbar , side drawer, backdrop</div>
            <main>
                <BurgerBuilder/>
            </main>
        </Aux>
    );
};

export default Layout;
