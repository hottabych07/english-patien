import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Button, Icon, message, Modal} from "antd";

import UsersTable from '../../components/UsersTable/UsersTable'
import UserForm from "../../components/UserForm/UserForm";

import style from './Managers.module.css';
import {addUsers, updateUser, deleteUser} from "../../actions/users";
import {fetchUsers, fetchDeleteUser, fetchUpdateUser} from "../../api";
import {filterManagers} from "../../filters";

class Managers extends Component {

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

    handleDelete(record) {
        delete record.key;
        record.is_active = !record.is_active;
        fetchUpdateUser(record).then((data) => {
            this.props.updateUser(data);
        })
    }

    handleDeleteByKeys() {
        let promises = this.state.selectedRowKeys.map((id) => fetchDeleteUser(id));
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
                    <Button onClick={() => this.toggleShowForm('showUser', true)}>
                        <Icon type="plus-circle"/>
                        Добавить менеджера
                    </Button>
                </div>
                <UsersTable
                    setRowKeys={this.setRowKeys}
                    showForm={((id) => {
                        this.toggleShowForm('showUser', true, id)
                    }).bind(this)}
                    handleDelete={this.handleDelete}
                    data={this.props.managers}/>
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
                    users={this.props.managersObj}
                    text={'менеджера'}
                    textRole={'Менеджер'}
                    role={'manager'}
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
    addUsers,
    deleteUser,
    updateUser
}, dispatch);

export default connect((state) => ({
    managers: filterManagers(state),
    managersObj: filterManagers(state, true)
}), mapDispatchToProps)(Managers);

