import React from "react";
import {Button, DatePicker, Icon, Input, Layout, Menu, message, Popconfirm, Select, Table, Upload} from "antd";
import moment from 'moment';
import {withRouter} from "react-router-dom";
//import "antd/dist/antd.css";
import "../../scss/user/user_page.scss";
import "../base/events_dispatcher";
import {ajax, commons} from "../base/vm_util";
import EditDialogTemple from "../base/edit_dialog_temple";
const Option = Select.Option;
const {Header, Content, Footer, Slider} = Layout;
const SubMenu = Menu.SubMenu;
const Search = Input.Search;
const TextArea = Input.TextArea;
import UserLoginLogsTable from "./user_login_logs_table";
var UserLoginLogsPage = React.createClass({
    getInitialState: function () {
        return {}
    },
    componentDidMount(){
        this.getUserLoginLogsTable().loadUserLoginLogsTableData();
    },
    getUserLoginLogsTable(){
        return this.refs.user_login_logs_table;
    },
    render: function () {

        return (
            <div>

                <UserLoginLogsTable
                    ref="user_login_logs_table"/>
            </div>
        );
    }
});


export default withRouter(UserLoginLogsPage);   //将App组件导出
