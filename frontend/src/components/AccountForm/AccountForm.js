import React, {Component} from 'react';
import {Form, Input, Button, Icon, Modal, message} from 'antd'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import './AccountForm.css';
import {setInfo, authUser} from "../../actions";
import {fetchPwd, fetchChangeUserInfo} from "../../api";
import ChangePwdForm from './ChangePwdForm'

const FormItem = Form.Item;

class AccountForm extends Component {
    constructor(props) {
        super(props);
        //this.inputRef = React.createRef();
        this.state = {
            edit: false,
            confirmDirty: false,
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.state.edit) {
            const node = this.inputRef;
            node.focus();
            this.setState({
                edit: !this.state.edit
            })
        } else {
            this.props.form.validateFields((err, {email}) => {
                if (!err) {
                    console.log('Received values of form: ', email);
                    let newData = Object.assign({}, this.props.user, { email });
                    fetchChangeUserInfo(newData).then((resp) => {
                        if (resp.status ===200) {
                            this.props.setInfo(resp.data)
                        }
                        /* TODO Fix token validation on backend side */
                        this.props.authUser();
                        message.success('Почта аккаунта успешно изменена!');
                        this.setState({
                            edit: !this.state.edit
                        })
                    });

                }
            });
        }
    };

    changePwd = (data) => {
        return fetchPwd(data)
            .then(({ status, data }) => {
                if (status === 200) {
                    this.handleCancel();
                    if (data.detail) {
                        message.success(data.detail);
                    }
                } else {
                    return data
                }

            })
    };

    chowPwdForm = () => {
        console.log('show');
        this.setState({
            chowPwdForm: true,
        });
    };

    handleCancel = (e) => {
        this.setState({
            chowPwdForm: false
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        let {edit} = this.state;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };
        return <Form className={'AccountForm'} onSubmit={this.handleSubmit}>
            <FormItem
                label={'Почта'}
                {...formItemLayout}>
                {getFieldDecorator('email', {
                    initialValue: this.props.user.email,
                    rules: [{
                        required: true, message: 'Пожалуйста введите свою почту!'
                    }],
                })(
                    <Input
                        ref={(ref) => this.inputRef = ref}
                        className={!edit ? 'form_disabled' : ''}
                        placeholder="Почта"/>
                )}
                <Button
                    htmlType='submit'
                    className={"ChangeButton"}>
                    <Icon type="edit"/>{edit ? 'Сохранить' : 'Изменить'}
                </Button>
            </FormItem>
            <FormItem
                label={'Пароль'}
                {...formItemLayout}>
                {getFieldDecorator('password', {
                    initialValue: 'something',
                })(
                    <Input
                        className={'form_disabled'}
                        type="password"
                        placeholder="Пароль"/>
                )}
                <Button
                    className={"ChangeButton"}
                    onClick={this.chowPwdForm}><Icon type="form" />Изменить
                </Button>
            </FormItem>

            <Modal
                visible={this.state.chowPwdForm}
                width={"398px"}
                height={"566px"}
                onCancel={this.handleCancel.bind(this)}
                className={'modalBody'}
            >
                <ChangePwdForm
                    onSave={this.changePwd.bind(this)}
                    onClose={this.handleCancel.bind(this)}
                />
            </Modal>
        </Form>
    }
}

const mapStateToProps = (state) => ({
    user: state.user.info
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setInfo,
    authUser
}, dispatch);

const WrappedNormalAccountForm = Form.create()(AccountForm);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalAccountForm);
