import React, {Component} from 'react'
import {Form, Input, Select, Button, Icon, message} from 'antd'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import {addGroup, updateGroup} from "../../actions/groups";
import {fetchAddGroup, fetchUpdateGroup} from "../../api";
import { filterGroups, filterCourses, filterLearners} from "../../filters";

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
            name,
            learners
        }) => {
            if (!err) {
                this.setState({loading: true});
                
                if (!this.props.editableId) {
                    fetchAddGroup({
                        name,
                        learners
                    }).then(({data}) => {
                        this.props.addGroup(data);
                        this.setState({loading: false});
                        this.props.onCancel();
                        message.success('Курс был успешно создан!');
                    });
                } else {
                    fetchUpdateGroup({
                        id: this.props.editableId,
                        name,
                        learners,
                        //lessons: []
                    }).then((data) => {
                        this.props.updateGroup(data);
                        this.setState({loading: false});
                        this.props.onCancel();
                        message.success('Группа была успешно изменена!');
                    });
                }
            }
        });
    };

    componentDidMount() {
        console.log('mounted');
        console.log('this.props', this.props);
        let {editableId = '', groups, groupsObj} = this.props;
        if (editableId) {
            if (groupsObj[editableId]) {
                let {
                    id,
                    name,
                    learners
                } = groupsObj[editableId];

                let fieldsState = {
                    name,
                    learners: learners.map(id => id.toString())
                };

                console.log('fieldsState: ',fieldsState);

                this.props.form.setFieldsValue(fieldsState)
            }
        }
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {learners, groups, editableId} = this.props;

        let edit = !!editableId;

        return (
            <Form>
                <header className={'AccountSettingsFormHeader'}>{edit ? 'Изменить' : 'Добавить'} группу</header>
                <div className={'changePasswordForm'}>
                    <div>
                        <FormItem label="Название *">
                            {getFieldDecorator('name', {
                                rules: [{
                                    required: true,
                                    message: 'Пожалуйста, введите название!',
                                }],
                            })(
                                <Input placeholder="Введите название"/>
                            )}
                        </FormItem>
                        <FormItem
                            label="Ученики"
                        >
                            {getFieldDecorator('learners', {})(
                                <Select mode="multiple" placeholder="Выберите ученика">
                                    {learners.map(({id, name}, i) => <Option key={i} value={id.toString()}>{name}</Option>)}
                                </Select>
                            )}
                        </FormItem>

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

const WrappedCourseForm = Form.create()(CourseForm);

const mapStateToProps = (state) => ({
    learners: filterLearners(state),
    learnersObj: filterLearners(state, true),
    groups: filterGroups(state),
    groupsObj: filterGroups(state, true),
    courses: filterCourses(state, true)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    addGroup,
    updateGroup
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedCourseForm);