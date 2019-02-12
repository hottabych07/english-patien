import React, {Component} from 'react';

import './Account.css';
import AccountForm from "../../components/AccountForm/AccountForm";

class AccountPage extends Component {
    render() {
        return <div className={"AccountPage"}>
                <AccountForm/>
            </div>
    }
}

export default AccountPage;
