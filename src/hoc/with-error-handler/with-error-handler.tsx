import React, {Component} from 'react';

import Aux from "../auxiliary/auxiliary";
import Modal from "../../components/UI/modal/modal";
import {AxiosInstance} from "axios";

type stateType = {
  errors: any;
}

const WithErrorHandler = (WrappedComponent: any, axios: AxiosInstance) => {
  return class extends Component<any, stateType> {
    state = {
      errors: null,
    }

    //for ejecting unused interceptors (-1 as invalid)
    interceptor = {
      request: -1,
      response: -1,
    }

    //=======================================
    // Hooks
    //=======================================
    componentWillMount() {
      this.interceptor.request = axios.interceptors.request.use(res => {
        this.setState({errors: null});
        return res;
      });

      this.interceptor.response = axios.interceptors.response.use(res => res, error => {
        this.setState({errors: error});
      });
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.interceptor.request);
      axios.interceptors.response.eject(this.interceptor.response);
    }

    render() {
      return (
        <Aux>
          <Modal show={!!this.state.errors} hide={this.errorHandlerConfirmed}>
            <p>something went wrong</p>
          </Modal>
          <WrappedComponent {...this.props}/>
        </Aux>
      );
    }


    //=======================================
    // Handler
    //=======================================
    errorHandlerConfirmed = () => {
      this.setState({errors: null});
    }
  }
};

export default WithErrorHandler;
