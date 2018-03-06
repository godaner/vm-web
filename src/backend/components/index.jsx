import ReactDOM from 'react-dom';
import React from 'react';
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
const {Header, Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;
import HomePage from "./home_page";
import {Switch, BrowserRouter, HashRouter, Route,Link} from 'react-router-dom';
import "./events_dispatcher";
import Head from "./head";
import LoginDialog from "./login_dialog";
import Nav from "./nav";
import Routes from "./routes";


import "antd/dist/antd.css";
import '../scss/index.scss';

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
        const {collapsed} = this.state;


        return (
            <div id="index">
                <HashRouter>
                    <Layout style={{minHeight: '100vh'}}>
                        <Sider
                            collapsible
                            collapsed={collapsed}
                            onCollapse={this.onCollapse}
                        >

                            <div className="logo"/>
                            <Nav/>
                        </Sider>
                        <Layout>
                            <Header style={{background: '#fff'}}>
                                {/*head*/}
                                <Head/>
                            </Header>
                            <Content style={{margin: '0 16px'}}>
                                {/*<Breadcrumb style={{margin: '16px 0'}}*/}
                                            {/*itemRender={itemRender} routes={routes}>*/}
                                    {/*<Breadcrumb.Item>User</Breadcrumb.Item>*/}
                                    {/*<Breadcrumb.Item>Bill</Breadcrumb.Item>*/}
                                {/*</Breadcrumb>*/}
                                <Routes/>

                            </Content>
                            <Footer style={{textAlign: 'center'}}>
                                Vm backend ©2016 Created by Zhangke
                            </Footer>
                        </Layout>
                    </Layout>

                </HashRouter>
                <LoginDialog ref="login_dialog"/>
            </div>
        );
    }
});

export default Index;   //将App组件导出
