import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Button, Icon, message, Modal} from "antd";

import GroupsTable from '../../components/GroupsTable/GroupsTable'
import GroupForm from "../../components/GroupForm/GroupForm";

import style from './Groups.module.css';
import {addLearners} from "../../actions/learners";
import {addGroups, deleteGroup} from "../../actions/groups";
import { fetchGroups, fetchLearners, fetchDeleteGroup} from "../../api";
import {filterGroups} from "../../filters";

class Groups extends Component {

    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleDeleteByKeys = this.handleDeleteByKeys.bind(this);
        this.setRowKeys = this.setRowKeys.bind(this);
    }

    state = {
        showGroupForm: false,
        selectedRowKeys: [],
        editableId: ''
    };

    componentDidMount() {
        fetchLearners().then(({data}) => {
            this.props.addLearners(data)
        });
        fetchGroups().then(({data}) => {
            this.props.addGroups(data)
        });
    }

    toggleShowForm = (name, flag = false, id = '') => {
        this.setState({
            [name + 'Form']: flag,
            editableId: id
        })
    };

    handleDelete(id) {
        fetchDeleteGroup(id).then((status) => {
            if (status === 204) {
                this.props.deleteGroup({id});
                message.success('Группа успешно удалена!')
            } else {
                message.error('Ошибка удаления!')
            }
        })
    }

    handleDeleteByKeys() {
        let promises = this.state.selectedRowKeys.map((id) => fetchDeleteGroup(id));
        Promise.all(promises)
        .then((values) => {
                let flag = values.filter((status) => (status === 204)).length === values.length;
                if (flag) {
                    this.state.selectedRowKeys.forEach(id => this.props.deleteGroup({id}));
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
                    <Button onClick={() => this.toggleShowForm('showGroup', true)}>
                        <Icon type="plus-circle"/>
                        Добавить группу
                    </Button>
                </div>
                <GroupsTable
                    setRowKeys={this.setRowKeys}
                    showForm={((id) => {
                        this.toggleShowForm('showGroup', true, id)
                    }).bind(this)}
                    handleDelete={this.handleDelete}
                    data={this.props.groups}/>
                <Modal
                    visible={this.state.showGroupForm}
                    destroyOnClose={true}
                    width={"500px"}
                    height={"566px"}
                    onCancel={(() => {
                        this.toggleShowForm('showGroup', false)
                    }).bind(this)}
                    className={'modalBody'}
                >
                    <GroupForm
                        editableId={this.state.editableId}
                        onSave={() => {
                        }}
                        onCancel={(() => {
                            this.toggleShowForm('showGroup', false)
                        }).bind(this)}
                    />
                </Modal>
            </div>
    }
}


const mapDispatchToProps = dispatch => bindActionCreators({
    addLearners,
    deleteGroup,
    addGroups
}, dispatch);

export default connect((state) => ({
    groups: filterGroups(state)
}), mapDispatchToProps)(Groups);

