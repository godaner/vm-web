import ReactDOM from 'react-dom';
import React from 'react';
import {Layout, Menu, Breadcrumb, Icon, Form, Input, Button, Checkbox} from 'antd';
const FormItem = Form.Item;
const {Header, Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;
import {Switch, BrowserRouter, HashRouter, Route} from 'react-router-dom';


import "antd/dist/antd.css";
import '../scss/nav.scss';
import "./events_dispatcher";

var Nav = React.createClass({
    getInitialState: function () {
        return {
            selectedKeys:"6",
            openKeys:"indexMenu",
            menuTheme:"dark"
        };
    },

    render: function () {
        //set now page's props
        const {selectedKeys,openKeys,menuTheme} = this.state;
        return (
            <Menu theme={menuTheme}
                  defaultOpenKeys={[openKeys]}
                  defaultSelectedKeys={[selectedKeys]}
                  mode="inline">
                <SubMenu
                    key="indexMenu"
                    title={<span><Icon type="home"/><span>主页</span></span>}
                >
                    <Menu.Item key="6">主页</Menu.Item>
                </SubMenu>
                <SubMenu
                    key="userMenu"
                    title={<span><Icon type="user"/><span>用户管理</span></span>}
                >
                    <Menu.Item key="1">信息管理</Menu.Item>
                    <Menu.Item key="2">登录记录</Menu.Item>
                    {/*<Menu.Item key="5">Alex</Menu.Item>*/}
                </SubMenu>
                <SubMenu
                    key="adminMenu"
                    title={<span><Icon type="lock"/><span>管理员管理</span></span>}
                >
                    <Menu.Item key="3">信息管理</Menu.Item>
                    <Menu.Item key="4">登录记录</Menu.Item>
                </SubMenu>
                <SubMenu
                    key="movieMenu"
                    title={<span><Icon type="play-circle-o"/><span>电影管理</span></span>}
                >
                    <Menu.Item key="5">信息管理</Menu.Item>
                </SubMenu>
                {/*<Menu.Item key="2">*/}
                {/*<Icon type="desktop"/>*/}
                {/*<span>视频管理</span>*/}
                {/*</Menu.Item>*/}


            </Menu>

        );
    }
});

export default Nav;   //将App组件导出
