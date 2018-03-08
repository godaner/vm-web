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
import {ajax, commons} from "../base/vm_util";


//create form
// const LoginForm = Form.create()(<LoginFormWillBeWrap/>);
const EditFormTempleWrapper = React.createClass({
    getInitialState: function () {
        return {};
    },
    componentDidMount(){

    },
    handleSubmit (e){

        const {handleSubmit} = this.props;

        e.preventDefault();
        this.props.form.validateFields(function (err, values) {
            if (!err) {
                if (!isUndefined(handleSubmit)) {
                    handleSubmit(values);
                }
            }
        }.bind(this));

    },
    generateFormItems(formItems){
        //get props.form
        const {getFieldDecorator} = this.props.form;

        var formItemsRes = formItems.map(function (formItem, i) {
            const {filed} = formItem;
            const {config, id, input} = filed;

            if (isUndefined(config.validateFirst)) {
                config.validateFirst = true;
            }
            //!!!!该处可能更改
            var type = typeof config.initialValue;
            if (!isUndefined(config.initialValue) && (type == "number" || type == "boolean")) {
                config.initialValue = config.initialValue + "";//转化为字符串
            }

            return (
                <FormItem key={i}>
                    {getFieldDecorator(
                        id, config)(
                        input
                    )}
                </FormItem>
            );
        }.bind(this));
        return formItemsRes;
    },
    render: function () {

        //get props
        const {loading, formItems} = this.props;

        var formItemsRes = this.generateFormItems(formItems);

        return (
            <Form onSubmit={this.handleSubmit} id="edit-form" ref="edit_form">
                {
                    formItemsRes
                }

                <FormItem>
                    <Button loading={loading} type="primary" htmlType="submit" id="edit-form-button">
                        提交
                    </Button>
                </FormItem>
            </Form>
        );
    }
});
const EditFormTemple = Form.create({})(EditFormTempleWrapper);
export default EditFormTemple;   //将App组件导出

