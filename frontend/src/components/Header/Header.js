import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import { Link } from 'react-router-dom'
import {Icon, Menu, Dropdown, Badge} from 'antd'
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

import {isMobile} from '../../utils/checkMobile'

import ring from '../../assets/icons/ring.png'
import user from '../../assets/img/user.png'
import {authUser} from "../../actions";

import './Header.css'

const MenuItem = Menu.Item;

class Header extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    state = {
        rotate: false
    };

    unAuthUser() {
        const { cookies } = this.props;
        cookies.remove('jwtToken');
        this.props.authUser(false)
    }

    menu = (
        <Menu className={"Header__rightWrapper__menu"}>
            <MenuItem key="0">
                <Link to={'/account'}><Icon type="user"/>Настройки аккаунта</Link>
            </MenuItem>
            <Menu.Divider/>
            <MenuItem onClick={this.unAuthUser.bind(this)} key="1">
                <span><Icon type="logout"/>Выход</span>
            </MenuItem>
        </Menu>
    );

    componentDidMount() {
        if (isMobile()) {
            this.setState({
                rotate: true
            })
        }
    }

    render() {
        let { rotate } = this.state;
        let { email = '', first_name = '', last_name = '', username = '' } = this.props.info;
        let name = '';
        if (first_name && last_name) {
            name = first_name + ' ' + last_name;
        } else if (email) {
            name = email;
        } else if (username) {
            name = username
        }
        return (
            <div className="Header">
                <Icon
                    onClick={() => {
                        this.setState({
                            rotate: !rotate
                        });
                        this.props.handleCollapse()
                    }}
                    style={rotate ? {
                        transform: 'rotate(180deg)'
                    } : {}}
                    type="menu-fold"
                    theme="outlined"/>
                <div className={"Header__rightWrapper"} style={rotate ? {} : {display: 'none'}}>
                    {/*<Badge className={"disabled"} count={5}>
                        <img src={ring} alt=""/>
                    </Badge>
                    <img className={"disabled"} src={calendar} alt=""/>*/}
                    <img style={{opacity: '0.8'}} src={user} alt=""/>
                    <Dropdown overlay={this.menu} trigger={['click']} placement="bottomRight">
                        <div className="ant-dropdown-link dropdown-label">
                            <img style={{opacity: '0.8'}} src={user} alt=""/>
                            <div>{name} <Icon type="down"/></div>
                        </div>
                    </Dropdown>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    info: state.user.info
});

const mapDispatchToProps = dispatch => bindActionCreators({
    authUser,
}, dispatch);

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(Header));
