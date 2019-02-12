import React, {Component} from 'react'
import {Form, Input, Select, Button, Icon, Col, DatePicker, TimePicker, Checkbox, message, Tooltip} from 'antd'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import moment from 'moment'

import {addLessons, updateLesson} from "../../actions/lessons";
import {fetchAddLessons, fetchUpdateLesson, fetchLessons} from "../../api";
import {filterTeachers, filterGroups, filterCourses} from "../../filters";

import style from './LessonForm.module.css'

const FormItem = Form.Item;
const Option = Select.Option;

class CourseForm extends Component {
    constructor(props) {
        super(props);
        let {teachersObj, groupsObj} = this.props;
        let teachers = [];
        let groups = [];
        for (let key in teachersObj) {
            teachers.push(teachersObj[key]);
        }
        for (let key in groupsObj) {
            groups.push(groupsObj[key]);
        }
        this.state = {
            teachers,
            groups,
            loading: false,
            showDateRepeatTo: false,
            confirmDirty: false,
            emailWasSentText: '',
            visibleWasSent: false,
            disableButton: true,
            error: false,
            err_message: '',
            bg_color: ''
        }
    }

    colors = [
        {
            id: 1,
            color: 'red'
        },
        {
            id: 2,
            color: 'yellow'
        },
        {
            id: 3,
            color: 'green'
        },
        {
            id: 4,
            color: 'blue'
        },
        {
            id: 5,
            color: 'purple'
        },
    ];

    onSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, data) => {
            if (!err) {
                this.setState({
                    loading: true
                });
                console.log(data);
                let {
                    course = '',
                    teacher,
                    date,
                    time_to,
                    time_from,
                    date_to,
                    groups,
                    title = '',
                    location = ''
                } = data;

                if (!this.props.editableId) {
                    if (date_to) {
                        let items = [];
                        items.push({
                            name: title,
                            course,
                            groups,
                            teacher,
                            start_time: date.format('YYYY-MM-DD') + 'T' + time_from.format('HH:mm:ss') + '+07:00',
                            end_time: (() => {
                                let str_time_to = moment(time_to.format('HH:mm'), 'HH:mm');
                                let str_time_from = moment(time_from.format('HH:mm'), 'HH:mm');

                                console.log('str_time_from:', str_time_from);
                                console.log('str_time_to:', str_time_to);
                                console.log('time_to.isBefore(time_from):', str_time_to.isBefore(str_time_from));
                                if (str_time_to.isBefore(str_time_from)) {
                                    return date.clone().add(1, 'd').format('YYYY-MM-DD') + 'T' + time_to.format('HH:mm:ss') + '+07:00';
                                }
                                return date.format('YYYY-MM-DD') + 'T' + time_to.format('HH:mm:ss') + '+07:00'
                            })(),
                            lesson_type: 'session',
                            location,
                            bg_color: this.state.bg_color ? this.state.bg_color : "#d90008",
                        });

                        if (items[items.length - 1])

                            while (moment(date.add(7, 'days')).isBefore(date_to)) {
                                console.log(date.format('YYYY-MM-DD'));
                                items.push({
                                    name: title,
                                    course,
                                    groups,
                                    teacher,
                                    start_time: date.format('YYYY-MM-DD') + 'T' + time_from.format('HH:mm:ss') + '+07:00',
                                    end_time: (() => {
                                        let str_time_to = moment(time_to.format('HH:mm'), 'HH:mm');
                                        let str_time_from = moment(time_from.format('HH:mm'), 'HH:mm');

                                        console.log('str_time_from:', str_time_from);
                                        console.log('str_time_to:', str_time_to);
                                        console.log('time_to.isBefore(time_from):', str_time_to.isBefore(str_time_from));
                                        if (str_time_to.isBefore(str_time_from)) {
                                            return date.clone().add(1, 'd').format('YYYY-MM-DD') + 'T' + time_to.format('HH:mm:ss') + '+07:00';
                                        }
                                        return date.format('YYYY-MM-DD') + 'T' + time_to.format('HH:mm:ss') + '+07:00'
                                    })(),
                                    lesson_type: 'session',
                                    location,
                                    bg_color: this.state.bg_color ? this.state.bg_color : "red",
                                });
                            }
                        fetchAddLessons(items).then((status) => {
                            if (status === 201) {
                                fetchLessons().then(({data}) => {
                                    this.props.addLessons(data);
                                    this.setState({loading: false});
                                    this.props.updateSchedule();
                                    this.props.onCancel();
                                    message.success('Занятие успешно создано!');
                                });
                            } else {
                                this.setState({loading: false});
                                this.props.onCancel();
                                message.error('Ошибка при создании занятия!');
                            }
                        });
                        console.log(items);
                    } else {

                        fetchAddLessons([{
                            name: title,
                            course,
                            groups,
                            teacher,
                            start_time: date.format('YYYY-MM-DD') + 'T' + time_from.format('HH:mm:ss') + '+07:00',
                            end_time: (() => {
                                let str_time_to = moment(time_to.format('HH:mm'), 'HH:mm');
                                let str_time_from = moment(time_from.format('HH:mm'), 'HH:mm');

                                console.log('str_time_from:', str_time_from);
                                console.log('str_time_to:', str_time_to);
                                console.log('time_to.isBefore(time_from):', str_time_to.isBefore(str_time_from));
                                if (str_time_to.isBefore(str_time_from)) {
                                    return date.clone().add(1, 'd').format('YYYY-MM-DD') + 'T' + time_to.format('HH:mm:ss') + '+07:00';
                                }
                                return date.format('YYYY-MM-DD') + 'T' + time_to.format('HH:mm:ss') + '+07:00'
                            })(),
                            lesson_type: 'session',
                            location,
                            bg_color: this.state.bg_color ? this.state.bg_color : "red",
                        }]).then((status) => {
                            if (status === 201) {
                                fetchLessons().then(({data}) => {
                                    this.props.addLessons(data);
                                    this.setState({loading: false});
                                    this.props.updateSchedule();
                                    this.props.onCancel();
                                    message.success('Занятие успешно создано!');
                                });
                            } else {
                                this.setState({loading: false});
                                this.props.onCancel();
                                message.error('Ошибка при создании занятия!');
                            }
                        })
                    }
                } else {
                    fetchUpdateLesson({
                        id: +this.props.editableId,
                        name: title,
                        course,
                        groups,
                        teacher: +teacher,
                        start_time: date.format('YYYY-MM-DD') + 'T' + time_from.format('HH:mm:ss') + '+07:00',
                        end_time: (() => {

                            let str_time_to = moment(time_to.format('HH:mm'), 'HH:mm');
                            let str_time_from = moment(time_from.format('HH:mm'), 'HH:mm');

                            console.log('str_time_from:', str_time_from);
                            console.log('str_time_to:', str_time_to);
                            console.log('time_to.isBefore(time_from):', str_time_to.isBefore(str_time_from));
                            if (str_time_to.isBefore(str_time_from)) {
                                return date.clone().add(1, 'd').format('YYYY-MM-DD') + 'T' + time_to.format('HH:mm:ss') + '+07:00';
                            }
                            return date.format('YYYY-MM-DD') + 'T' + time_to.format('HH:mm:ss') + '+07:00'
                        })(),
                        lesson_type: 'session',
                        location,
                        bg_color: this.state.bg_color ? this.state.bg_color : "red",
                    }, this.props.editableId).then((data) => {
                        this.props.updateLesson(data);
                        this.setState({loading: false});
                        this.props.updateSchedule();
                        this.props.onCancel();
                        message.success('Занятие успешно изменено!');

                    })
                }
            }

        });
    };
    selectCourse = (val) => {
        this.props.form.resetFields(['teacher', 'groups']);
        let {coursesObj, teachersObj, groupsObj} = this.props;
        let teachersIds = coursesObj[val] ? coursesObj[val].teachers : [];
        let groupsIds = coursesObj[val] ? coursesObj[val].groups : [];
        let teachers = teachersIds.map((id) => {
            if (teachersObj[id]) {
                return teachersObj[id]
            }
        });
        console.log('groupsObj', groupsObj);
        console.log('groupsIds', groupsIds);
        let groups = groupsIds.map((id) => {
            if (groupsObj[id]) {
                return groupsObj[id]
            }
        });
        this.setState({
            teachers,
            groups
        })
    };

    onChangeCheck = () => {
        this.setState({
            showDateRepeatTo: !this.state.showDateRepeatTo
        })
    };

    componentDidMount() {
        console.log('mounted');
        let {editableId = '', lessons, groupsObj} = this.props;
        if (editableId) {
            if (lessons[editableId]) {
                let {
                    title,
                    course,
                    groups,
                    teacher,
                    name = '',
                    date_from,
                    date_to,
                    time_from,
                    time_to,
                    bgColor,
                    location = ''
                    /*type,
                    location,
               */
                } = lessons[editableId];


                this.setState({
                    bg_color: bgColor
                });

                let fieldsState = {
                    teacher: teacher.toString(),
                    date: moment(date_from, 'YYYY-MM-DD'),
                    time_to: moment(time_to, 'HH:mm:ss'),
                    time_from: moment(time_from, 'HH:mm:ss'),
                    groups: groups.map(item => item.toString()),
                    location,
                    title: name,
                };

                if (course) {
                    this.selectCourse(course);
                    fieldsState.course = course.toString();
                }

                console.log('fieldsState: ', fieldsState);

                this.props.form.setFieldsValue(fieldsState)

                /*
                * course = '',
                    teacher,
                    date,
                    time_to,
                    time_from,
                    date_to,
                    groups,
                    title = '',
                * */
            }
        }
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {courses} = this.props;
        let {teachers, groups, loading} = this.state;

        let edit = !!this.props.editableId;

        console.log('groups', groups);
        console.log('courses', courses);
        console.log('loading', loading);
        return (
            <Form className={style.responsiveForm}>
                <header className={'AccountSettingsFormHeader'}>{(edit ? 'Изменить' : 'Добавить') + ' занятие'}</header>
                <div className={'changePasswordForm LessonForm'}>
                    <div>
                        <section>
                            <FormItem
                                label={(
                                    <span>Название &nbsp;<Tooltip
                                        title="Будет отображаться в расписании в случае, если не был выбран курс.">
                                    <Icon type="question-circle-o"/>
                                    </Tooltip>
                                </span>
                                )}>
                                {getFieldDecorator('title', {})(
                                    <Input placeholder="Введите название"/>
                                )}
                            </FormItem>
                            <FormItem label="Курс">
                                {getFieldDecorator('course', {})(
                                    <Select placeholder="Выберите курс"
                                            onSelect={this.selectCourse}>
                                        {courses.map(({id, title}, i) => <Option key={i}
                                                                                 value={id.toString()}>{title}</Option>)}
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem
                                label="Преподаватель *"
                                className={(teachers.length > 0) ? '' : 'disabledItem'}
                            >
                                {getFieldDecorator('teacher', {
                                    rules: [
                                        {required: true, message: 'Пожалуйста выберите преподавателя!'},
                                    ],
                                })(
                                    <Select placeholder="Выберите учителя"
                                            className={(teachers.length > 0) ? '' : 'disabledItem'}>
                                        {teachers.map(({id, name}, i) => <Option key={i}
                                                                                 value={id.toString()}>{name}</Option>)}
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem
                                className={(groups.length > 0) ? '' : 'disabledItem'}
                                label="Группы *"
                            >
                                {getFieldDecorator('groups', {
                                    rules: [
                                        {required: true, message: 'Пожалуйста выберите группу!', type: 'array'},
                                    ],
                                })(
                                    <Select mode="multiple" placeholder="Выберите учебные группы"
                                            className={(groups.length > 0) ? '' : 'disabledItem'}>
                                        {groups.map(({id, name}, i) => <Option key={i}
                                                                               value={id.toString()}>{name}</Option>)}
                                    </Select>
                                )}
                            </FormItem>
                        </section>
                        <section>
                            <FormItem label={"Дата *"}>
                                {getFieldDecorator('date', {
                                    rules: [{
                                        required: true,
                                        message: 'Пожалуйста, введите дату!',
                                    }],
                                })(
                                    <DatePicker placeholder="Выберите дату" format={'DD-MM-YYYY'}/>
                                )}
                            </FormItem>
                            <FormItem
                                label="Время *"
                            >

                                <Col span={11}>
                                    <FormItem>
                                        {getFieldDecorator('time_from', {
                                            rules: [{
                                                required: true,
                                                message: 'Пожалуйста, введите время начала!',
                                            }],
                                        })(
                                            <TimePicker
                                                format={'HH:mm'}
                                                placeholder="От"
                                                onChange={(time) => {
                                                    console.log('FORMAT :', time.format('HH:mm'));
                                                    let newTime = moment(time.format('HH:mm'), 'HH:mm');
                                                    newTime.add(90, 'm');
                                                    console.log('NEW FORMAT', newTime.format('HH:mm'));
                                                    this.props.form.setFieldsValue({
                                                        'time_to': newTime
                                                    })
                                                }}
                                            />
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
                                        {getFieldDecorator('time_to', {
                                            rules: [{
                                                required: true,
                                                message: 'Пожалуйста, введите время окончания!',
                                            }],
                                        })(
                                            <TimePicker format={'HH:mm'} placeholder="До"/>
                                        )}
                                    </FormItem>
                                </Col>
                            </FormItem>
                            {edit ? '' :
                                <Checkbox style={{marginBottom: '20px'}}
                                          onChange={this.onChangeCheck}>Повторить</Checkbox>}
                            <FormItem>
                                {(this.state.showDateRepeatTo && !edit) ? getFieldDecorator('date_to', {
                                    rules: [{
                                        required: true,
                                        message: 'Пожалуйста, введите дату окончания!',
                                    }],
                                })(
                                    <DatePicker placeholder="До" format={'DD-MM-YYYY'}/>
                                ) : ''}
                            </FormItem>
                            <FormItem
                                label={'Место'}>
                                {getFieldDecorator('location', {})(
                                    <Input placeholder="Введите место проведения"/>
                                )}
                            </FormItem>
                            <div className={style.colorSection}>
                                <span className={'ant-form-item-label label'}>Цвет</span>
                                {this.colors.map(({id, color}) => {

                                    return <div className={(this.state.bg_color === color) ? '' : style.hideIcon} onClick={() => {
                                        this.setState({
                                            bg_color: color,
                                        })
                                    }
                                    } style={{backgroundColor: color}}>
                                        <Icon type="check" />
                                    </div>
                                })}
                            </div>
                        </section>
                    </div>
                    <div className={'savePwdButton'}>
                        <Button
                            onClick={this.onSubmit}
                            type="primary"
                            className={"login-form-button" + (this.state.loading ? ' disabled' : '')}
                        >
                            {loading ? <Icon type="loading"/> : (edit ? 'Изменить' : 'Добавить')}
                        </Button>
                    </div>

                </div>
            </Form>
        );
    }
}

const WrappedCourseForm = Form.create()(CourseForm);

const mapStateToProps = (state) => ({
    courses: filterCourses(state),
    teachersObj: filterTeachers(state, true),
    groupsObj: filterGroups(state, true),
    coursesObj: filterCourses(state, true),
    lessons: state.entities.lessons.byId
});

const mapDispatchToProps = dispatch => bindActionCreators({
    addLessons,
    updateLesson
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedCourseForm);