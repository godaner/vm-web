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
        const collapsed = false;
        const collapsedWidth = 80;
        const siderWidth = 200;
        return {
            collapsed: collapsed,
            siderWidth: siderWidth,
            collapsedWidth: collapsedWidth,
            siderCurrtWidth: collapsed ? collapsedWidth : siderWidth
        };
    },
    onCollapse(collapsed, type){
        // console.log(collapsed);
        const {siderWidth, collapsedWidth} = this.state;
        this.setState({collapsed});
        let newSiderWidth = collapsedWidth;
        if (!collapsed) {
            newSiderWidth = siderWidth;
        }
        this.updateSiderCurrtWidth(newSiderWidth);
    },
    updateSiderCurrtWidth(siderCurrtWidth){
        this.setState({siderCurrtWidth});
    },
    render: function () {
        //set now page's props
        const {collapsed, siderCurrtWidth, collapsedWidth} = this.state;

        return (

            <HashRouter>
                <Layout
                >

                    {/*登录框*/}
                    <LoginDialog ref="login_dialog"/>
                    <Sider
                        collapsible
                        collapsed={collapsed}

                        onCollapse={this.onCollapse}
                        width={siderCurrtWidth}
                        collapsedWidth={collapsedWidth}
                        style={{overflow: 'auto', height: '100vh', zIndex:"999",position: 'fixed', left: 0}}
                    >


                        {/*nav*/}
                        <Nav/>
                    </Sider>
                    <Layout style={{marginLeft: siderCurrtWidth}}>
                        <Header style={{background: '#fff', padding: 0}}>
                            {/*head*/}
                            <Head/>
                        </Header>

                        <Content style={{margin: '0 16px', overflow: 'initial'}}>
                            <Breadcrumb style={{margin: '16px 0'}}>
                                <Breadcrumb.Item>User</Breadcrumb.Item>
                                <Breadcrumb.Item>Bill</Breadcrumb.Item>
                            </Breadcrumb>

                            <div style={{paddingLeft: 24, paddingRight: 24, background: '#fff'}}>
                                <Routes/>
                            </div>
                        </Content>
                        <Footer style={{textAlign: 'center'}}>
                            Vm backend ©2016 Created by Zhangke
                        </Footer>
                    </Layout>
                </Layout>

            </HashRouter>

        )
            ;
    }
});

export default Index;   //将App组件导出
