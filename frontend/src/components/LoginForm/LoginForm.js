import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Form, Input, Button, Checkbox} from 'antd';
import {GoogleLogin} from 'react-google-login';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

import {authUser} from '../../actions';

import './LoginForm.css';
import logo from '../../assets/img/logoRed.png';
import google from '../../assets/icons/google.png';
import {fetchAuth} from "../../api";

const FormItem = Form.Item;

class LoginForm extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    state = {
        error_message: ''
    };

    successGoogleAuth = (resp) => {
        this.props.authUser(true)
    };

    failGoogleAuth = () => {
        this.props.authUser(false)
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, {email, password, remember}) => {
            if (!err) {
                fetchAuth({email, password}).then((resp) => {
                    let data = resp.data;
                    if (data.non_field_errors) {
                        this.setState({
                            error_message: data.non_field_errors
                        })
                    } else {
                        const { cookies } = this.props;
                        let config = { path: '/' };
                        config = remember ? config : Object.assign(config, {
                            expires: new Date(new Date().getTime() + 60 * 10000)
                        });
                        cookies.set('jwtToken', data.token, config);
                        this.props.authUser(true);
                    }
                })
            }
        });
    };

    handleErrorChange() {
        if (this.state.error_message) {
            this.setState({
                error_message: ''
            })
        }
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        let error_message = this.state.error_message;
        return (
            this.props.auth ? <Redirect to={'/'}/> :
                <div className="LoginForm">
                    <img src={logo} alt=""/>
                    <Form
                        onSubmit={this.handleSubmit.bind(this)}
                        layout={"vertical"}
                        className="login-form">
                        <FormItem label="Почта">
                            {getFieldDecorator('email', {
                                rules: [{required: true, message: 'Пожалуйста, введите почту!'}],
                            })(
                                <Input placeholder="Введите почту" onChange={this.handleErrorChange.bind(this)}/>
                            )}
                        </FormItem>
                        <FormItem label="Пароль">
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: 'Пожалуйста, введите пароль!'}],
                            })(
                                <Input
                                    type="password"
                                    placeholder="Введите пароль"
                                    onChange={this.handleErrorChange.bind(this)}/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox className={"loginCheckbox"}>Запомнить</Checkbox>
                            )}
                            {error_message ? <div className={"error_message"}>{error_message}</div> : ''}
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button">
                                Войти
                            </Button>
                        </FormItem>
                        {/*<div className={"orWith"}>Или с помощью</div>

                        <GoogleLogin
                            clientId="623849820644-s2j95k1ao7bgm970m6jmn9tbpablp2en.apps.googleusercontent.com"
                            buttonText=""
                            className="login-form-button googleAuth disabled"
                            onSuccess={this.successGoogleAuth.bind(this)}
                            onFailure={this.failGoogleAuth.bind(this)}
                        >
                            <img src={google} alt=""/>Google Аккаунт
                        </GoogleLogin>*/}
                    </Form>
                </div>
        );
    }
}

const WrappedLoginForm = Form.create()(LoginForm);

const mapStateToProps = (state) => ({
    auth: state.user.auth
});

const mapDispatchToProps = dispatch => bindActionCreators({
    authUser,
}, dispatch);

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(WrappedLoginForm));
