import React from "react";
import {Button, DatePicker, Icon, Input, Layout, Menu, message, Popconfirm, Select, Table, Upload} from "antd";
import moment from 'moment';
import {withRouter} from "react-router-dom";
import "antd/dist/antd.css";
import "../../../scss/admin/admin_page.scss";
import "../base/events_dispatcher";
import {ajax, commons} from "../base/vm_util";
import EditDialogTemple from "../base/edit_dialog_temple";
const Option = Select.Option;
const {Header, Content, Footer, Slider} = Layout;
const SubMenu = Menu.SubMenu;
const Search = Input.Search;
const TextArea = Input.TextArea;
import AdminLoginLogsTable from "./admin_login_logs_table";
var AdminLoginLogsPage = React.createClass({
    getInitialState: function () {
        return {}
    },
    componentDidMount(){
        this.getAdminLoginLogsTable().loadAdminLoginLogsTableData();
    },
    getAdminLoginLogsTable(){
        return this.refs.admin_login_logs_table;
    },
    render: function () {

        return (
            <div>

                <AdminLoginLogsTable
                    ref="admin_login_logs_table"/>
            </div>
        );
    }
});


export default withRouter(AdminLoginLogsPage);   //将App组件导出
