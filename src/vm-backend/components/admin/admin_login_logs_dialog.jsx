import ReactDOM from 'react-dom';
import React from 'react';
import {Modal} from "antd";
import {withRouter} from "react-router-dom";
import "antd/dist/antd.css";
import "../base/events_dispatcher";
import AdminLoginLogsTable from "./admin_login_logs_table";
var AdminLoginLogsDialog = React.createClass({
    getInitialState: function () {
        return {
            visible: false,
            title: "管理员登录日志",
            width: 1111,
        }
    },
    showDialog(adminId){
        // c(this.refs);
        // c(this.refs.admin_login_logs_table);
        this.setState({visible: true});
        // this.setState({adminId: adminId});

        setTimeout(function () {
            this.getAdminLoginLogsTable().loadDataByAdminId(adminId);
        }.bind(this),10);
    },
    handleCancel(){

        this.setState({visible: false});
    },
    getAdminLoginLogsTable(){
        return this.refs.admin_login_logs_table;
    },
    render: function () {

        const {visible, title, width} = this.state;
        return (
            <Modal
                id="admin_login_logs_dialog"
                visible={visible}
                title={title}
                width={width}
                onCancel={this.handleCancel}
                footer={null}>
                <AdminLoginLogsTable
                    ref="admin_login_logs_table"/>
            </Modal>
        );
    }
});


export default AdminLoginLogsDialog;   //将App组件导出
