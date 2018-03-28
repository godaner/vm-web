import React from "react";
import {Form, Icon, Layout, Menu, message} from "antd";
import {withRouter} from "react-router-dom";

import {ajax} from "../base/vm_util";
import "antd/dist/antd.css";
import "../../scss/index/nav.scss";
import "../base/events_dispatcher";
const FormItem = Form.Item;
const {Header, Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;

var Nav = React.createClass({
    getInitialState: function () {
        var pathname = this.props.location.pathname;//!!!important
        return {
            selectedKeys: [pathname],
            openKeys: [],
            menuTheme: "dark",//dark,light
            menus: [],
            menuUrl: "/admin/menu/tree/byAdminId/",
            tipOfLoadMenus: "正在加载菜单"
        };
    },
    componentDidMount(){
        this.registEvents();

    },
    updateMenus(menus){
        if (isUndefined(menus)) {
            menus = [];
        }
        //open all submenu
        const openKeys = [];
        for (var i = 0; i < menus.length; i++) {
            openKeys.push(menus[i].keyProp);
        }
        openKeys.push("homeMenu");

        this.setState({menus});


        this.updateOpenKeys(openKeys);
    },
    backToHomePage(){
        message.destroy();//阻止显示msg
        if (this.props.location.pathname != "/") {//不在主页

            this.stepPage("/");//返回主页
        }
    },

    registEvents(){
        window.eventEmitter.on('backToHomePage', () => {//当用户直接在地址栏输入url时，回显nav
            this.backToHomePage();
        });
        window.eventEmitter.on('onRouteEnter', (args) => {//当用户直接在地址栏输入url时，回显nav
            setTimeout(() => {
                const {pathname} = args;
                this.updateSelectKeys([pathname]);
            }, 1);
        });
        window.eventEmitter.on('updateAdminMenuTree', (menuTree) => {//当用户直接在地址栏输入url时，回显nav
            this.updateMenus(menuTree);
        });
        window.eventEmitter.on('updateLoginAdminInfo', (admin) => {//当admin更新后，更具adminId获取新的menu列表，并且广播
            if (isUndefined(admin)) {
                const menu = [];

                this.updateMenus(menu);

                window.EventsDispatcher.updateAdminMenuTree(menu);

                // this.backToHomePage();//用户注销

            } else {
                const {menuUrl, tipOfLoadMenus} = this.state;
                const hiddenMassage = message.loading(tipOfLoadMenus, 0);
                ajax.get({
                    url: menuUrl + admin.id,
                    success: function (result) {

                        const menu = result.data.tree;

                        message.success(result.msg);

                        // this.updateMenus(menu);

                        window.EventsDispatcher.updateAdminMenuTree(menu);
                    }.bind(this),
                    failure: function (result) {
                        message.error(result.msg);
                    },
                    complete: function () {
                        hiddenMassage();
                    }.bind(this)
                });
            }


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
        this.stepPage(key);
    },
    stepPage(key){
        //单选
        var selectedKeys = [];
        selectedKeys.push(key);
        this.updateSelectKeys(selectedKeys);
        //跳转,将key作为路由的pathname
        this.props.history.push({//!!!important
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
        const {selectedKeys, openKeys, menuTheme, menus} = this.state;
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
                    {
                        menus.map(function (subMenu) {
                            return <SubMenu
                                key={subMenu.keyProp}
                                onTitleClick={this.onSubMenuClick}
                                title={<span><Icon type={subMenu.icon}/><span>{subMenu.menuName}</span></span>}
                            >
                                {
                                    subMenu.child == null ? <div></div> : subMenu.child.map(function (menu) {
                                        return <Menu.Item key={menu.keyProp}>
                                            {
                                                menu.menuName
                                            }
                                        </Menu.Item>;
                                    }.bind(this))
                                }
                            </SubMenu>
                        }.bind(this))
                    }

                    {/*<SubMenu*/}
                    {/*key="userMenu"*/}
                    {/*onTitleClick={this.onSubMenuClick}*/}
                    {/*title={<span><Icon type="user"/><span>用户管理</span></span>}*/}
                    {/*>*/}
                    {/*<Menu.Item key="/user">*/}
                    {/*用户管理*/}
                    {/*</Menu.Item>*/}
                    {/*<Menu.Item key="/user/login/logs">登录日志</Menu.Item>*/}

                    {/*</SubMenu>*/}
                    {/*<SubMenu*/}
                    {/*key="movieMenu"*/}
                    {/*onTitleClick={this.onSubMenuClick}*/}
                    {/*title={<span><Icon type="play-circle-o"/><span>电影管理</span></span>}*/}
                    {/*>*/}
                    {/*<Menu.Item key="/movie">电影管理</Menu.Item>*/}
                    {/*<Menu.Item key="/movie/filmmaker">电影人管理</Menu.Item>*/}
                    {/*<Menu.Item key="/movie/tagGroup">标签分组管理</Menu.Item>*/}
                    {/*</SubMenu>*/}
                    {/*<SubMenu*/}
                    {/*key="adminMenu"*/}
                    {/*onTitleClick={this.onSubMenuClick}*/}
                    {/*title={<span><Icon type="lock"/><span>管理员管理</span></span>}*/}
                    {/*>*/}
                    {/*<Menu.Item key="/admin">管理员管理</Menu.Item>*/}
                    {/*<Menu.Item key="/admin/login/logs">登录记录</Menu.Item>*/}
                    {/*</SubMenu>*/}


                </Menu>
            </div>

        );
    }
});

export default withRouter(Nav);   //将App组件导出
