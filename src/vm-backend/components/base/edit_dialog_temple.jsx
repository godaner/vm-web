import React from "react";
import {Form, Layout, Menu, Modal} from "antd";
import EditFormTemple from "./edit_form_temple";

import "./events_dispatcher";


import "antd/dist/antd.css";
import "../../scss/base/edit_dialog.scss";
const {Header, Content, Footer, Sider} = Layout;
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;


var EditDialogTemple = React.createClass({
    getInitialState: function () {
        var {width, height, maskClosable, closable, title} = this.props;
        if (isUndefined(closable)) {
            closable = true;
        }
        if (isUndefined(maskClosable)) {
            maskClosable = false;
        }
        if (isUndefined(width)) {
            width = "450px";
        }
        if (isUndefined(height)) {
            height = "300px";
        }
        if (isUndefined(title)) {
            title = "无标题";
        }
        return {
            // modelWidth: "350px",
            modelWidth: width,
            modelHeight: height,
            formLoading: false,
            visible: false,
            closable: closable,
            maskClosable: maskClosable,
            title: title

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

    },

    saveFormRef(form){//!!!!
        this.form = form;
    },
    clearForm(){//！！！！清空表单，如果清除form，echoData将无法显示，目前还不知道原因！！！
        this.form.resetFields();//!!!!
    },
    afterClose(){
        // this.form.resetFields();//!!!!关闭后自动清空表单


        const {afterClose} = this.props;

        if (!isUndefined(afterClose)) {
            afterClose();
        }
    },
    render: function () {

        //get props
        const {formRows, formLayout} = this.props;

        //get state
        const {modelWidth, modelHeight, closable, maskClosable, formLoading, visible, title} = this.state;
        return (
            <div id="user_edit_dialog">
                <Modal
                    className='extra'
                    visible={visible}
                    title={title}
                    onCancel={this.handleCancel}
                    afterClose={this.afterClose}
                    width={modelWidth}
                    height={modelHeight}
                    closable={closable}
                    maskClosable={maskClosable}
                    footer={null}
                >

                    <EditFormTemple
                        ref={this.saveFormRef}
                        handleSubmit={this.handleSubmit}
                        formRows={formRows}
                        formLayout={formLayout}
                        loading={formLoading}
                    />
                </Modal>
            </div>
        );
    }
})

export default EditDialogTemple;   //将App组件导出