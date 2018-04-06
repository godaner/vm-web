import ReactDOM from 'react-dom';
import React from 'react';
import {Layout, Menu, Breadcrumb, Icon, Affix} from 'antd';
const {Header, Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;
import HomePage from "../home/home_page";
import {Switch, BrowserRouter, HashRouter, Route, Link} from 'react-router-dom';
import "../base/events_dispatcher";
import Head from "./head";
import LoginDialog from "./login_dialog";
import Nav from "./nav";
import Routes from "./routes";
import {ajax, commons} from "../base/vm_util";

//import "antd/dist/antd.css";
import '../../scss/index/index.scss';

var Index = React.createClass({
    getInitialState: function () {
        return {
            collapsed: false
        };
    },
    onCollapse(collapsed){
        // console.log(collapsed);
        this.setState({collapsed});
    },

    render: function () {
        //set now page's props
        // const {collapsed} = this.state;


        return (
            <div id="index">

                {/*登录框*/}
                <LoginDialog ref="login_dialog"/>

                <HashRouter>

                    <Layout
                        style={{minHeight: '100vh'}}
                            >
                        <Sider
                            collapsible
                            collapsed={this.state.collapsed}
                            onCollapse={this.onCollapse}
                            style={{minHeight: '100vh',height:"100%"}}
                        >
                            {/*nav*/}
                            <Nav/>
                        </Sider>
                        <Layout >
                            <Header style={{background: '#fff', padding: 0}}>
                                {/*head*/}
                                <Head/>
                            </Header>

                            <Content style={{margin: '0 16px'}}>
                                <Breadcrumb style={{margin: '16px 0'}}>
                                    <Breadcrumb.Item>User</Breadcrumb.Item>
                                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                                </Breadcrumb>

                                <div style={{paddingLeft: 24, paddingRight: 24, background: '#fff', minHeight: 360}}>
                                    <Routes/>
                                </div>
                            </Content>
                            <Footer style={{textAlign: 'center'}}>
                                Vm backend ©2016 Created by Zhangke
                            </Footer>
                        </Layout>
                    </Layout>


                </HashRouter>
            </div>
        );
    }
});

export default Index;   //将App组件导出
