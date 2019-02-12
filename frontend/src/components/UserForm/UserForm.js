import React, {Component} from 'react'
import {Form, Input, Button, Icon, InputNumber, DatePicker, message} from 'antd'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import moment from "moment";

import {addUser, updateUser} from "../../actions/users";
import {fetchAddUser, fetchUpdateUser} from "../../api";
import { filterGroups, filterCourses} from "../../filters";

const FormItem = Form.Item;

class UserForm extends Component {
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

    onSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, {
            first_name = '',
            last_name = '',
            password,
            patronymic = '',
            username,
            phone = '',
            email,
            birthday = ''
        }) => {
            if (!err) {
                this.setState({loading: true});

                if (birthday) {
                    birthday = moment(birthday, 'DD-MM-YYYY').format('YYYY-MM-DD')
                }

                if (!this.props.editableId) {
                    fetchAddUser({
                        first_name,
                        last_name,
                        password,
                        patronymic,
                        username: email,
                        phone,
                        email,
                        role: this.props.role,
                        birthday
                    }).then(({data}) => {
                        this.props.addUser(data);
                        this.setState({loading: false});
                        this.props.onCancel();
                        message.success(this.props.textRole + ' был успешно создан!');
                    });
                } else {
                    fetchUpdateUser({
                        id: this.props.editableId,
                        first_name,
                        last_name,
                        password,
                        patronymic,
                        username: email,
                        phone,
                        email,
                        role: this.props.role,
                        birthday
                    }).then((data) => {
                        this.props.updateUser(data);
                        this.setState({loading: false});
                        this.props.onCancel();
                        message.success(this.props.textRole + ' был успешно изменен!');
                    });
                }
            }
        });
    };

    componentDidMount() {
        console.log('mounted');
        console.log('this.props', this.props);
        let {editableId = '', users} = this.props;
        if (editableId) {
            if (users[editableId]) {
                let {
                    first_name,
                    last_name,
                    phone = '',
                    patronymic = '',
                    email,
                    birthday = '',
                    username
                } = users[editableId];

               let fieldsState = {
                    first_name,
                    last_name,
                    patronymic,
                    email,
                };

                if (phone) {
                    fieldsState.phone = phone;
                }

                if (birthday) {
                    fieldsState.birthday = moment(birthday, 'YYYY-MM-DD')
                }

                console.log('fieldsState: ',fieldsState);

                this.props.form.setFieldsValue(fieldsState)
            }
        }
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Два пароля, которые вы вводите, несовместимы!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['repeat_password'], { force: true });
        }
        callback();
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {users, groups, editableId} = this.props;

        let edit = !!editableId;
        return (
            <Form>
                <header className={'AccountSettingsFormHeader'}>{(edit ? 'Изменить ' : 'Добавить')}<br/>{this.props.text}</header>
                <div className={'changePasswordForm'}>
                    <div>
                        <FormItem label="Имя">
                            {getFieldDecorator('first_name', {})(
                                <Input placeholder="Введите имя"/>
                            )}
                        </FormItem>
                        <FormItem label="Фамилия">
                            {getFieldDecorator('last_name', {})(
                                <Input placeholder="Введите фамилию"/>
                            )}
                        </FormItem>
                        <FormItem label="Отчество">
                            {getFieldDecorator('patronymic', {})(
                                <Input placeholder="Введите отчество"/>
                            )}
                        </FormItem>
                        <FormItem label={"Дата рождения *"}>
                            {getFieldDecorator('birthday', {})(
                                <DatePicker placeholder="Выберите дату рождения" format={'DD-MM-YYYY'}/>
                            )}
                        </FormItem>
                        <FormItem label="Телефон">
                            {getFieldDecorator('phone', {
                                rules: [{
                                    required: true,
                                    message: 'Пожалуйста, введите номер мобильного телефона!',
                                }],
                            })(
                                <InputNumber
                                    placeholder={'Введите номер мобильного телефона *'}
                                    max={9999999999}
                                    formatter={(value) => {
                                        if (value.toString().length === 0) {
                                            return value;
                                        }
                                        let newValue = '';
                                        console.log('Formatter value:', value);
                                        if (value.toString().length > 10) {
                                            newValue = isNaN(+value.toString().substring(0, 10))
                                                ? value.toString().substring(0, 10)
                                                : +value.toString().substring(0, 10);
                                            console.log('Formatter newvalue:', newValue);
                                            return `+7${newValue}`;
                                        } else return `+7${value}`;
                                    }}
                                    parser={(value) => {
                                        console.log('parser', value);
                                        if (!value.length) {
                                            return value;
                                        } else {
                                            if (+value.replace(/\+7\s?|(,*)/g, '').length > 10) {
                                                value = value.replace(/\+7\s?|(,*)/g, '');
                                                let newValue = isNaN(+value.substring(0, 10))
                                                    ? value.substring(0, 10)
                                                    : +value.substring(0, 10);
                                                return newValue;
                                            }
                                            return value.replace(/\+7\s?|(,*)/g, '');
                                        }
                                    }}
                                    onFocus={() => {
                                        if (!this.props.form.getFieldValue('phone')) {
                                            this.props.form.setFieldsValue({
                                                phone: ' '
                                            });
                                        }
                                    }}
                                    onBlur={() => {
                                        console.log(this.props.form.getFieldValue('phone'));
                                        if (this.props.form.getFieldValue('phone') == ' ') {
                                            this.props.form.setFieldsValue({
                                                phone: ''
                                            });                                        }
                                    }}/>
                            )}
                        </FormItem>
                        <FormItem label="Почта *">
                            {getFieldDecorator('email', {
                                rules: [{
                                    required: true,
                                    message: 'Пожалуйста, введите почту!',
                                }],
                            })(
                                <Input placeholder="Введите почту"/>
                            )}
                        </FormItem>
                        {edit ? '' : <FormItem label="Пароль *">
                            {getFieldDecorator('password', {
                                rules: [{
                                    required: true,
                                    message: 'Пожалуйста, введите пароль!',
                                }, {
                                    validator: this.validateToNextPassword,
                                }],
                            })(
                                <Input type="password" placeholder="Введите пароль"/>
                            )}
                        </FormItem>}
                        {edit ? '' : <FormItem label="Повторить *">
                            {getFieldDecorator('repeat_password', {
                                rules: [{
                                    required: true,
                                    message: 'Пожалуйста, повторите пароль!',
                                }, {
                                    validator: this.compareToFirstPassword,
                                }],
                            })(
                                <Input
                                    type="password"
                                    placeholder="Повторите пароль"
                                    onBlur={this.handleConfirmBlur}/>
                            )}
                        </FormItem>}
                    </div>
                    <div className={'savePwdButton'}>
                        <Button
                            onClick={this.onSubmit}
                            type="primary"
                            className={"login-form-button" + ((this.state.loading) ? ' disabled' : '')}
                        >
                            {this.state.loading ? <Icon type="loading "/> : (edit ? 'Изменить' : 'Добавить')}
                        </Button>
                    </div>

                </div>
            </Form>
        );
    }
}

const WrappedCourseForm = Form.create()(UserForm);

const mapStateToProps = (state) => ({
    groups: filterGroups(state),
    groupsObj: filterGroups(state, true),
    courses: filterCourses(state, true)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    addUser,
    updateUser
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedCourseForm);