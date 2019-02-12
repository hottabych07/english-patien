import React, {Component} from 'react'
import {Form, Input, Select, Button, Icon, Col, DatePicker, message} from 'antd'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import moment from "moment";

import {addCourse, updateCourse} from "../../actions/courses";
import {fetchAddCourse, fetchUpdateCourse} from "../../api";
import {filterTeachers, filterGroups, filterCourses} from "../../filters";

const FormItem = Form.Item;
const Option = Select.Option;
const {TextArea} = Input;

class CourseForm extends Component {
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
            title,
            description,
            teachers,
            date_from,
            date_to,
            groups
        }) => {
            if (!err) {
                this.setState({loading: true});
                console.log(teachers);
                let newTeachers = teachers.map((item) => {
                    let id = item.match(/\d+/g)[0];
                    if (id) {
                        return +id
                    }
                });
                if (!this.props.editableId) {
                    fetchAddCourse({
                        name: title,
                        description,
                        teachers,
                        start_date: date_from.format('YYYY-MM-DD'),
                        end_date: date_to.format('YYYY-MM-DD'),
                        groups,
                        //lessons: []
                    }).then(({data}) => {
                        this.props.addCourse(data);
                        this.setState({loading: false});
                        this.props.onCancel();
                        message.success('Курс был успешно создан!');
                    });
                } else {
                    fetchUpdateCourse({
                        id: this.props.editableId,
                        name: title,
                        description,
                        teachers,
                        start_date: date_from.format('YYYY-MM-DD'),
                        end_date: date_to.format('YYYY-MM-DD'),
                        groups,
                        //lessons: []
                    }).then((data) => {
                        this.props.updateCourse(data);
                        this.setState({loading: false});
                        this.props.onCancel();
                        message.success('Курс был успешно изменен!');
                    });
                }
            }
        });
    };

    componentDidMount() {
        console.log('mounted');
        console.log('this.props', this.props);
        let {editableId = '', courses, groupsObj} = this.props;
        if (editableId) {
            if (courses[editableId]) {
                let {
                    description,
                    id,
                    title,
                    date_from,
                    date_to,
                    teachers,
                    groups,
                } = courses[editableId];


                let fieldsState = {
                    description,
                    title,
                    date_from: moment(date_from, 'YYYY-MM-DD'),
                    date_to: moment(date_to, 'YYYY-MM-DD'),
                    teachers: teachers.map(teacher => teacher.toString()),
                    groups,
                };

                console.log('fieldsState: ',fieldsState);

                this.props.form.setFieldsValue(fieldsState)
            }
        }
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {teachers, groups, editableId} = this.props;

        let edit = !!editableId;
        return (
            <Form>
                <header className={'AccountSettingsFormHeader'}>{edit ? 'Изменить' : 'Добавить'} курс</header>
                <div className={'changePasswordForm'}>
                    <div>
                        <FormItem label="Название *">
                            {getFieldDecorator('title', {
                                rules: [{
                                    required: true,
                                    message: 'Пожалуйста, введите название!',
                                }],
                            })(
                                <Input placeholder="Введите название"/>
                            )}
                        </FormItem>
                        <FormItem label="Описание">
                            {getFieldDecorator('description', {})(
                                <TextArea rows={4} placeholder="Введите описание"/>
                            )}
                        </FormItem>
                        <FormItem
                            label="Преподаватель *"
                        >
                            {getFieldDecorator('teachers', {
                                rules: [
                                    {required: true, message: 'Пожалуйста выберите учителя!', type: 'array'},
                                ],
                            })(
                                <Select mode="multiple" placeholder="Выберите учителя">
                                    {teachers.map(({id, name}, i) => <Option key={i} value={id.toString()}>{name}</Option>)}
                                </Select>
                            )}
                        </FormItem>
                        <FormItem
                            label="Период *"
                        >
                            <Col span={11}>
                                <FormItem>
                                    {getFieldDecorator('date_from', {
                                        rules: [{
                                            required: true,
                                            message: 'Пожалуйста, введите дату!',
                                        }],
                                    })(
                                        <DatePicker placeholder="Дата от"/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={2}>
        <span style={{display: 'inline-block', width: '100%', textAlign: 'center'}}>
          -
        </span>
                            </Col>
                            <Col span={11}>
                                <FormItem>
                                    {getFieldDecorator('date_to', {
                                        rules: [{
                                            required: true,
                                            message: 'Пожалуйста, введите дату!',
                                        }],
                                    })(
                                        <DatePicker placeholder="Дата до"/>
                                    )}
                                </FormItem>
                            </Col>
                        </FormItem>
                        <FormItem
                            label="Группы *"
                        >
                            {getFieldDecorator('groups', {
                                rules: [
                                    {required: true, message: 'Пожалуйста выберите группу!', type: 'array'},
                                ],
                            })(
                                <Select mode="multiple" placeholder="Выберите учебные группы">
                                    {groups.map(({id, name}, i) => <Option key={i} value={id}>{name}</Option>)}
                                </Select>

                            )}
                        </FormItem>

                    </div>
                    <div className={'savePwdButton'}>
                        <Button
                            onClick={this.onSubmit}
                            type="primary"
                            className={"login-form-button" + (this.state.loading ? ' disabled' : '')}
                        >
                            {this.state.loading ? <Icon type="loading "/> : (edit ? 'Изменить' : 'Добавить')}
                        </Button>
                    </div>

                </div>
            </Form>
        );
    }
}

const WrappedCourseForm = Form.create()(CourseForm);

const mapStateToProps = (state) => ({
    teachers: filterTeachers(state),
    groups: filterGroups(state),
    groupsObj: filterGroups(state, true),
    courses: filterCourses(state, true)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    addCourse,
    updateCourse
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedCourseForm);