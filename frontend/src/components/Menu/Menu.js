import React, {Component} from 'react'
import {NavLink, withRouter} from 'react-router-dom'
import {Menu} from 'antd'

import './Menu.css'
import logo from '../../assets/img/logo.png'

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

const menuItems = [
    {
        name: 'Расписание',
        icon: 'icon-calendar',
        path: '/',
    },
    {
        name: 'Группы',
        icon: 'icon-multiple-users-silhouette',
        path: '/groups',
    },
    {
        name: 'Пользователи',
        icon: 'icon-man-user',
        subItems: [
            {
                name: 'Преподаватели',
                icon: '',
                path: '/teachers',
            },
            {
                name: 'Ученики',
                icon: '',
                path: '/learners',
            },
            {
                name: 'Менеджеры',
                icon: '',
                path: '/managers',
            },
        ],
        path: '',
    },
    {
        name: 'Курсы',
        icon: 'icon-study',
        path: '/courses',
    },
    {
        name: 'Оплата',
        icon: 'icon-credit-cards-payment',
        path: '/payment',
    },
];

class MainMenu extends Component {

    render() {
        let { handleCollapse } = this.props;
        if (window.innerWidth > 700) {
           handleCollapse = () => null
        }

        return (
            <div className="Menu">
                <NavLink to={'/'}>
                    <img src={logo} alt="English Patient"/>
                </NavLink>
                <Menu theme="dark" mode={'inline'}>
                    {
                        menuItems.map(({name, icon, path, subItems = {}, disabled = false}, i) => {
                            if (Array.isArray(subItems)) {
                                return <SubMenu
                                    key={i}
                                    title={<div><span className={icon}/>{name}</div>}>
                                    {subItems.map((subItem, j) => <MenuItem key={j} className={subItem.disabled ? 'disabled' : ''}>
                                        <NavLink className={disabled ? 'disabled' : ''}
                                            activeClassName="activeMenuItem"
                                            exact
                                            onClick={() => handleCollapse()}
                                            to={subItem.path}>
                                            {subItem.name}
                                        </NavLink>
                                    </MenuItem>)}
                                </SubMenu>
                            } else {
                                return <MenuItem key={i} className={disabled ? 'disabled' : ''}>
                                    <NavLink
                                        exact
                                        activeClassName="activeMenuItem"
                                        onClick={() => handleCollapse()}
                                        to={path}>
                                        <span className={icon}/>{name}
                                    </NavLink>
                                </MenuItem>
                            }
                        })
                    }
                </Menu>
            </div>
        );
    }
}

export default withRouter(MainMenu);
