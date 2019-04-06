import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
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
    }

    setRedirect(redirect) {
        this.setState({redirect: redirect})
    }

    render() {
        return (
            <div>
                {this.state.redirect ? <Redirect to='/chat' /> : <LoginForm setRedirect={this.setRedirect}/>}
            </div>
        )
    }
}

export default Login