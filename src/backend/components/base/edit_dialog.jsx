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

import {ajax,commons} from "../base/vm_util";



var UserEditDialog = React.createClass({
    getInitialState: function () {
        return {
            visible: false,
            loading:false,
            modelWidth:"350px",
            modelHeight:"300px"
        };
    },
    updateStateVisible(visible){
        var state = this.state;
        state.visible = visible;
        this.setState(state);
    },
    updateStateLoading(loading){
        var state = this.state;
        state.loading = loading;
        this.setState(state);
    },
    registEvents(){

    },
    componentDidMount(){

        this.registEvents();

    },
    showDialog(){
        this.updateStateVisible(true);
    },
    closeDialog(){
        this.updateStateVisible(false);
    },
    handleCancel () {
        this.updateStateVisible(false);
        c("handleCancel");
    },
    handleOk () {
        this.updateStateVisible(false);
        c("handleOk");
    },
    getEditForm(){
        return this.refs.edit_form;
    },
    render: function () {


        //get state
        const {visible, loading,modelWidth,modelHeight} = this.state;
        return (
            <div id="user_edit_dialog">
                <Modal
                    className='extra'
                    visible={visible}
                    title="编辑"
                    onCancel={this.handleCancel}
                    onOk={this.handleOk}
                    width={modelWidth}
                    height={modelHeight}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>取消</Button>,
                        <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                            确认
                        </Button>,
                    ]}
                >

                    <div>
                        <EditForm ref="edit_form"/>
                    </div>
                </Modal>
            </div>
        );
    }
})
export default UserEditDialog;   //将App组件导出

