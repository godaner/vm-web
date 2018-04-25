import React from "react";
import {Form, Icon, Input, Layout, Menu, message} from "antd";
import EditDialogTemple from "../base/edit_dialog_temple";

import "../base/events_dispatcher";

import {ajax} from "../base/vm_util";
//import "antd/dist/antd.css";
import "../../scss/index/login_dialog.scss";
const {Header, Content, Footer, Sider} = Layout;
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;


var LoginDialog = React.createClass({
    getInitialState: function () {
        return {
            width: 350,
            title: "登录",
            closable: false,
            loginUrl: "/admin/login",
            tipOfLogining: "正在登录",
        };
    },

    registEvents(){
        window.eventEmitEmitter.on('showLoginDialog', () => {

            this.showLoginDialog();

        });
    },
    componentDidMount(){

        this.registEvents();

    },
    showLoginDialog(){
        this.getAdminLoginDialog().showDialog();
    },
    getAdminLoginDialog() {
        return this.refs.login_dialog;
    },
    handleCancel () {
        c("handleCancel");
    },
    handleSubmit(values){
        const {loginUrl, tipOfLogining} = this.state;

        const hideMessage = message.loading(tipOfLogining, 0);


        const data = $.extend(values, getVisitInfoObj());
        ajax.post({
            url: loginUrl,
            data: data,
            success: function (result) {

                let admin = result.data.admin;

                localStorage.setItem(vm_config.key_of_access_token, admin.token);

                message.success(result.msg);

                this.getAdminLoginDialog().closeDialog();

                //callback
                window.EventsDispatcher.updateLoginAdminInfo(admin);

                //clear form
                this.getAdminLoginDialog().clearForm();

                window.EventsDispatcher.startPollingCheckOnlineAdmin();

                window.EventsDispatcher.connectOnlineStatusWS(admin.token);

            }.bind(this),
            failure: function (result) {
                message.error(result.msg);
            },
            complete: function () {
                hideMessage();
                this.getAdminLoginDialog().formLeaveLoading();
            }.bind(this)
        });
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

