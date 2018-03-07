import ReactDOM from 'react-dom';
import React from 'react';
import {Layout, Modal, Menu, Breadcrumb, Form, Icon, Input, Button, Checkbox} from 'antd';
const {Header, Content, Footer, Sider} = Layout;
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
import {Switch, BrowserRouter, HashRouter, Route} from 'react-router-dom';
import EditForm from "./edit_form";

import "./events_dispatcher";


import "antd/dist/antd.css";
import '../../scss/base/edit_dialog.scss';

import {ajax, commons} from "../base/vm_util";


var EditDialog = React.createClass({
    getInitialState: function () {
        return {
            modelWidth: "350px",
            modelHeight: "300px",
            formLoading: false,
            visible: false

        };
    },
    registEvents(){

    },
    componentDidMount(){

        this.registEvents();

    },
    handleCancel () {

        this.closeDialog();

        const {handleCancel} = this.props;

        if (!isUndefined(handleCancel)) {
            handleCancel();
        }
    },
    handleSubmit (values){

        this.formEnterLoading();

        const {handleSubmit} = this.props;

        if (!isUndefined(handleSubmit)) {
            handleSubmit(values);
        }

    },
    formEnterLoading(){//进入handleSubmit后缀自动调用
        this.updateFormLoading(true);
    },
    formLeaveLoading(){//结束handleSubmit后缀需要手动调用
        this.updateFormLoading(false);
    },
    updateFormLoading(loading){
        var state = this.state;
        state.formLoading = loading;
        this.setState(state);
    },
    closeDialog(){
        this.updateStateVisible(false);
    },
    showDialog(){
        this.updateStateVisible(true);
    },
    updateStateVisible(visible){
        var state = this.state;
        state.visible = visible;
        this.setState(state);
    },
    componentDidMount(){
        c(this.editForm);

    },
    render: function () {

        //get props
        const {formItems, title} = this.props;

        //get state
        const {modelWidth, modelHeight, formLoading, visible} = this.state;
        return (
            <div id="user_edit_dialog">
                <Modal
                    className='extra'
                    visible={visible}
                    title={title}
                    onCancel={this.handleCancel}
                    width={modelWidth}
                    height={modelHeight}
                    footer={null}
                >

                    <EditForm
                        ref={(form) => {
                            this.editForm = form;
                        }}
                        handleSubmit={this.handleSubmit}
                        formItems={formItems}
                        loading={formLoading}
                    />
                </Modal>
            </div>
        );
    }
})

export default EditDialog;   //将App组件导出