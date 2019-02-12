import React, {Component} from 'react'
import {Form, Input, Button, Tooltip, Icon} from 'antd'

import "./AccountForm.css";

const FormItem = Form.Item;

class ChangePassForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            err_old_password: false,
            err_message_old_password: '',
            err_new_password2: false,
            err_message_new_password2: '',
            confirmDirty: false,
            emailWasSentText: '',
            visibleWasSent: false,
            disableButton: true,
            error: false,
            err_message: '',
        }
    }

    checkPass(error_type) {
        this.setState({['err_' + error_type]: false});
        let old_password = this.props.form.getFieldValue('old_password');
        let new_password1 = this.props.form.getFieldValue('new_password1');
        let confirmPwd = this.props.form.getFieldValue('new_password2');
        let isConfirm = new_password1 === confirmPwd;
        if (old_password && new_password1 && confirmPwd && isConfirm) {
            this.setState({disableButton: false});
        } else {
            this.setState({disableButton: true})
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, data) => {
            if (!err) {
                this.setState({loading: true});
                this.props.onSave(data).then((data) => {
                    if (data) {
                        for (let key in data) {

                            this.setState({
                                ['err_' + key]: true,
                                ['err_message_' + key]: data[key][0]
                            });

                            console.log(this.state);
                        }
                    }
                    this.setState({loading: false});
                });
            }
        });
    };

    onRemind = (e) => {
        e.preventDefault();
        this.setState({
            emailWasSentText: 'Please check your email. We sent a link to password recovery.',
            visibleWasSent: true
        });
        /*this.props.remindPassword(this.props.user.user.email).then((resp) => {

        });*/
    };

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('new_password1')) {
            callback('Пароли должны совпадать!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['new_password2'], {force: true});
        }
        callback();
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form>
                <header className={'AccountSettingsFormHeader'}>Изменить пароль</header>
                <div className={'changePasswordForm'}>
                    <div>
                        <FormItem label="Старый пароль" style={{marginBottom: '25px'}}>
                            <Tooltip
                                placement='right'
                                visible={this.state.err_old_password}
                                title={this.state.err_message_old_password}>
                                {
                                    getFieldDecorator('old_password', {
                                        initialValue: '',
                                        rules: [{
                                            required: true,
                                            type: 'password',
                                            message: 'Пожалуйста введите новый пароль!',
                                            validator: (rule, value, callback) => {
                                                this.checkPass('old_password');
                                                callback();
                                            }
                                        },],
                                    })
                                    (<Input type="password"/>)
                                }
                            </Tooltip>
                            {
                                !this.state.visibleWasSent && <div className={'remind disabled'}>
                                    <span onClick={this.onRemind}>Забыл пароль</span>
                                </div>
                            }
                        </FormItem>
                    </div>
                </div>

                {
                    this.state.visibleWasSent && <div className={'remindBox'}>
                        <div className={'remindText'}>
                            {this.state.visibleWasSent ? this.state.emailWasSentText : ''}
                            {this.state.visibleWasSent && <a href="#" onClick={this.onRemind}> Send again</a>}
                        </div>
                    </div>
                }

                <div className={'changePasswordForm'}>
                    <div>
                        <FormItem label="Новый пароль">
                            {
                                getFieldDecorator('new_password1', {
                                    initialValue: '',
                                    rules: [{
                                        required: true,
                                        type: 'password',
                                        message: 'Пожалуйста введите новый пароль!',
                                        validator: (rule, value, callback) => {
                                            this.checkPass(value);
                                            callback();
                                        }
                                    }, {
                                        validator: this.validateToNextPassword,
                                    }],
                                })(<Input type="password"/>)
                            }
                        </FormItem>
                        <FormItem label="Повторите пароль">
                            <Tooltip
                                placement='right'
                                visible={this.state.err_new_password2}
                                title={this.state.err_message_new_password2}>
                                {
                                    getFieldDecorator('new_password2', {
                                        initialValue: '',
                                        rules: [{
                                            required: true,
                                            type: 'password',
                                            message: 'Пожалуйста повторите пароль!',
                                            validator: (rule, value, callback) => {
                                                this.checkPass(value);
                                                callback();
                                            }
                                        }, {
                                            validator: this.compareToFirstPassword,
                                        }],
                                    })(<Input type="password" onBlur={this.handleConfirmBlur}/>)
                                }
                            </Tooltip>
                        </FormItem>
                    </div>
                    <FormItem>
                        <div className={'savePwdButton'}>
                            <Button
                                style={(this.state.disableButton || this.state.loading) ? {
                                    backgroundColor: '#dcdee6',
                                    pointerEvents: 'none',
                                    borderWidth: '0px'
                                } : {}}
                                onClick={this.onSubmit}
                                type="primary"
                                className="login-form-button"
                            >
                                {this.state.loading ? <Icon type="loading"/> : 'Изменить'}
                            </Button>
                        </div>
                    </FormItem>
                </div>
            </Form>
        );
    }
}

const WrappedChangePassForm = Form.create()(ChangePassForm);

export default WrappedChangePassForm;