import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from './RegisterForm';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            success: false,
            showError: false,
            errorMessage: ""
        }
        this.setSuccess = this.setSuccess.bind(this);
        this.setErrorMessage = this.setErrorMessage.bind(this);
    };

    setSuccess(success) {
        this.setState({showError: false, success: success})
    };

    setErrorMessage(message) {
        this.setState({showError: true, errorMessage: message})
    };

    RegistrationSuccess = () => (
        <div>
            <h2>You have successfully registered!</h2>
            <h3>Please <Link to='/login'>Login</Link>.</h3>
        </div>
    );

    RegistrationError = () => (
        <div>
            <h3>{this.state.errorMessage}</h3>
        </div>
    );

    render() {
        return this.state.success ? this.RegistrationSuccess()
                                    :<div>
                                        <h2>DISCLAIMER: PLEASE USE A THROWAWAY PASSWORD</h2>
                                        <h3>I have done my best to secure the database of this project but the source code is publicly available so please do not use a real password that you commonly use for other accounts.</h3>
                                        <div><RegisterForm setSuccess={this.setSuccess} setErrorMessage={this.setErrorMessage} /></div>
                                        <div>{this.state.showError && this.RegistrationError()}</div>
                                        <div><h4>Already have an account? <Link to='/login'>Log in</Link></h4></div>
                                    </div>
    }
};

export default Register