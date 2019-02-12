import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Button, Icon, message, Modal} from "antd";

import UsersTable from '../../components/UsersTable/UsersTable'
import UserForm from "../../components/UserForm/UserForm";

import style from './Teachers.module.css';
import {addUsers} from "../../actions/users";
import {fetchUsers} from "../../api";
import {filterTeachers} from "../../filters";

class Teachers extends Component {

    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleDeleteByKeys = this.handleDeleteByKeys.bind(this);
        this.setRowKeys = this.setRowKeys.bind(this);
    }

    state = {
        showUserForm: false,
        selectedRowKeys: [],
        editableId: ''
    };

    componentDidMount() {
        fetchUsers().then(({data}) => {
            this.props.addUsers(data)
        });
    }

    toggleShowForm = (name, flag = false, id = '') => {
        this.setState({
            [name + 'Form']: flag,
            editableId: id
        })
    };

    handleDelete(id) {
        /*fetchDeleteCourse(id).then((status) => {
            if (status === 204) {
                this.props.deleteCourse({id});
                message.success('Курс успешно удален!')
            } else {
                message.error('Ошибка удаления!')
            }
        })*/
    }

    handleDeleteByKeys() {
        /*let promises = this.state.selectedRowKeys.map((id) => fetchDeleteCourse(id));
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
        })*/
    }

    setRowKeys(keys) {
        this.setState({
            selectedRowKeys: keys
        })
    }

    render() {
        return <div className={style.courses}>
                <div className={style.buttonPanel}>
                    <Button onClick={() => this.toggleShowForm('showUser', true)}>
                        <Icon type="plus-circle"/>
                        Добавить преподавателя
                    </Button>
                </div>
                <UsersTable
                    setRowKeys={this.setRowKeys}
                    showForm={((id) => {
                        this.toggleShowForm('showUser', true, id)
                    }).bind(this)}
                    handleDelete={this.handleDelete}
                    data={this.props.teachers}/>
            <Modal
                visible={this.state.showUserForm}
                destroyOnClose={true}
                width={"500px"}
                height={"566px"}
                onCancel={(() => {
                    this.toggleShowForm('showUser', false)
                }).bind(this)}
                className={'modalBody'}
            >
                <UserForm
                    textRole={'Преподаватель'}
                    users={this.props.teachersObj}
                    text={'преподавателя'}
                    role={'teacher'}
                    editableId={this.state.editableId}
                    onSave={() => {
                    }}
                    onCancel={(() => {
                        this.toggleShowForm('showUser', false)
                    }).bind(this)}
                />
            </Modal>
        </div>

    }
}


const mapDispatchToProps = dispatch => bindActionCreators({
    addUsers
}, dispatch);

export default connect((state) => ({
    teachers: filterTeachers(state),
    teachersObj: filterTeachers(state, true)
}), mapDispatchToProps)(Teachers);

