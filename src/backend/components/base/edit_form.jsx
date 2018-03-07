import ReactDOM from 'react-dom';
import React from 'react';
import {Layout, Modal, Menu, Breadcrumb, Form, Icon, Input, Button, Checkbox} from 'antd';
const {Header, Content, Footer, Sider} = Layout;
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
import {Switch, BrowserRouter, HashRouter, Route} from 'react-router-dom';

import "./events_dispatcher";


import "antd/dist/antd.css";
import '../../scss/base/edit_form.scss';
import {ajax,commons} from "../base/vm_util";


var EditFormWillBeWrap = React.createClass({
    getInitialState: function () {
        const beforeClickBtnText = "提交";
        return {
            btnLoading: false,
            nowBtnText:beforeClickBtnText,
            afterClickBtnText:"提交中",
            beforeClickBtnText:beforeClickBtnText
        };
    },
    updateBtnLoading(flag){
        var state = this.state;
        state.btnLoading = flag;
        this.setState(state);
    },
    updateNowBtnText(text){
        var state = this.state;
        state.nowBtnText = text;
        this.setState(state);
    },
    handleSubmit (e){
        this.updateBtnLoading(true);
        this.updateNowBtnText(this.state.afterClickBtnText);
        setInterval(function () {
            this.updateBtnLoading(false);
            this.updateNowBtnText(this.state.beforeClickBtnText);
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

        const {btnLoading,nowBtnText} = this.state;
        return (
            <Form onSubmit={this.handleSubmit} id="edit_form">
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
                    <Button loading={btnLoading} type="primary" htmlType="submit" id="edit-form-button">
                        {nowBtnText}
                    </Button>
                    {/*Or <a href="">现在注册!</a>*/}
                </FormItem>
            </Form>
        );
    }
})

//create form
// const LoginForm = Form.create()(<LoginFormWillBeWrap/>);
const EditForm = Form.create()(EditFormWillBeWrap)
export default EditForm;   //将App组件导出

