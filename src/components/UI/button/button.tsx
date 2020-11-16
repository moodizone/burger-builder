import React, {CSSProperties, FunctionComponent} from 'react';

import {ButtonModel} from "./button.model";

type propsType = {
  class?: string;
  type: ButtonModel;
  clicked?: () => void;
  style?: CSSProperties;
}
const Button: FunctionComponent<propsType> = (props) => {
  return (
    <button onClick={props.clicked} style={props.style}
            className={['Button', props.class, props.type].join(' ')}>
      {props.children}
    </button>
  );
};

export default Button;
