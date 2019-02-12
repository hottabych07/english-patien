import React, { Component } from 'react';

import './Login.css';
import LoginForm from "../../components/LoginForm/LoginForm";

class Login extends Component {

    render() {
        return (
            <div className="Login">
                <LoginForm/>
                <div className="Login_blur"/>
            </div>
        );
    }
}

export default Login;
