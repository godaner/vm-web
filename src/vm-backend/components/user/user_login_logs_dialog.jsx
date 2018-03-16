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
            userId: null,
            visible: false,
            title: "用户登录日志",
            width: 1111
        }
    },
    showDialog(userId){
        this.setState({userId: userId});
        this.setState({visible: true});
    },
    handleCancel(){

        this.setState({visible: false});
    },
    render: function () {

        const {userId, visible, title, width} = this.state;
        return (
            <Modal
                id="user_login_logs_dialog"
                visible={visible}
                title={title}
                width={width}
                onCancel={this.handleCancel}
                footer={null}>
                <UserLoginLogsTable
                    userId={userId}/>
            </Modal>
        );
    }
});


export default (UserLoginLogsDialog);   //将App组件导出
