import React, {CSSProperties, FunctionComponent} from 'react';

import {ButtonModel} from "./button.model";

type propsType = {
  class?: string;
  type: ButtonModel;
  onclick?: () => void;
  style?: CSSProperties;
}
const Button: FunctionComponent<propsType> = (props) => {
  return (
    <button onClick={props.onclick} style={props.style}
            className={['Button', props.class, props.type].join(' ')}>
      {props.children}
    </button>
  );
};

export default Button;
