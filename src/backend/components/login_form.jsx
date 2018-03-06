import ReactDOM from 'react-dom';
import React from 'react';
import {Layout, Modal, Menu, Breadcrumb, Form, Icon, Input, Button, Checkbox} from 'antd';
const {Header, Content, Footer, Sider} = Layout;
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
import {Switch, BrowserRouter, HashRouter, Route} from 'react-router-dom';

import "./events_dispatcher";


import "antd/dist/antd.css";
import '../scss/login_form.scss';


var LoginFormWillBeWrap = React.createClass({
    getInitialState: function () {
        const beforeClickLoginBtnText = "登录";
        return {
            loginBtnLoading: false,
            nowLoginBtnText:beforeClickLoginBtnText,
            afterClickLoginBtnText:"登陆中",
            beforeClickLoginBtnText:beforeClickLoginBtnText
        };
    },
    updateLoginBtnLoading(flag){
        var state = this.state;
        state.loginBtnLoading = flag;
        this.setState(state);
    },
    updateNowLoginBtnText(text){
        var state = this.state;
        state.nowLoginBtnText = text;
        this.setState(state);
    },
    handleSubmit (e){
        this.updateLoginBtnLoading(true);
        this.updateNowLoginBtnText(this.state.afterClickLoginBtnText);
        setInterval(function () {
            this.updateLoginBtnLoading(false);
            this.updateNowLoginBtnText(this.state.beforeClickLoginBtnText);
        }.bind(this),3000);
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });


    },
    render: function () {
        const {getFieldDecorator} = this.props.form;

        const {loginBtnLoading,nowLoginBtnText} = this.state;
        return (
            <Form onSubmit={this.handleSubmit} id="login-form">
                <FormItem>
                    {getFieldDecorator('username', {
                        rules: [{required: true, message: '请输入用户名!'}],
                    })(
                        <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                               placeholder="用户名"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: '请输入密码!'}],
                    })(
                        <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                               placeholder="密码"/>
                    )}
                </FormItem>

                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                    <a id="login-form-forgot" href="">忘记密码</a>
                    <Button loading={loginBtnLoading} type="primary" htmlType="submit" id="login-form-button">
                        {nowLoginBtnText}
                    </Button>
                    {/*Or <a href="">现在注册!</a>*/}
                </FormItem>
            </Form>
        );
    }
})

//create form
// const LoginForm = Form.create()(<LoginFormWillBeWrap/>);
const LoginForm = Form.create()(LoginFormWillBeWrap)
export default LoginForm;   //将App组件导出

