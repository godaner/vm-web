import ReactDOM from 'react-dom';
import React from 'react';
import {Modal} from "antd";
import {withRouter} from "react-router-dom";
import "antd/dist/antd.css";
import "../base/events_dispatcher";
import UserLoginLogsTable from "./user_login_logs_table";
var UserLoginLogsDialog = React.createClass({
    getInitialState: function () {
        return {
            visible: false,
            title: "用户登录日志",
            width: 1111,
        }
    },
    showDialog(userId){
        // c(this.refs);
        // c(this.refs.user_login_logs_table);
        this.setState({visible: true});
        // this.setState({userId: userId});

        setTimeout(function () {
            this.getUserLoginLogsTable().loadDataByUserId(userId);
        }.bind(this),10);
    },
    handleCancel(){

        this.setState({visible: false});
    },
    getUserLoginLogsTable(){
        return this.refs.user_login_logs_table;
    },
    render: function () {

        const {visible, title, width} = this.state;
        return (
            <Modal
                id="user_login_logs_dialog"
                visible={visible}
                title={title}
                width={width}
                onCancel={this.handleCancel}
                footer={null}>
                <UserLoginLogsTable
                    ref="user_login_logs_table"/>
            </Modal>
        );
    }
});


export default UserLoginLogsDialog;   //将App组件导出
