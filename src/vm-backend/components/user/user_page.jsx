import React from "react";
import {Button, DatePicker, Icon, Input, Layout, Menu, message, Popconfirm, Select, Table, Upload} from "antd";
import moment from 'moment';
import {withRouter} from "react-router-dom";
import "antd/dist/antd.css";
import "../../scss/user/user_page.scss";
import "../base/events_dispatcher";
import {ajax, commons} from "../base/vm_util";
import EditDialogTemple from "../base/edit_dialog_temple";
const Option = Select.Option;
const {Header, Content, Footer, Slider} = Layout;
const SubMenu = Menu.SubMenu;
const Search = Input.Search;
const TextArea = Input.TextArea;
import UserTable from "./user_table";
var UserPage = React.createClass({
    getInitialState: function () {

        return {}
    },

    render: function () {

        return (
            <div>

                <UserTable/>
            </div>
        );
    }
});


export default withRouter(UserPage);   //将App组件导出
