import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Button, Icon, message, Modal} from "antd";

import CoursesTable from '../../components/CoursesTable/CoursesTable'
import CourseForm from "../../components/CourseForm/CourseForm";

import style from './Courses.module.css';
import {addUsers} from "../../actions/users";
import {addGroups} from "../../actions/groups";
import {addCourses, deleteCourse} from "../../actions/courses";
import {addLessons} from "../../actions/lessons";
import {fetchCourses, fetchGroups, fetchUsers, fetchDeleteCourse} from "../../api";
import {filterCourses} from "../../filters";

class Courses extends Component {

    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleDeleteByKeys = this.handleDeleteByKeys.bind(this);
        this.setRowKeys = this.setRowKeys.bind(this);
    }

    state = {
        showCourseForm: false,
        selectedRowKeys: [],
        editableId: ''
    };

    componentDidMount() {
        fetchUsers().then(({data}) => {
            this.props.addUsers(data)
        });
        fetchGroups().then(({data}) => {
            this.props.addGroups(data)
        });
        fetchCourses().then(({data}) => {
            this.props.addCourses(data)
        })
    }

    toggleShowForm = (name, flag = false, id = '') => {
        this.setState({
            [name + 'Form']: flag,
            editableId: id
        })
    };

    handleDelete(id) {
        fetchDeleteCourse(id).then((status) => {
            if (status === 204) {
                this.props.deleteCourse({id});
                message.success('Курс успешно удален!')
            } else {
                message.error('Ошибка удаления!')
            }
        })
    }

    handleDeleteByKeys() {
        let promises = this.state.selectedRowKeys.map((id) => fetchDeleteCourse(id));
        Promise.all(promises)
        .then((values) => {
                let flag = values.filter((status) => (status === 204)).length === values.length;
                if (flag) {
                    this.state.selectedRowKeys.forEach(id => this.props.deleteCourse({id}));
                    message.success('Выбранные курсы успешно удалены!')
                    this.setState({
                        selectedRowKeys: []
                    });
                } else {
                    message.success('Ошибка удаления!')
                }
        })
    }

    setRowKeys(keys) {
        this.setState({
            selectedRowKeys: keys
        })
    }

    render() {
        return <div className={style.courses}>
                <div className={style.buttonPanel}>
                    {(this.state.selectedRowKeys.length === 0) ? <div/> : <Button
                        className={style.deleteButton}
                        onClick={this.handleDeleteByKeys}>
                        <Icon type="delete" />
                    </Button>}
                    <Button onClick={() => this.toggleShowForm('showCourse', true)}>
                        <Icon type="plus-circle"/>
                        Добавить курс
                    </Button>
                </div>
                <CoursesTable
                    setRowKeys={this.setRowKeys}
                    showForm={((id) => {
                        this.toggleShowForm('showCourse', true, id)
                    }).bind(this)}
                    handleDelete={this.handleDelete}
                    data={this.props.courses}/>
                <Modal
                    visible={this.state.showCourseForm}
                    destroyOnClose={true}
                    width={"500px"}
                    height={"566px"}
                    onCancel={(() => {
                        this.toggleShowForm('showCourse', false)
                    }).bind(this)}
                    className={'modalBody'}
                >
                    <CourseForm
                        editableId={this.state.editableId}
                        onSave={() => {
                        }}
                        onCancel={(() => {
                            this.toggleShowForm('showCourse', false)
                        }).bind(this)}
                    />
                </Modal>
            </div>
    }
}


const mapDispatchToProps = dispatch => bindActionCreators({
    addUsers,
    deleteCourse,
    addGroups,
    addLessons,
    addCourses
}, dispatch);

export default connect((state) => ({
    courses: filterCourses(state)
}), mapDispatchToProps)(Courses);

