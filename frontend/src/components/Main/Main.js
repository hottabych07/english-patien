import React, {Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {Redirect} from 'react-router-dom';
import {Layout, Spin} from 'antd'

import {isMobile} from '../../utils/checkMobile'
import {getCookie} from '../../utils/cookies';
import MainHeader from '../Header/Header'
import Menu from '../Menu/Menu'

import './Main.css';
import {authUser, setInfo} from "../../actions";
import {fetchVerifyToken, fetchUser} from "../../api";
import PageHeader from "../PageHeader/PageHeader";

const {Header, Footer, Sider, Content} = Layout;

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            collapseMenu: false,
            collapseMenuStyles: false
        };

        if (this.props.auth) {
            this.state.loading = false;
        }

        if (isMobile()) {
            this.state.collapseMenu = true;
            this.handleCollapseMenu = () => this.setState({
                collapseMenuStyles: !this.state.collapseMenuStyles,
                collapseMenu: !this.state.collapseMenu
            })
        }
    }

    componentDidMount() {
        this.setState({
            test: false,
        });
        if (getCookie('jwtToken')) {
            fetchVerifyToken()
                .then(resp => {
                    if (resp.data.non_field_errors || !resp.data.token) {
                        this.props.authUser();
                        this.setState({
                            loading: false,
                        })
                    } else {
                        fetchUser()
                            .then(({data}) => {
                                this.props.setInfo(data);
                                this.props.authUser(true);
                                this.setState({
                                    loading: false,
                                })
                            });
                    }

                })
        } else {
            this.props.authUser();
            this.setState({
                loading: false,
            })
        }
    }

    handleCollapseMenu = () => this.setState({collapseMenu: !this.state.collapseMenu});

    render() {
        let collapseMenuClass = '';
        let collapseRevertMenuClass = '';

        if (this.state.collapseMenuStyles) {
            collapseMenuClass = 'collapsedItem';
            collapseRevertMenuClass = 'collapsedRevertItem';
        }

        const { RootComponent, title } = this.props;

        console.log('AUTH', this.props.auth);

        return (
            !this.state.loading ? (this.props.auth ?
                <div className={`Main` + (this.state.collapseMenu ? ` menuCollapsed` : '')}>
                    <Layout>
                        <Sider><Menu handleCollapse={this.handleCollapseMenu.bind(this)}/></Sider>
                        <Layout>
                            <Header className={collapseRevertMenuClass}>
                                <MainHeader handleCollapse={this.handleCollapseMenu.bind(this)}/>
                            </Header>
                            <Content className={collapseMenuClass}>
                                <div className={"page"}>
                                    {title ? <PageHeader pageName={title}/> : ''}
                                    <RootComponent />
                                </div>
                            </Content>
                            <Footer className={`${collapseMenuClass} PageFooter`}>English Patient Language ©
                                2018</Footer>
                        </Layout>
                    </Layout>
                </div> :
                <Redirect to={'/signin'}/>) : <Spin size="large"/>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.user.auth
});

const mapDispatchToProps = dispatch => bindActionCreators({
    authUser,
    setInfo
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);
