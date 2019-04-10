import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import LoginForm from '../containers/LoginFormContainer';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            showError: false,
            errorMessage: ""
        }
        this.setRedirect = this.setRedirect.bind(this);
        this.setError = this.setError.bind(this);
    }

    setRedirect(redirect) {
        this.setState({redirect: redirect})
    }

    setError(message) {
        this.setState({showError: true, errorMessage: message})
    }

    loginError = () => (
        <div className="d-flex justify-content-center text-danger">
            <h3>{this.state.errorMessage}</h3>
        </div>
    );

    render() {
        return (
            <div className="m-3 p-5 page-bg">
                <div className="d-flex justify-content-center m-3">
                    <h3>Please log in...</h3>
                </div>
                <div className="m-5">
                    {this.state.redirect ? <Redirect to='/chat' /> : <LoginForm setRedirect={this.setRedirect} setError={this.setError}/>}
                </div>
                <div>{this.state.showError && this.loginError()}</div>
                <div className="d-flex justify-content-center m-3">
                    <h4>or <Link to='/register'>Register</Link> if you do not have an account.</h4>
                </div>
            </div>
        )
    }
}

export default Login