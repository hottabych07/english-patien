import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Button, Icon, message, Modal} from "antd";

import UsersTable from '../../components/UsersTable/UsersTable'
import LearnerForm from "../../components/LearnerForm/LearnerForm";

import style from './Learners.module.css';
import {addLearners} from "../../actions/learners";
import {addGroups} from "../../actions/groups";
import {fetchGroups, fetchLearners, fetchDeleteLearner} from "../../api";
import {filterLearners} from "../../filters";

class Learners extends Component {

    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleDeleteByKeys = this.handleDeleteByKeys.bind(this);
        this.setRowKeys = this.setRowKeys.bind(this);
    }

    state = {
        showLearnerForm: false,
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
        fetchDeleteLearner(id).then((status) => {
            if (status === 204) {
                this.props.deleteCourse({id});
                message.success('Курс успешно удален!')
            } else {
                message.error('Ошибка удаления!')
            }
        })
    }

    handleDeleteByKeys() {
        let promises = this.state.selectedRowKeys.map((id) => fetchDeleteLearner(id));
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
                    <Button onClick={() => this.toggleShowForm('showLearner', true)}>
                        <Icon type="plus-circle"/>
                        Добавить ученика
                    </Button>
                </div>
                <UsersTable
                    setRowKeys={this.setRowKeys}
                    showForm={((id) => {
                        this.toggleShowForm('showLearner', true, id)
                    }).bind(this)}
                    data={this.props.learners}/>
            <Modal
                visible={this.state.showLearnerForm}
                destroyOnClose={true}
                width={"500px"}
                height={"566px"}
                onCancel={(() => {
                    this.toggleShowForm('showLearner', false)
                }).bind(this)}
                className={'modalBody'}
            >
                <LearnerForm
                    users={this.props.learnersObj}
                    text={'ученика'}
                    editableId={this.state.editableId}
                    onSave={() => {
                    }}
                    onCancel={(() => {
                        this.toggleShowForm('showLearner', false)
                    }).bind(this)}
                />
            </Modal>
        </div>

    }
}


const mapDispatchToProps = dispatch => bindActionCreators({
    addLearners,
    addGroups
}, dispatch);

export default connect((state) => ({
    learners: filterLearners(state),
    learnersObj: filterLearners(state, true)
}), mapDispatchToProps)(Learners);

