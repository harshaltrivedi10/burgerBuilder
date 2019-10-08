import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        constructor () {
            super ();
            this.state.requestInterceptor = axios.interceptors.request.use(request => {
                this.setState({error: null});
                return request;
            });

            this.state.responseInterceptor = axios.interceptors.response.use(response => response, error => {
                this.setState({error: error});
            });
        }

        state = {
            error: null,
            requestInterceptor: null,
            responseInterceptor: null 
        }

        componentWillUnmount () {
            console.log("Will Unmount", this.state.requestInterceptor, this.state.responseInterceptor);
            axios.interceptors.request.eject(this.state.requestInterceptor);    
            axios.interceptors.response.eject(this.state.responseInterceptor);    
        }


        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render () {
            return (
                <Auxiliary>
                    <Modal show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}  
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Auxiliary>
            );
        }

    }
}

export default withErrorHandler;
