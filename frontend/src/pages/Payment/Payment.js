import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Button, Icon, message, Modal} from "antd";

import PaymentsTable from '../../components/PaymentTable/PaymentsTable'
import PaymentForm from "../../components/PaymentForm/PaymentForm";

import style from './Peyments.module.css';
import {addLearners} from "../../actions/learners";
import {addPayments, deletePayment} from "../../actions/payments";
import { fetchPayments, fetchLearners, fetchDeletePayment} from "../../api";
import {filterPayments} from "../../filters";

class Payment extends Component {

    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleDeleteByKeys = this.handleDeleteByKeys.bind(this);
        this.setRowKeys = this.setRowKeys.bind(this);
    }

    state = {
        showPaymentForm: false,
        selectedRowKeys: [],
        editableId: ''
    };

    componentDidMount() {
        fetchLearners().then(({data}) => {
            this.props.addLearners(data);
            fetchPayments().then(({data}) => {
                this.props.addPayments(data)
            });
        });

    }

    toggleShowForm = (name, flag = false, id = '') => {
        this.setState({
            [name + 'Form']: flag,
            editableId: id
        })
    };

    handleDelete(id) {
        fetchDeletePayment(id).then((status) => {
            if (status === 204) {
                this.props.deletePayment({id});
                message.success('Оплата успешно удалена!')
            } else {
                message.error('Ошибка удаления!')
            }
        })
    }

    handleDeleteByKeys() {
        let promises = this.state.selectedRowKeys.map((id) => fetchDeletePayment(id));
        Promise.all(promises)
        .then((values) => {
                let flag = values.filter((status) => (status === 204)).length === values.length;
                if (flag) {
                    this.state.selectedRowKeys.forEach(id => this.props.deletePayment({id}));
                    message.success('Выбранная оплата успешно удалена!')
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
                    <Button className={'disabled'} onClick={() => this.toggleShowForm('showPayment', true)}>
                        <Icon type="plus-circle"/>
                        Добавить оплату
                    </Button>
                </div>
                <PaymentsTable
                    setRowKeys={this.setRowKeys}
                    showForm={((id) => {
                        this.toggleShowForm('showPayment', true, id)
                    }).bind(this)}
                    handleDelete={this.handleDelete}
                    data={this.props.payments}/>
                <Modal
                    visible={this.state.showPaymentForm}
                    destroyOnClose={true}
                    width={"500px"}
                    height={"566px"}
                    onCancel={(() => {
                        this.toggleShowForm('showPayment', false)
                    }).bind(this)}
                    className={'modalBody'}
                >
                    <PaymentForm
                        editableId={this.state.editableId}
                        onSave={() => {
                        }}
                        onCancel={(() => {
                            this.toggleShowForm('showPayment', false)
                        }).bind(this)}
                    />
                </Modal>
            </div>
    }
}


const mapDispatchToProps = dispatch => bindActionCreators({
    addLearners,
    deletePayment,
    addPayments
}, dispatch);

export default connect((state) => ({
    payments: filterPayments(state)
}), mapDispatchToProps)(Payment);

