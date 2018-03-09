import ReactDOM from 'react-dom';
import React from 'react';
import {Layout, Modal, Menu, Breadcrumb, Form, Icon, Input, Button, Checkbox, Col} from 'antd';
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
            var {formItems} = formItem;
            var formItemsResV2 = formItems.map(function (formItem, j) {
                var {config, id, input, label, col, wrapperCol, labelCol} = formItem;
                if (!isUndefined(config)) {
                    if (isUndefined(config.validateFirst)) {
                        config.validateFirst = true;
                    }
                    //!!!!该处可能更改
                    var type = typeof config.initialValue;
                    if (!isUndefined(config.initialValue) && (type == "number" || type == "boolean")) {
                        config.initialValue = config.initialValue + "";//转化为字符串
                    }
                }else{
                    w("isUndefined(config)");
                    config = {};
                }
                if (isUndefined(id)) {
                    w("isUndefined(id)");
                    id = uuid();
                }

                if (isUndefined(col)) {
                    col = {};
                }
                if (isUndefined(col.span)) {
                    col.span = null;
                }
                if (isUndefined(wrapperCol)) {
                    wrapperCol = null;
                }
                if (isUndefined(labelCol)) {
                    labelCol = null;
                }
                if (isUndefined(label)) {
                    label = null;
                }


                return (
                    <Col span={col.span}
                         key={j}>
                        <FormItem
                            label={label}
                            wrapperCol={wrapperCol}
                            labelCol={labelCol}>
                            {
                                getFieldDecorator(
                                    id, config)(
                                    input
                                )
                            }
                        </FormItem>
                    </Col>
                );
            }.bind(this));


            return (
                <FormItem key={i}>
                    {
                        formItemsResV2
                    }
                </FormItem>
            );
        }.bind(this));
        return formItemsRes;
    },
    render: function () {

        //get props
        var {loading, formItems, formLayout} = this.props;

        var formItemsRes = this.generateFormItems(formItems);

        if (isUndefined(formLayout)) {
            formLayout = null;
        }
        return (
            <Form onSubmit={this.handleSubmit}
                // layout={formLayout}
                  id="edit-form"
                  ref="edit_form">
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

