import React from "react";
import {Form, Icon, Input, Layout, Menu} from "antd";
import EditDialogTemple from "../base/edit_dialog_temple";

import "../base/events_dispatcher";


import "antd/dist/antd.css";
import "../../scss/index/login_dialog.scss";
const {Header, Content, Footer, Sider} = Layout;
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;


var LoginDialog = React.createClass({
    getInitialState: function () {
        return {
            width: 350,
            title: "登录",
            closable: false
        };
    },
    updateStateOnLoginSuccess(onLoginSuccess){
        var state = this.state;
        state.onLoginSuccess = onLoginSuccess;
        this.setState(state);
    },
    updateStateOnLoginFailure(onLoginFailure){

        var state = this.state;
        state.onLoginFailure = onLoginFailure;
        this.setState(state);
    },
    registEvents(){
        window.event.on('showLoginDialog', (args) => {

            this.showLoginDialog();

            if (!isUndefined(args)) {

                this.updateStateOnLoginSuccess(args.onLoginSuccess);

                this.updateStateOnLoginFailure(args.onLoginFailure);
            }

        });
    },
    componentDidMount(){

        this.registEvents();

    },
    showLoginDialog(){
        this.getUserAddDialog().showDialog();
    },
    getUserAddDialog() {
        return this.refs.login_dialog;
    },
    handleCancel () {
        c("handleCancel");
    },
    handleSubmit(val){

        c("handleSubmit");
        c(val);
    },
    render: function () {
        var formRows = [
            {

                cols: [{
                    col: {span: 24},
                    label: "用户名",
                    id: "username",
                    config: {
                        rules: [{required: true, whitespace: true, message: '请输入用户名!'}],
                    },
                    input: <Input autoComplete="off"
                                  name="username"
                                  prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                  placeholder="请输入您的用户名"/>
                }]
            }
            ,
            {
                cols: [
                    {
                        col: {span: 24},
                        label: "密码",
                        id: "password",
                        config: {
                            rules: [{required: true, whitespace: true, message: '请输入密码!'}],
                        },
                        input: <Input name="password"
                                      type="password"
                                      autoComplete="off"
                                      prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                      placeholder="请输入您的密码"/>
                    }]
            }



        ];

        //get state
        const {width, title, closable} = this.state;
        return (

            <EditDialogTemple
                ref="login_dialog"
                title={title}
                width={width}
                closable={closable}
                formRows={formRows}
                handleSubmit={this.handleSubmit}
                handleCancel={this.handleCancel}/>
        );
    }
})
export default LoginDialog;   //将App组件导出

