import ReactDOM from 'react-dom';
import React from 'react';
import {Layout, Menu, Breadcrumb, Icon, Form, Input, Button, Checkbox} from 'antd';
const FormItem = Form.Item;
const {Header, Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;
import {Switch, BrowserRouter, HashRouter, Route, Link, withRouter} from 'react-router-dom';

import "antd/dist/antd.css";
import '../../scss/index/nav.scss';
import "../base/events_dispatcher";
import {ajax, commons} from "../base/vm_util";

var Nav = React.createClass({
    getInitialState: function () {
        var pathname = this.props.location.pathname;
        return {
            selectedKeys: [pathname],
            openKeys: ["homeMenu", "userMenu", "adminMenu", "movieMenu"],
            menuTheme: "dark"//dark,light
        };
    },
    componentDidMount(){
        this.registEvents();
    },
    registEvents(){
        window.eventEmitter.on('onRouteEnter', (args) => {//当地址栏url变化时，回显nav
            setTimeout(function () {
                var pathname = args.pathname;
                this.updateSelectKeys([pathname]);
            }.bind(this), 1);
        });
    },
    updateSelectKeys(selectedKeys){
        var state = this.state;
        state.selectedKeys = selectedKeys;
        this.setState(state);
    },
    updateOpenKeys(openKeys){
        var state = this.state;
        state.openKeys = openKeys;
        this.setState(state);
    },
    onMenuItmClick({item, key, keyPath}){
        //单选
        var selectedKeys = [];
        selectedKeys.push(key);
        this.updateSelectKeys(selectedKeys);
        //跳转,将key作为路由的pathname
        this.props.history.push({
            pathname: key,
            query: {
                param: "66"//demo
            }
        });
    },
    onSubMenuClick({key, domEvent}){
        var openKeys = this.state.openKeys;
        if (openKeys.contains(key)) {
            openKeys.remove(key, true);
        } else {
            openKeys.push(key);
        }
        this.updateOpenKeys(openKeys);
    },
    render: function () {
        //set now page's props
        const {selectedKeys, openKeys, menuTheme} = this.state;
        return (
            <div>
                <div id="logo">
                    <span id="logo_v">V</span><span id="logo_m">M</span>
                </div>
                <Menu theme={menuTheme}
                      openKeys={openKeys}
                      selectedKeys={selectedKeys}
                      onClick={this.onMenuItmClick}
                      mode="inline">
                    <SubMenu
                        key="homeMenu"
                        onTitleClick={this.onSubMenuClick}
                        title={<span><Icon type="home"/><span>主页</span></span>}
                    >
                        <Menu.Item key="/">
                            主页
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="userMenu"
                        onTitleClick={this.onSubMenuClick}
                        title={<span><Icon type="user"/><span>用户管理</span></span>}
                    >
                        <Menu.Item key="/user">
                            用户管理
                        </Menu.Item>
                        <Menu.Item key="/user/login/logs">登录日志</Menu.Item>

                    </SubMenu>
                    <SubMenu
                        key="movieMenu"
                        onTitleClick={this.onSubMenuClick}
                        title={<span><Icon type="play-circle-o"/><span>电影管理</span></span>}
                    >
                        <Menu.Item key="/movie">电影管理</Menu.Item>
                        <Menu.Item key="/movie/filmmaker">电影人管理</Menu.Item>
                        <Menu.Item key="/movie/tagGroup">标签分组管理</Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="adminMenu"
                        onTitleClick={this.onSubMenuClick}
                        title={<span><Icon type="lock"/><span>管理员管理</span></span>}
                    >
                        <Menu.Item key="3">信息管理</Menu.Item>
                        <Menu.Item key="4">登录记录</Menu.Item>
                    </SubMenu>

                    {/*<Menu.Item key="2">*/}
                    {/*<Icon type="desktop"/>*/}
                    {/*<span>视频管理</span>*/}
                    {/*</Menu.Item>*/}


                </Menu>
            </div>

        );
    }
});

export default withRouter(Nav);   //将App组件导出
