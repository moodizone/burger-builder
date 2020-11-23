import React, {Component} from 'react';

import Aux from "../auxiliary/auxiliary";
import Modal from "../../components/UI/modal/modal";
import {AxiosInstance} from "axios";

type stateType = {
  show: boolean;
  errors: string | null;
}

const WithErrorHandler = (WrappedComponent: any, axios: AxiosInstance) => {
  return class extends Component<any, stateType> {
    state = {
      show: false,
      errors: null,
    }

    componentDidMount() {
      axios.interceptors.request.use(res => {
        // this.setState({errors: null});
        return res;
      });

      axios.interceptors.response.use(res => res, error => {
        // this.setState({errors: error});
        this.setState({show: true});
      });
    }

    render() {
      return (
        <Aux>
          <Modal show={this.state.show} hide={this.hideModal}>
            <p>something went wrong!</p>
          </Modal>
          <WrappedComponent {...this.props}/>
        </Aux>
      );
    }

    showModal = () => {
      this.setState({show: true});
    }

    hideModal = () => {
      this.setState({show: false});
    }
  }
};

export default WithErrorHandler;
