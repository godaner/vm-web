import ReactDOM from 'react-dom';
import React from 'react';
import {Layout, Modal, Menu, Breadcrumb, Form, Icon, Input, Button, Checkbox} from 'antd';
const {Header, Content, Footer, Sider} = Layout;
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
import {Switch, BrowserRouter, HashRouter, Route} from 'react-router-dom';
import LoginForm from "./login_form";

import "./events_dispatcher";


import "antd/dist/antd.css";
import '../scss/login_dialog.scss';



var LoginDialog = React.createClass({
    getInitialState: function () {
        return {
            visible: false,
            modelWidth:"350px",
            modelHeight:"300px",
            onLoginSuccess: undefined,
            onLoginFailure: undefined
        };
    },
    updateStateVisible(visible){
        var state = this.state;
        state.visible = visible;
        this.setState(state);
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
        this.updateStateVisible(true);
    },
    handleCancel () {
        this.updateStateVisible(false);
        c("handleCancel");
    },
    getLoginForm(){
        return this.refs.login_form;
    },
    render: function () {


        //get state
        const {visible, loading,modelWidth,modelHeight} = this.state;
        return (
            <div id="login_dialog">
                <Modal
                    className='extra'
                    visible={visible}
                    title="登录"
                    onCancel={this.handleCancel}
                    width={modelWidth}
                    height={modelHeight}
                    footer={[

                    ]}
                >

                    <div>
                        <LoginForm ref="login_form"/>
                    </div>
                </Modal>
            </div>
        );
    }
})
export default LoginDialog;   //将App组件导出

