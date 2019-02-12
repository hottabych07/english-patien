import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Table, Icon, Menu, Dropdown, Popconfirm} from "antd";

import style from './UsersTable.module.css';

class UsersTable extends Component {

    componentDidMount() {
    }

    /*
    *
    * first_name,
                last_name,
                username,
                id,
                email,
                role*/

    columns = [{
        title: 'ИМЯ',
        dataIndex: 'name',
        key: 'name',
    }, {
        title: 'ТЕЛЕФОН',
        dataIndex: 'phone',
        key: 'phone'
    }, {
        title: 'ПОЧТА',
        dataIndex: 'email',
        key: 'email'
    }, {
        title: '',
        dataIndex: 'action',
        key: 'action',
        align: 'center',
        width: '80px',
        render: (text, record) => {
            console.log('RECORD', record);
            return <Dropdown
                placement="bottomRight"
                overlay={<Menu className={style.menu}>
                    <Menu.Item key="0" onClick={() => this.props.showForm(record.id)}>
                        <div>Изменить</div>
                    </Menu.Item>
                    <Menu.Item key="1" className={'disabled'}>
                        <Popconfirm
                            title="Подвердить удаление?"
                            onConfirm={() => this.props.handleDelete(record)}
                            okText={'Да'}
                            cancelText={'Нет'}>

                            <div>{!record.is_active ? 'Деактивировать' : 'Активировать'}</div>
                        </Popconfirm>
                    </Menu.Item>
                </Menu>}
                className={style.action}>
                <Icon type="ellipsis"/>
            </Dropdown>
        }
    }];

    render() {
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, selectedRowKeys.length, 'selectedRows: ', selectedRows);
                this.props.setRowKeys(selectedRowKeys);
            },
            onSelect: (record, selected, selectedRows) => {
                console.log(record, selected, selectedRows);
            },
            onSelectAll: (selected, selectedRows, changeRows) => {
                console.log(selected, selectedRows, changeRows);
            },
        };

        return <Table
            rowSelection={rowSelection}
            className={style.table}
            columns={this.columns}
            dataSource={this.props.data}/>
    }
}


const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(null, mapDispatchToProps)(UsersTable);

