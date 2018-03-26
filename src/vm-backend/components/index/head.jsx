import React from "react";
import {Form, Layout, Menu} from "antd";


import "antd/dist/antd.css";
import "../../scss/index/head.scss";
import "../base/events_dispatcher";
const FormItem = Form.Item;
const {Header, Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;

var Head = React.createClass({
    getInitialState: function () {
        return {};
    },
    checkOnlineAdmin(){
        window.EventsDispatcher.showLoginDialog();
    },

    componentDidMount(){
        this.checkOnlineAdmin();
    },
    render () {
        //set now page's props
        return (

            <div id="head">
                <div style={{fontSize: 25, color: '#22B9FF', float: 'left'}}>
                    VM后台管理系统
                </div>
                <div style={{color: '#22B9FF', float: 'right'}}>
                    {/*<span onClick={this.showLoginDialog}*/}
                    {/*style={{cursor: 'pointer'}}>*/}
                    {/*登录*/}
                    {/*</span>*/}
                </div>
            </div>
        );
    }
});

export default Head;   //将App组件导出
